// mission.js — runs one mission as a CHAIN OF STAGES (see docs/MISSION_DESIGN_M1.md).
//
// A stage is what the player is DOING right now:
//   regroup — your crash-scattered squadmates lie downed; hold E beside one
//             to get him on his feet (the interaction lives in main.js — the
//             stage just watches for the squad to be whole)
//   multi   — several parts at once, any order (collect supplies / cut the radio)
//   escape  — reach the exit zone and hold it, uncontested
//
// THE WORLD IS LIVE IN EVERY ACT: crates can be grabbed and the radio can die
// before their stage opens — stages OBSERVE the world, they don't enable it.
// A pickup that ignores you teaches "pickups don't work."
//
// The runner also owns the mission props (supply crates bob, the radio lamp
// blinks), saves a CHECKPOINT at every stage boundary, and decides win/lose.
// Main asks it for status text each frame.

import { sfx } from './audio.js';
import { barks } from './barks.js';

const PICKUP_RANGE = 2.4;
const SMASH_RANGE = 2.2;
const SMASH_TIME = 1.5;        // seconds beside the radio to cut it quietly
const RESUPPLY_PCT = 0.5;      // a crate refills half your starting reserve
const RESUPPLY_HEAL = 20;
const ZONE_SNAP = 20;          // a hider's beacon marks his ROOM until you're this close

export class MissionRunner {
  constructor(def, scene, world) {
    this.def = def;
    this.scene = scene;
    this.world = world;          // { exit, supplies, radio, lamps } built by createWorld
    this.state = 'active';       // 'active' | 'won' | 'lost'
    this.stageIdx = 0;
    this.timeAcc = 0;            // escape hold timer
    this.t = 0;                  // prop animation clock
    this.playTime = 0;           // seconds actually played (for the debrief)
    this.startKills = 0;
    this.startSilent = 0;
    this.smashT = 0;
    this.squad = null;
    this.enemies = null;
    this.checkpoint = null;      // snapshot taken at every stage boundary
    this.onToast = null;         // hook(text): stage banner in the HUD
    this._converged = false;     // the finale's everyone-to-the-door call
    this._beaconKey = null;      // hysteresis: the beacon doesn't flicker between ties
  }

  // Spawn the occupation, wire the alarm, scatter the squad. Call once.
  begin(enemies, squad) {
    this.squad = squad;
    this.enemies = enemies;
    this.startKills = enemies.kills;
    this.startSilent = enemies.silent;
    this.startHead = enemies.headshots;
    if (this.def.enemyLayout) enemies.spawnLayout(this.def.enemyLayout);
    enemies.radio = this.world.radio || null;
    enemies.lamps = this.world.lamps || [];
    enemies.reserveLayout = this.def.reserve || null;

    // The squad ended up all over the house: thrown by the crash, dragged
    // to a pen, or gone to ground. Pose tells each man's story at a glance.
    if (this.def.scatter) {
      for (const s of this.def.scatter) {
        const m = squad.members[s.member];
        m.position.set(s.x, 0, s.z);
        m.alive = false;
        m.downed = true;
        m.crashDowned = true;
        m._pose = s.pose || 'downed';
        m._zone = s.zone || null;     // a hider's beacon marks his room, not his pixel
        m._waved = false;
        this._applyPose(m);
      }
    }
    if (this.stage() && this.onToast) this.onToast(this.stage().toast || '');
    this.saveCheckpoint();            // checkpoint zero: the wreck
  }

  // Lay a crash-downed man in his story pose: flat where he was thrown, flat
  // in the pen, or tucked on his haunches waiting for friendly boots.
  _applyPose(m) {
    m.health = 0;
    m.figure.position.copy(m.position);
    m.figure.scale.y = 1;
    if (m._pose === 'hiding') {
      m.figure.position.y = 0;
      m.figure.rotation.z = 0;
      m.figure.userData.animate(0, 0, 1);   // the full-crouch pose
    } else {
      m.figure.position.y = 0.3;
      m.figure.rotation.z = Math.PI / 2;
    }
  }

  stage() { return this.def.stages[this.stageIdx]; }

  killCount(enemies) {
    return enemies.kills - this.startKills;
  }

  _advance() {
    this.stageIdx++;
    sfx.objective();
    if (this.stageIdx >= this.def.stages.length) {
      this.state = 'won';
    } else {
      if (this.onToast) this.onToast(this.stage().toast || '');
      // An act boundary is a CHECKPOINT — dying costs you the fight you lost,
      // never the acts you already won.
      this.saveCheckpoint();
    }
  }

