// mission.js — runs one mission as a CHAIN OF STAGES (see docs/MISSION_DESIGN_M1.md).
//
// A stage is what the player is DOING right now:
//   regroup — your crash-scattered squadmates lie downed; stand beside one to
//             get him on his feet (any member can — they're stunned, not shot)
//   multi   — several parts at once, any order (collect supplies / cut the radio)
//   escape  — reach the exit zone and hold it, uncontested
//
// The runner also owns the mission props (supply crates bob, the radio lamp
// blinks) and decides win/lose. Main asks it for status text each frame.

import { sfx } from './audio.js';
import { barks, pick } from './barks.js';

const RESCUE_RANGE = 3.0;
const RESCUE_TIME = 1.8;       // seconds beside a downed buddy to wake him
const PICKUP_RANGE = 2.4;
const SMASH_RANGE = 2.2;
const SMASH_TIME = 1.5;        // seconds beside the radio to cut it quietly
const RESUPPLY_PCT = 0.5;      // a crate refills half your starting reserve
const RESUPPLY_HEAL = 20;

export class MissionRunner {
  constructor(def, scene, world) {
    this.def = def;
    this.scene = scene;
    this.world = world;          // { exit, supplies, radio } built by createWorld
    this.state = 'active';       // 'active' | 'won' | 'lost'
    this.stageIdx = 0;
    this.timeAcc = 0;            // escape hold timer
    this.t = 0;                  // prop animation clock
    this.startKills = 0;
    this.rescueT = new Map();    // downed member -> seconds of company
    this.smashT = 0;
    this.squad = null;
    this.onToast = null;         // hook(text): stage banner in the HUD
  }

  // Spawn the occupation, wire the alarm, scatter the squad. Call once.
  begin(enemies, squad) {
    this.squad = squad;
    this.startKills = enemies.kills;
    if (this.def.enemyLayout) enemies.spawnLayout(this.def.enemyLayout);
    enemies.radio = this.world.radio || null;
    enemies.lamp = this.world.lamp || null;
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
        m.health = 0;
        m.figure.position.copy(m.position);
        if (m._pose === 'hiding') {
          // Tucked low and upright, waiting for friendly boots.
          m.figure.position.y = 0;
          m.figure.rotation.z = 0;
          m.figure.scale.y = 0.6;
        } else {
          m.figure.position.y = 0.3;
          m.figure.rotation.z = Math.PI / 2;
        }
      }
    }
    if (this.stage() && this.onToast) this.onToast(this.stage().toast || '');
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
    } else if (this.onToast) {
      this.onToast(this.stage().toast || '');
    }
  }

  update(dt, squad, enemies, bullets) {
    if (this.state !== 'active') return;
    this.t += dt;
    this._animateProps();

    const st = this.stage();
    if (st.type === 'regroup') {
      if (this._regroup(dt, squad)) this._advance();
    } else if (st.type === 'multi') {
      // Parts run in PARALLEL — the order is the player's plan.
      let done = true;
      for (const part of st.parts) {
        if (part.type === 'collect' && !this._collect(squad)) done = false;
        if (part.type === 'destroy' && !this._destroy(dt, squad, bullets)) done = false;
      }
      if (done) this._advance();
    } else if (st.type === 'escape') {
      this._escape(dt, st, squad, enemies);
    }

    // Loss: the whole squad is down — at any stage.
    if (!squad.alive) this.state = 'lost';
  }

  // --- Stage: REGROUP. Stand beside a downed buddy to get him up. ---
  _regroup(dt, squad) {
    let remaining = 0;
    for (const m of squad.members) {
      if (!m.crashDowned) continue;
      remaining++;
      let company = false;
      for (const o of squad.members) {
        if (!o.alive) continue;
        if (o.position.distanceTo(m.position) < RESCUE_RANGE) { company = true; break; }
      }
      const need = m._pose === 'hiding' ? 0.6 : RESCUE_TIME;
      const t = (this.rescueT.get(m) || 0);
      if (company) {
        this.rescueT.set(m, t + dt);
        if (t + dt >= need) {
          m.revive(m._pose === 'hiding' ? 0.85 : 0.6);
          sfx.pickup();
          const line = m._pose === 'hiding'
            ? pick(['Thought you would never come.', 'I kept my head down, sir.'])
            : m._pose === 'prison'
              ? pick(['They had me in a CAGE.', 'Took you long enough — let me out!'])
              : pick(['On my feet — thanks!', 'Ow. Where are they?', 'Back in it!']);
          barks.say(m.figure, line, '#7dff7d');
          remaining--;
        }
      } else if (t > 0) {
        this.rescueT.set(m, Math.max(0, t - dt * 2));
      }
    }
    return remaining === 0;
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
    let inside = false, contested = false;
    for (const m of squad.members) {
      if (m.alive && Math.hypot(m.position.x - z.x, m.position.z - z.z) < z.r) inside = true;
    }
    for (const e of enemies.list) {
      if (Math.hypot(e.pos.x - z.x, e.pos.z - z.z) < z.r + 9) { contested = true; break; }
    }
    this.timeAcc = (inside && !contested)
      ? this.timeAcc + dt
      : Math.max(0, this.timeAcc - dt * 0.6);
    if (this.timeAcc >= st.holdSeconds) this.state = 'won';
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
  // that advances the current stage.
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
      return best ? { x: best.position.x, z: best.position.z } : null;
    }
    if (st.type === 'multi') {
      let best = null, bd = 1e9;
      for (const s of this.world.supplies) {
        if (s.taken) continue;
        const d = Math.hypot(s.x - a.position.x, s.z - a.position.z);
        if (d < bd) { bd = d; best = { x: s.x, z: s.z }; }
      }
      const r = this.world.radio;
      if (r && r.alive) {
        const d = Math.hypot(r.pos.x - a.position.x, r.pos.z - a.position.z);
        if (d < bd) best = { x: r.pos.x, z: r.pos.z };
      }
      return best;
    }
    if (st.type === 'escape') return { x: this.world.exit.x, z: this.world.exit.z };
    return null;
  }

  statusText(enemies) {
    const st = this.stage();
    if (!st) return '';
    const quiet = enemies.firstSpotted ? '' : '   ·   UNDETECTED';

    if (st.type === 'regroup') {
      const total = this.def.scatter.length;
      const left = this.squad ? this.squad.members.filter((m) => m.crashDowned).length : total;
      return `FIND YOUR SQUAD   ${total - left} / ${total}${quiet}`;
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
      return bits.join('   ·   ') + quiet;
    }
    if (st.type === 'escape') {
      if (this.timeAcc > 0.05) return `BREACHING THE FRONT DOOR   ${this.timeAcc.toFixed(1)} / ${st.holdSeconds}s`;
      return `ESCAPE — reach the front door   (tan: ${enemies.list.length})`;
    }
    return '';
  }
}