  update(dt, squad, enemies, bullets) {
    if (this.state !== 'active') return;
    this.t += dt;
    this.playTime += dt;
    this._animateProps();

    // The world is LIVE every act: walk over a crate and it's yours, put a
    // mag into the radio and it dies — whatever the current objective says.
    const suppliesDone = this._collect(squad);
    const radioDone = this._destroy(dt, squad, bullets);

    const st = this.stage();
    if (st.type === 'regroup') {
      if (squad.members.every((m) => !m.crashDowned)) this._advance();
    } else if (st.type === 'multi') {
      // Parts run in PARALLEL — the order is the player's plan (and any part
      // finished EARLY, in a prior act, counts).
      let done = true;
      for (const part of st.parts) {
        if (part.type === 'collect' && !suppliesDone) done = false;
        if (part.type === 'destroy' && !radioDone) done = false;
      }
      if (done) this._advance();
    } else if (st.type === 'escape') {
      this._escape(dt, st, squad, enemies);
    }

    // Loss: the whole squad is down — at any stage.
    if (!squad.alive) this.state = 'lost';
  }

  // --- Part: COLLECT the supply drops. Walk over one to take it. ---
  _collect(squad) {
    let allTaken = true;
    for (const s of this.world.supplies) {
      if (s.taken) continue;
      let taken = false;
      for (const m of squad.members) {
        if (!m.alive) continue;
        if (Math.hypot(m.position.x - s.x, m.position.z - s.z) < PICKUP_RANGE) { taken = true; break; }
      }
      if (taken) {
        s.taken = true;
        s.crate.visible = false;
        s.ring.visible = false;
        squad.resupply(RESUPPLY_PCT, RESUPPLY_HEAL);
        sfx.pickup();
      } else {
        allTaken = false;
      }
    }
    return allTaken;
  }

  // --- Part: DESTROY the radio. Shoot it (loud) or stand beside it (quiet). ---
  _destroy(dt, squad, bullets) {
    const r = this.world.radio;
    if (!r || !r.alive) return true;

    // Bullets vs the radio box.
    for (let i = bullets.active.length - 1; i >= 0; i--) {
      const b = bullets.active[i];
      if (b.team !== 'player') continue;
      const dx = b.mesh.position.x - r.pos.x;
      const dy = b.mesh.position.y - 0.7;
      const dz = b.mesh.position.z - r.pos.z;
      if (dx * dx + dy * dy + dz * dz < 1.2 * 1.2) {
        r.hp -= b.damage;
        bullets.burst(b.mesh.position);
        bullets.retireBullet(b);
      }
    }

    // The quiet way: stand over it and rip the wires out.
    let smashing = false;
    for (const m of squad.members) {
      if (!m.alive) continue;
      if (Math.hypot(m.position.x - r.pos.x, m.position.z - r.pos.z) < SMASH_RANGE) { smashing = true; break; }
    }
    this.smashT = smashing ? this.smashT + dt : Math.max(0, this.smashT - dt * 2);

    if (r.hp <= 0 || this.smashT >= SMASH_TIME) {
      r.alive = false;
      r.lamp.visible = false;
      r.group.rotation.z = 1.1;            // kicked over
      r.group.position.y = 0.35;
      sfx.kill();
      return true;
    }
    return false;
  }

  // --- Stage: ESCAPE. Any living member in the door zone, uncontested. ---
  _escape(dt, st, squad, enemies) {
    const z = this.world.exit;
    let inside = false, contested = false, near = false;
    for (const m of squad.members) {
      if (!m.alive) continue;
      const d = Math.hypot(m.position.x - z.x, m.position.z - z.z);
      if (d < z.r) inside = true;
      if (d < z.r + 14) near = true;
    }
    // THE CRESCENDO: the moment you close on the door, every tan still
    // standing knows where this ends and falls back to stop you. The breach
    // is a finale, not four quiet seconds on a doormat.
    if (near && !this._converged) {
      this._converged = true;
      for (const e of enemies.list) {
        enemies.alert(e, {
          x: z.x + (Math.random() - 0.5) * 12,
          z: z.z + (Math.random() - 0.5) * 8,
        });
      }
      if (this.onToast) this.onToast('THE LAST OF THEM ARE FALLING BACK TO THE DOOR');
    }
    for (const e of enemies.list) {
      if (Math.hypot(e.pos.x - z.x, e.pos.z - z.z) < z.r + 9) { contested = true; break; }
    }
    this.timeAcc = (inside && !contested)
      ? this.timeAcc + dt
      : Math.max(0, this.timeAcc - dt * 0.6);
    if (this.timeAcc >= st.holdSeconds) this.state = 'won';
  }

  // --- CHECKPOINTS: freeze everything a retry needs, rewind on demand. ---
  // Taken at mission start and at every stage boundary. Restoring rebuilds
  // the squad, the surviving occupation (calm, at their snapshotted posts),
  // and every mission prop — without a page reload.
  saveCheckpoint() {
    const squad = this.squad, enemies = this.enemies;
    if (!squad || !enemies) return;
    this.checkpoint = {
      stageIdx: this.stageIdx,
      playTime: this.playTime,
      converged: this._converged,
      activeIndex: squad.activeIndex,
      fireMode: squad.fireMode,
      squad: squad.members.map((m) => ({
        x: m.position.x, z: m.position.z, yaw: m.yaw,
        alive: m.alive, downed: m.downed, crashDowned: m.crashDowned,
        pose: m._pose, zone: m._zone, waved: m._waved,
        health: m.health, mag: m.mag, reserve: m.reserve, nades: m.nades,
      })),
      enemies: enemies.snapshot(),
      supplies: this.world.supplies ? this.world.supplies.map((s) => s.taken) : [],
      radio: this.world.radio
        ? { alive: this.world.radio.alive, hp: this.world.radio.hp }
        : null,
      lamps: (this.world.lamps || []).map((l) => l.alive),
    };
  }

  restoreCheckpoint(squad, enemies, bullets, grenades) {
    const c = this.checkpoint;
    if (!c) return false;
    this.state = 'active';
    this.stageIdx = c.stageIdx;
    this.playTime = c.playTime;
    this._converged = c.converged;
    this.timeAcc = 0;
    this.smashT = 0;
    this._beaconKey = null;
    bullets.clear();
    grenades.clear();

    c.squad.forEach((s, i) => {
      const m = squad.members[i];
      m.position.set(s.x, 0, s.z);
      m.yaw = s.yaw;
      m.alive = s.alive;
      m.downed = s.downed;
      m.crashDowned = s.crashDowned;
      m._pose = s.pose;
      m._zone = s.zone;
      m._waved = s.waved;
      m.health = s.health;
      m.mag = s.mag;
      m.reserve = s.reserve;
      m.nades = s.nades;
      m.reloading = 0;
      m.fireCooldown = 0;
      m.abilityCd = 0;
      m.order = 'follow';
      m.target = null;
      m._coverSpot = null;
      m.aiming = m.zoomed = m.suppressing = m.crouched = false;
      m.inCover = m.peeking = m.sprinting = false;
      m.coverBox = null;
      m.figure.position.copy(m.position);
      m.figure.rotation.y = m.yaw;
      m.figure.scale.y = 1;
      m.figure.rotation.z = 0;
      if (m.crashDowned) this._applyPose(m);
      else if (!m.alive) { m.figure.rotation.z = Math.PI / 2; m.figure.position.y = 0.3; }
      else m.figure.position.y = 0;
    });
    squad.selected = null;
    squad.fireMode = c.fireMode;
    squad.setActive(c.activeIndex);

    enemies.restore(c.enemies);

    if (this.world.supplies) {
      this.world.supplies.forEach((s, i) => {
        s.taken = !!c.supplies[i];
        s.crate.visible = !s.taken;
        s.ring.visible = !s.taken;
      });
    }
    const r = this.world.radio;
    if (r && c.radio) {
      r.alive = c.radio.alive;
      r.hp = c.radio.hp;
      r.group.rotation.z = r.alive ? 0 : 1.1;
      r.group.position.y = r.alive ? 0 : 0.35;
      r.lamp.visible = r.alive;
    }
    (this.world.lamps || []).forEach((l, i) => {
      l.alive = !!c.lamps[i];
      l.light.intensity = l.alive ? l.intensity0 : 0;
      l.shade.material.emissiveIntensity = l.alive ? l.emissive0 : 0;
    });

    if (this.onToast) this.onToast('FROM THE CHECKPOINT — ' + (this.stage().toast || ''));
    return true;
  }

  // Supply crates bob and shimmer; the radio's call lamp blinks until it dies.
  _animateProps() {
    if (this.world.supplies) {
      this.world.supplies.forEach((s, i) => {
        if (s.taken) return;
        s.crate.position.y = 0.8 + Math.sin(this.t * 2.5 + i * 2) * 0.18;
        s.crate.rotation.y = this.t * 0.6 + i;
        s.ring.material.opacity = 0.22 + 0.14 * Math.sin(this.t * 3 + i);
      });
    }
    const r = this.world.radio;
    if (r && r.alive) r.lamp.visible = Math.sin(this.t * 6) > -0.2;
    // The wreck smolders: puffs rise, swell, thin out, recycle.
    if (this.world.wreckSmoke) {
      for (const puff of this.world.wreckSmoke) {
        puff.t += 0.0021;
        if (puff.t > 1) puff.t -= 1;
        const k = puff.t;
        puff.sp.position.y = 3 + k * 13;
        puff.sp.position.x += Math.sin(this.t * 0.8 + k * 9) * 0.004;
        puff.sp.scale.setScalar(2 + k * 5);
        puff.sp.material.opacity = 0.32 * (1 - k);
      }
    }
  }

  // Where should the objective beacon hover RIGHT NOW? The nearest thing
  // that advances the current stage — with two refinements: a HIDER's beacon
  // marks his room (a search, not a waypoint) until you're close, and the
  // pick is STICKY so near-ties don't make the beacon flicker between rooms.
  currentTarget() {
    const st = this.stage();
    if (!st || this.state !== 'active' || !this.squad) return null;
    const a = this.squad.active;
    if (st.type === 'regroup') {
      let best = null, bd = 1e9;
      for (const m of this.squad.members) {
        if (!m.crashDowned) continue;
        const d = m.position.distanceTo(a.position);
        if (d < bd) { bd = d; best = m; }
      }
      if (!best) return null;
      if (best._pose === 'hiding' && best._zone && bd > ZONE_SNAP) {
        return { x: best._zone.x, z: best._zone.z };
      }
      if (best._pose === 'hiding' && !best._waved && bd <= ZONE_SNAP) {
        best._waved = true;                       // close enough — he breaks cover
        barks.say(best.figure, 'Over here!', '#9fe8ff');
      }
      return { x: best.position.x, z: best.position.z };
    }
    if (st.type === 'multi') {
      const cands = [];
      this.world.supplies.forEach((s, i) => {
        if (!s.taken) cands.push({ key: 's' + i, x: s.x, z: s.z });
      });
      const r = this.world.radio;
      if (r && r.alive) cands.push({ key: 'radio', x: r.pos.x, z: r.pos.z });
      if (!cands.length) return null;
      const dist = (c) => Math.hypot(c.x - a.position.x, c.z - a.position.z);
      let best = cands[0];
      for (const c of cands) if (dist(c) < dist(best)) best = c;
      const prev = cands.find((c) => c.key === this._beaconKey);
      if (prev && dist(prev) <= dist(best) * 1.35 + 4) best = prev;
      this._beaconKey = best.key;
      return best;
    }
    if (st.type === 'escape') return { x: this.world.exit.x, z: this.world.exit.z };
    return null;
  }

  statusText(enemies) {
    const st = this.stage();
    if (!st) return '';
    const quiet = enemies.firstSpotted ? '' : '   ·   UNDETECTED';
    // The radio is the mission's loudest threat — its status outranks
    // everything else on the line.
    const threat = enemies.radioThreat === 2
      ? '   ·   ⚠ HE IS CALLING IT IN'
      : enemies.radioThreat === 1 ? '   ·   ⚠ RUNNER → RADIO' : '';

    if (st.type === 'regroup') {
      const total = this.def.scatter.length;
      const left = this.squad ? this.squad.members.filter((m) => m.crashDowned).length : total;
      return `FIND YOUR SQUAD   ${total - left} / ${total}${threat}${quiet}`;
    }
    if (st.type === 'multi') {
      const bits = [];
      for (const part of st.parts) {
        if (part.type === 'collect') {
          const taken = this.world.supplies.filter((s) => s.taken).length;
          bits.push(`SUPPLIES ${taken} / ${this.world.supplies.length}`);
        } else if (part.type === 'destroy') {
          const r = this.world.radio;
          if (!r.alive) bits.push('ALARM CUT ✓');
          else if (this.smashT > 0.15) bits.push(`CUTTING THE ALARM ${Math.min(100, Math.round(this.smashT / SMASH_TIME * 100))}%`);
          else bits.push('CUT THE ALARM');
        }
      }
      return bits.join('   ·   ') + threat + quiet;
    }
    if (st.type === 'escape') {
      if (this.timeAcc > 0.05) return `BREACHING THE FRONT DOOR   ${this.timeAcc.toFixed(1)} / ${st.holdSeconds}s`;
      return `ESCAPE — reach the front door   (tan: ${enemies.list.length})`;
    }
    return '';
  }
}
