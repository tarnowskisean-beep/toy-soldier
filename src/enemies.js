// enemies.js — the tan occupation force, with a STEALTH brain.
//
// Every tan starts as a SENTRY: standing his post (or walking his patrol),
// unaware. He alerts three ways — SIGHT (you in his view cone, in range, with a
// clear line, long enough to notice; crouching makes you harder to spot,
// sprinting easier), SOUND (gunfire in earshot), or PAIN (getting hit). Alerted
// soldiers fight: they take cover, hold sensible range, and shout to nearby
// friends. The "?" and "!" over their heads tell you exactly how made you are.

import * as THREE from 'three';
import { createFigure } from './figure.js';
import { moveBy, hasLineOfSight } from './physics.js';
import { navStep } from './navgrid.js';
import { sfx } from './audio.js';
import { barks, pick } from './barks.js';

// One brain, three bodies. RIFLEMAN holds his post and fights from cover.
// SCOUT is fast and frail — spooked, he RUNS FOR THE RADIO instead of
// fighting (kill him before he rounds the corner). GUNNER is a slow wall of
// plastic who walks 4-round bursts at you.
export const TYPES = {
  rifle:  { hp: 40, speed: 5.8, damage: 13, fireInterval: 0.8, spread: 0.07,
            fig: {} },
  scout:  { hp: 25, speed: 8.6, damage: 8,  fireInterval: 1.0, spread: 0.09,
            runner: true, fig: { rifleLength: 0.45 } },
  gunner: { hp: 70, speed: 4.2, damage: 9,  fireInterval: 0.09, spread: 0.12,
            burst: 4, burstPause: 1.5, fig: { bulky: true, rifleLength: 1.3 } },
  // The watchtower sentry: planted on his platform (never moves, never
  // panics off the edge), sees FAR and WIDE — but frail, and his own
  // parapet shadows a blind circle beneath him.
  lookout: { hp: 30, speed: 0, damage: 12, fireInterval: 1.1, spread: 0.05,
             static: true, sightMult: 1.35, cone: -0.25, fig: { rifleLength: 1.2 } },
};

// Distances ride the 1.4x world scale (senses ~×1.25 — the bigger house
// should feel LONGER-ranged, not just emptier).
const ENEMY_RANGE = 38;        // max engagement distance once alerted
const ENEMY_PREFERRED = 18;    // likes to fight from about here
const COVER_SEARCH = 30;
const COVER_RECHECK = 2.5;
const HIT_RADIUS = 0.95;
const TORSO_Y = 1.1;           // where bullets land / where you aim
const TOUCH_RANGE = 2.0;
const TOUCH_DPS = 20;
// The call is a WINDOW, not a flick of a switch: long enough to sprint in
// and stop it once you hear the handset beeps climbing.
const CALL_TIME = 4.0;

// Detection model.
const SIGHT_RANGE = 29;        // how far a sentry can see
const SIGHT_CONE = 0.2;        // dot(facing, toTarget) must exceed this (~78°)
const FIGHT_SIGHT = 43;        // an ALERTED man looks all around, a bit farther
const HEAR_RANGE = 21;         // gunfire within this wakes a sentry
const BLAST_HEAR = 33;         // a grenade is the loudest thing in the house
const FOOTSTEP_HEAR = 9;       // sprinting boots carry this far — sneak the last stretch
const SHOUT_RANGE = 11;        // an alerted soldier wakes friends within this
const AWARE_RATE = 2.4;        // seconds^-1 of suspicion while you're visible
const AWARE_DECAY = 0.5;
const SPOT_INSTANT = 10;       // standing in plain sight inside this = made NOW
const PATROL_SPEED = 3.0;
const SEARCH_TIME = 4;         // how long they hunt before standing down

// "?" / "!" tell sprites (one canvas texture each, shared).
function tellMaterial(char, color) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.font = 'bold 52px monospace';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = 8; g.strokeStyle = 'rgba(0,0,0,0.85)';
  g.strokeText(char, 32, 34);
  g.fillStyle = color;
  g.fillText(char, 32, 34);
  return new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false });
}
const MAT_Q = tellMaterial('?', '#ffd23d');
const MAT_BANG = tellMaterial('!', '#ff4030');

// Takedown finishers — the rig has no ragdoll, so each kill plays a tiny
// keyframe story on the whole figure (a TOY falls like a toy). SWAT: batted
// off his feet, flat on his side. CRUMPLE: knees buckle, a held beat
// kneeling, then face-down. SPIN: wrenched half-around, dropped on his back.
// DRAG: hauled over backward, landing at the killer's boots.
const TAKEDOWN_KINDS = ['swat', 'crumple', 'spin', 'drag'];
const easeIn = (x) => x * x;
const easeOut = (x) => 1 - (1 - x) * (1 - x);

export class Enemies {
  constructor(scene, obstacles, coverPoints, nav, bounds) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.coverPoints = coverPoints;
    this.nav = nav;
    this.bounds = bounds;
    this.list = [];
    this.dying = [];               // knockdown animations in flight
    this.corpses = [];             // takedown bodies at rest (cleared on checkpoint rewind)
    this.kills = 0;
    this.silent = 0;               // of those, how many were quiet takedowns
    this.headshots = 0;            // clean hits above the shoulders
    this.combatStarted = false;    // green ROE: squad AI holds fire until this
    this.firstSpotted = false;     // drops the UNDETECTED tag
    this.hitFlash = 0;             // >0 briefly when a player bullet lands (HUD hitmarker)
    this.radio = null;             // the tan field radio (mission wires it up)
    this.lamps = [];               // shootable lights (kill the bulb = dark pocket)
    this.reserveLayout = null;     // who comes through the door if the alarm sounds
    this.alarmRaised = false;
    this.musicState = 'calm';      // 'calm' | 'tension' | 'combat' — drives the score
    this._combatUntil = 0;
    this._v = new THREE.Vector3();
    this._g = new THREE.Vector3();
  }

  // Spawn the mission's layout:
  // [{ x, z, facing(rad), type?: 'rifle'|'scout'|'gunner', patrol?: {x, z} }, ...]
  // Spawns are clamped to standable ground — a spawn inside furniture would be
  // blind (LOS from inside a box always fails) and stuck.
  spawnLayout(layout) {
    for (const s of layout) this._spawnOne(s);
  }

  _spawnOne(s) {
    const T = TYPES[s.type || 'rifle'];
    const fig = createFigure(0xcdb072, T.fig);
    // Elevated posts (lookouts) spawn exactly where placed — ON the tower;
    // ground troops clamp to standable cells.
    const spot = s.baseY ? { x: s.x, z: s.z } : this.nav.nearestOpen(s.x, s.z);
    const pos = new THREE.Vector3(spot.x, 0, spot.z);
    fig.position.copy(pos);
    fig.position.y = s.baseY || 0;
    fig.rotation.y = s.facing;
    this.scene.add(fig);

    const tell = new THREE.Sprite(MAT_Q);
    tell.scale.set(1.5, 1.5, 1);
    tell.position.set(0, 3.1, 0);
    tell.visible = false;
    fig.add(tell);

    const e = {
      fig, pos, tell,
      type: s.type || 'rifle',
      hp: T.hp, speed: T.speed, damage: T.damage,
      fireInterval: T.fireInterval, spread: T.spread,
      burst: T.burst || 0, burstPause: T.burstPause || 0, burstLeft: T.burst || 0,
      runner: !!T.runner,
      static: !!T.static, sightMult: T.sightMult || 1, cone: T.cone ?? SIGHT_CONE,
      baseY: s.baseY || 0,
      fireCd: Math.random() * 0.5,
      recheck: 0, cover: null, suppressed: 0, stagger: 0,
      alerted: false, aware: 0, alertFlash: 0, alertedFor: 0, callT: 0,
      runningToRadio: false,
      facing: s.facing,
      home: { x: spot.x, z: spot.z, facing: s.facing },   // the post he returns to
      lastKnown: new THREE.Vector3(),                      // where he THINKS you are
      hasIntel: false, searching: false, searchT: 0,
      panicT: 0, panicFrom: new THREE.Vector3(),           // GRENADE! scatter
      patrol: s.patrol ? { a: { x: spot.x, z: spot.z }, b: { ...s.patrol }, toB: true } : null,
    };
    this.list.push(e);
    return e;
  }

  // --- Checkpoint support: freeze the occupation, rewind it later. ---
  // Restored men come back CALM at their snapshotted spots — a checkpoint is
  // a fresh footing, not a resumed firefight.
  snapshot() {
    return {
      kills: this.kills,
      silent: this.silent,
      headshots: this.headshots,
      alarmRaised: this.alarmRaised,
      combatStarted: this.combatStarted,
      firstSpotted: this.firstSpotted,
      list: this.list.map((e) => ({
        x: e.pos.x, z: e.pos.z, facing: e.facing, type: e.type, baseY: e.baseY,
        hp: e.hp,
        home: { ...e.home },
        patrol: e.patrol
          ? { ax: e.patrol.a.x, az: e.patrol.a.z, bx: e.patrol.b.x, bz: e.patrol.b.z, toB: e.patrol.toB }
          : null,
      })),
    };
  }

  restore(snap) {
    for (const e of this.list) this.scene.remove(e.fig);
    for (const d of this.dying) this.scene.remove(d.fig);
    for (const f of this.corpses) this.scene.remove(f);
    this.list.length = 0;
    this.dying.length = 0;
    this.corpses.length = 0;
    for (const s of snap.list) {
      const e = this._spawnOne({ x: s.x, z: s.z, facing: s.facing, type: s.type, baseY: s.baseY });
      e.hp = s.hp;
      e.home = { ...s.home };
      if (s.patrol) {
        e.patrol = { a: { x: s.patrol.ax, z: s.patrol.az }, b: { x: s.patrol.bx, z: s.patrol.bz }, toB: s.patrol.toB };
      }
    }
    this.kills = snap.kills;
    this.silent = snap.silent;
    this.headshots = snap.headshots || 0;
    this.alarmRaised = snap.alarmRaised;
    this.combatStarted = snap.combatStarted;
    this.firstSpotted = snap.firstSpotted;
    this.hitFlash = 0;
    this._combatUntil = 0;
    this.musicState = 'calm';
  }

  // The radio got through: the porch reserve comes in the front door, hunting.
  raiseAlarm(squad) {
    if (this.alarmRaised) return;
    this.alarmRaised = true;
    sfx.alarm();
    if (!this.reserveLayout) return;
    const before = this.list.length;
    this.spawnLayout(this.reserveLayout);
    const intel = squad && squad.active.alive ? squad.active.position : null;
    for (let i = before; i < this.list.length; i++) {
      this.alert(this.list[i], intel);
      this.list[i].alertFlash = 0;   // they arrive hunting, not startled
    }
  }

  // Wake one soldier. `intel` (optional {x,z}) is where he should go LOOK —
  // sound, sighting, or pain all leave a clue. His shout passes the same clue
  // to friends in earshot.
  alert(e, intel) {
    if (intel) {
      e.lastKnown.set(intel.x, 0, intel.z);
      e.hasIntel = true;
      e.searchT = 0;                      // fresh intel restarts the hunt
    }
    if (e.alerted) return;
    e.alerted = true;
    e.alertFlash = 2.2;
    if (Math.random() < 0.65) {
      barks.say(e.fig, pick(['INTRUDERS!', 'CONTACT!', 'GREENS — HERE!']), '#ffd23d');
    }
    sfx.spotted();                  // the "!" has a SOUND (throttled inside)
    this.firstSpotted = true;
    this.combatStarted = true;
    // Shout: wake nearby friends and point them the same way.
    for (const o of this.list) {
      if (!o.alerted && Math.hypot(o.pos.x - e.pos.x, o.pos.z - e.pos.z) < SHOUT_RANGE) {
        this.alert(o, e.hasIntel ? e.lastKnown : null);
      }
    }
  }

  // Gunfire wakes soldiers in earshot ONLY — fights stay local; the far rooms
  // sleep until the noise reaches them. EVERY shot routes through here (the
  // player's, the AI squad's, even tan return fire), so noise is one rule.
  hearGunshot(pos) {
    this.combatStarted = true;
    for (const e of this.list) {
      if (Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z) < HEAR_RANGE) this.alert(e, pos);
    }
  }

  // Sprinting boots on hardwood. Not a gunshot — a nearby sentry doesn't
  // ALERT, he gets SUSPICIOUS and turns toward the noise. Keep sprinting in
  // his lap and suspicion does the rest. This is what makes the last few
  // steps of a takedown approach a crouch, not a charge.
  hearFootstep(pos) {
    for (const e of this.list) {
      if (e.alerted) continue;
      const d = Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z);
      if (d > FOOTSTEP_HEAR) continue;
      e.aware = Math.min(1.25, e.aware + 0.3);
      e.lastKnown.set(pos.x, 0, pos.z);
      e.hasIntel = true;
      if (e.aware >= 0.5 && !e._blip) {
        e._blip = true;
        sfx.suspicion(d);
      }
      if (e.aware > 0.5 && !e.static) {     // turn toward the noise
        e.facing = Math.atan2(pos.x - e.pos.x, pos.z - e.pos.z);
        e.fig.rotation.y = e.facing;
      }
      if (e.aware >= 1) this.alert(e, pos);
    }
  }

  // A silent takedown: the victim drops without a shot. Only the SCUFFLE is
  // audible — a buddy standing beside him hears the body drop; a lone sentry
  // dies unnoticed. This is what makes two-man posts a puzzle.
  // Returns the finisher kind it rolled (so foley can match the animation),
  // or false if the man was already gone.
  takedown(e, killerPos) {
    const i = this.list.indexOf(e);
    if (i === -1) return false;
    const dx = e.pos.x - killerPos.x, dz = e.pos.z - killerPos.z;
    const len = Math.hypot(dx, dz) || 1;
    e.fig.userData.animate(0, 0);   // settle out of mid-stride for a clean fall
    // Yaw-first rotation order so the finisher tips him over HIS OWN axes —
    // face-down means over his toes, not toward whatever north happens to be.
    e.fig.rotation.order = 'YXZ';
    const kind = TAKEDOWN_KINDS[Math.floor(Math.random() * TAKEDOWN_KINDS.length)];
    this.dying.push({
      fig: e.fig, t: 0, kind,
      dx: dx / len, dz: dz / len,   // away from the killer
      yaw0: e.fig.rotation.y,
      tip: Math.random() < 0.5 ? 1 : -1,
      spin: Math.random() < 0.5 ? 1 : -1,
    });
    e.fig.remove(e.tell);
    this.list.splice(i, 1);
    this.kills++;
    this.silent++;
    this.hearScuffle(e.pos);
    return kind;
  }

  hearScuffle(pos) {
    for (const e of this.list) {
      if (Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z) < 8) this.alert(e, pos);
    }
  }

  // A grenade is heard much farther than a rifle, and the concussion pins
  // anyone near the blast.
  hearBlast(pos) {
    this.combatStarted = true;
    for (const e of this.list) {
      const d = Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z);
      if (d < BLAST_HEAR) this.alert(e, pos);
      if (d < 10) e.suppressed = Math.max(e.suppressed, 1.0);
    }
  }

  // A live grenade nearby: everyone who sees it screams and runs.
  panicFrom(pos, radius) {
    for (const e of this.list) {
      if (Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z) > radius) continue;
      if (e.panicT <= 0) barks.say(e.fig, 'GRENADE!', '#ff6a50');
      e.panicT = Math.max(e.panicT, 0.9);
      e.panicFrom.set(pos.x, 0, pos.z);
      this.alert(e, pos);
    }
  }

  update(dt, squad, bullets) {
    this.hitFlash = Math.max(0, this.hitFlash - dt);

    // Takedown finishers in flight: each plays until the body is at rest.
    for (let i = this.dying.length - 1; i >= 0; i--) {
      const d = this.dying[i];
      d.t += dt;
      if (this._finisher(d, dt)) {
        this.corpses.push(d.fig);  // corpse stays in the scene — a toy battlefield
        this.dying.splice(i, 1);
      }
    }

    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i];

      // --- Incoming player-team fire. HEAD first (a clean hit above the
      // shoulders CRACKS for double — aim skill pays), then the torso. ---
      for (const b of bullets.active) {
        if (b.team !== 'player') continue;
        const hx = b.mesh.position.x - e.pos.x;
        const hy = b.mesh.position.y - (e.baseY + TORSO_Y);
        const hz = b.mesh.position.z - e.pos.z;
        if (hx * hx + hy * hy + hz * hz < HIT_RADIUS * HIT_RADIUS) {
          const ny = b.mesh.position.y - (e.baseY + 1.93);
          const crit = hx * hx + ny * ny + hz * hz < 0.34 * 0.34;
          if (crit) {
            this.headshots++;
            sfx.crit();
            this.hitFlash = 0.22;
          } else {
            this.hitFlash = 0.12;
          }
          e.hp -= b.damage * (crit ? 2 : 1);
          e.stagger = 0.35;                       // FLINCH: hit = can't shoot for a beat
          e.aimT = (e.aimT || 0) * 0.4;           // and his settle rattles loose
          // Pain is intel: the tracer points back at whoever is closest.
          const shooter = this._nearestSoldier(squad, e.pos);
          this.alert(e, shooter ? shooter.position : null);
          // Rock him back along the bullet's path.
          const bd = b.dir || this._v.set(0, 0, 0);
          moveBy(e.pos, bd.x * 0.5, bd.z * 0.5, this.obstacles, 0.6, this.bounds);
          e.fig.position.copy(e.pos);
          bullets.burst(b.mesh.position);   // sparks on flesh... plastic
          bullets.retireBullet(b);
          break;
        }
      }
      if (e.hp <= 0) {
        // A LOUD kill SHATTERS the toy into plastic shards (takedowns slump
        // a quiet corpse instead — the battlefield tells you how each died).
        this._v.set(e.pos.x, e.baseY, e.pos.z);
        bullets.shatter(this._v);
        this.scene.remove(e.fig);
        this.list.splice(i, 1);
        this.kills++;
        continue;
      }

      e.suppressed = Math.max(0, e.suppressed - dt);
      e.stagger = Math.max(0, e.stagger - dt);
      e.alertFlash = Math.max(0, e.alertFlash - dt);

      if (e.panicT > 0 && !e.static) {
        // GRENADE! Nothing else matters — scatter away from it.
        e.panicT -= dt;
        const dx = e.pos.x - e.panicFrom.x, dz = e.pos.z - e.panicFrom.z;
        const d = Math.hypot(dx, dz) || 1;
        moveBy(e.pos, (dx / d) * e.speed * 1.35 * dt, (dz / d) * e.speed * 1.35 * dt,
               this.obstacles, 0.6, this.bounds);
        e.fig.position.copy(e.pos);
        e.facing = Math.atan2(dx, dz);
        e.fig.rotation.y = e.facing;
      } else if (!e.alerted) {
        e.alertedFor = 0;
        this._sentry(e, dt, squad);
      } else {
        e.alertedFor += dt;
        this._fight(e, dt, squad, bullets);
      }

      // Walk cycle from ground covered (patrols, hunts, repositions alike).
      // Same cadence as the greens — see soldier.js.
      const mvd = Math.hypot(e.pos.x - (e._px ?? e.pos.x), e.pos.z - (e._pz ?? e.pos.z));
      e._px = e.pos.x; e._pz = e.pos.z;
      e.walkPhase = (e.walkPhase || 0) + mvd * 2.0;
      e.animAmp = (e.animAmp || 0) + ((mvd > 0.004 ? 1 : 0) - (e.animAmp || 0)) * Math.min(1, dt * 9);
      e.fig.userData.animate(e.walkPhase, e.animAmp);

      // --- Detection tell ---
      // "?" growing = a sentry getting suspicious. "!" = made. Steady "?" on
      // an alerted man = he LOST you and is hunting — stay down or relocate.
      if (!e.alerted && e.aware > 0.06) {
        e.tell.visible = true;
        e.tell.material = MAT_Q;
        const s = 1.0 + e.aware * 1.4;
        e.tell.scale.set(s, s, 1);
        e.tell.material.opacity = 0.45 + 0.55 * e.aware;
      } else if (e.alerted && e.alertFlash > 0) {
        e.tell.visible = true;
        e.tell.material = MAT_BANG;
        e.tell.scale.set(2.1, 2.1, 1);
      } else if (e.alerted && e.runningToRadio) {
        // The RUNNER wears a pulsing "!" the whole way — you can pick him
        // out of a firefight at a glance.
        e.tell.visible = true;
        e.tell.material = MAT_BANG;
        const p = 1.6 + Math.sin(performance.now() * 0.02) * 0.3;
        e.tell.scale.set(p, p, 1);
      } else if (e.alerted && e.searching) {
        e.tell.visible = true;
        e.tell.material = MAT_Q;
        e.tell.scale.set(1.7, 1.7, 1);
        e.tell.material.opacity = 0.9;
      } else {
        e.tell.visible = false;
      }
    }

    // Score the room for the music: shots exchanged recently = combat (it
    // lingers 3s so the track doesn't stutter between bursts), anyone still
    // hunting = tension, the house asleep = calm.
    let anyAlert = false;
    for (const e of this.list) if (e.alerted) { anyAlert = true; break; }
    if (this._engaged) {
      this._combatUntil = performance.now() + 3000;
      this._engaged = false;
    }
    this.musicState = performance.now() < this._combatUntil
      ? 'combat'
      : anyAlert ? 'tension' : 'calm';
  }

  // How hot is the radio RIGHT NOW? 0 quiet · 1 a runner is loose ·
  // 2 he's AT the handset calling. Drives the HUD warning.
  get radioThreat() {
    let t = 0;
    for (const e of this.list) {
      if (!e.runningToRadio) continue;
      if (e.callT > 0) return 2;
      t = 1;
    }
    return t;
  }

  // --- SENTRY: stand watch / walk patrol; build suspicion on what you see ---
  _sentry(e, dt, squad) {
    if (e.patrol && !e.static) {
      // Patrol walk (ping-pong between spawn and patrol point). navStep also
      // walks him BACK to the route after an investigation took him far away.
      const goal = e.patrol.toB ? e.patrol.b : e.patrol.a;
      if (Math.hypot(goal.x - e.pos.x, goal.z - e.pos.z) < 0.8) {
        e.patrol.toB = !e.patrol.toB;
      } else {
        const dir = navStep(this.nav, e, e.pos, goal, PATROL_SPEED, dt,
                            this.obstacles, 0.6, this.bounds);
        e.fig.position.copy(e.pos);
        if (dir) {
          e.facing = Math.atan2(dir.x, dir.z);
          e.fig.rotation.y = e.facing;
        }
      }
    } else if (!e.static && Math.hypot(e.home.x - e.pos.x, e.home.z - e.pos.z) > 1.2) {
      // Drifted off the post (came back from a search): walk home.
      const dir = navStep(this.nav, e, e.pos, e.home, PATROL_SPEED, dt,
                          this.obstacles, 0.6, this.bounds);
      e.fig.position.copy(e.pos);
      if (dir) {
        e.facing = Math.atan2(dir.x, dir.z);
        e.fig.rotation.y = e.facing;
      }
    } else if (Math.abs(e.facing - e.home.facing) > 0.01 && e.aware < 0.05) {
      // Back on post and calm again: settle into the watch facing.
      e.facing = e.home.facing;
      e.fig.rotation.y = e.facing;
    }

    // Watch the arc: nearest visible squad member in the cone. Sight checks
    // run at real heights — a crouched man can hide behind knee-high cover
    // (but POPPING OUT over it counts as standing). A sentry whose LAMP got
    // shot out is squinting into the dark.
    let sightR = SIGHT_RANGE * e.sightMult;
    for (const lamp of this.lamps) {
      if (!lamp.alive &&
          Math.hypot(e.pos.x - lamp.pos.x, e.pos.z - lamp.pos.z) < lamp.radius) {
        sightR *= 0.6;
        break;
      }
    }
    let seen = null, seenD = sightR;
    const fx = Math.sin(e.facing), fz = Math.cos(e.facing);
    for (const m of squad.members) {
      if (!m.alive) continue;
      const dx = m.position.x - e.pos.x, dz = m.position.z - e.pos.z;
      const d = Math.hypot(dx, dz);
      if (d >= seenD) continue;
      if ((fx * dx + fz * dz) / (d || 1) < e.cone) continue;
      const hidden = m.crouched && !m.peeking;
      if (!hasLineOfSight(e.pos, m.position, this.obstacles, 1.5 + e.baseY, hidden ? 0.8 : 1.25)) continue;
      seen = m; seenD = d;
    }
    if (seen) {
      // Suspicion climbs QUADRATICALLY with proximity — being seen across the
      // room buys you a beat; being seen at conversation distance does not.
      const sneaking = seen.crouched && !seen.peeking;
      const prox = 1 - seenD / sightR;
      let rate = AWARE_RATE * (0.15 + 1.7 * prox * prox);
      if (sneaking) rate *= 0.5;                             // sneaking works
      if (seen.sprinting) rate *= 1.8;                       // sprinting is LOUD
      // If he can see you like you can see him, he's ALERT — no grace period
      // for standing in a sentry's face.
      if (seenD < SPOT_INSTANT && !sneaking) rate = Math.max(rate, 4.5);
      e.aware += dt * Math.max(0.15, rate);
      // Suspicion crossing the line gets a SOUND — stealth is played by ear.
      if (e.aware >= 0.5 && !e._blip) {
        e._blip = true;
        sfx.suspicion(seenD);
      }
      if (e.aware >= 1) this.alert(e, seen.position);
    } else {
      e.aware = Math.max(0, e.aware - dt * AWARE_DECAY);
      if (e.aware < 0.25) e._blip = false;
    }
  }

  // --- ALERTED: fight what you can SEE; hunt what you can't ---
  // An alerted soldier with eyes on a green fights: cover, range, fire. One
  // who has LOST you doesn't freeze — he walks to where he last knew you were,
  // scans, and if the house stays quiet he shrugs and goes back to his post.
  // That loop (alert → hunt → stand down) is what makes sneaking a GAME.
  _fight(e, dt, squad, bullets) {
    // Whom can we actually see? Alerted men look all around (no cone), but
    // walls and furniture still matter, and crouching still hides you.
    let target = null, tDist = FIGHT_SIGHT;
    for (const m of squad.members) {
      if (!m.alive) continue;
      const d = e.pos.distanceTo(m.position);
      if (d >= tDist) continue;
      const hidden = m.crouched && !m.peeking;
      if (!hasLineOfSight(e.pos, m.position, this.obstacles, 1.5 + e.baseY, hidden ? 0.75 : 1.1)) continue;
      target = m; tDist = d;
    }

    // RUN FOR THE RADIO: a spooked SCOUT bolts for it (he only fights
    // cornered). ONLY scouts run — sprinters you can see, chase, and
    // learn; if every rifleman could call it in too, any noise anywhere
    // would guarantee the alarm. Reaching it raises it — kill the runner
    // or kill the radio. The whole act is TELEGRAPHED: he announces the
    // run, wears a pulsing "!", and the call itself beeps for 4 seconds.
    const radio = this.radio;
    e.runningToRadio = false;
    if (radio && radio.alive && !this.alarmRaised) {
      const wantsRun = e.runner && !(target && tDist < 9);
      if (wantsRun) {
        e.runningToRadio = true;
        if (!e._ranBark) {
          e._ranBark = true;
          barks.say(e.fig, 'CALLING IT IN!', '#ff6a50');
        }
        const rd = Math.hypot(radio.pos.x - e.pos.x, radio.pos.z - e.pos.z);
        if (rd > 2.2) {
          e.callT = 0;
          const dir = navStep(this.nav, e, e.pos, radio.pos, e.speed * 1.1, dt,
                              this.obstacles, 0.6, this.bounds);
          e.fig.position.copy(e.pos);
          if (dir) e.facing = Math.atan2(dir.x, dir.z);
        } else {
          e.callT += dt;                       // shouting into the handset
          // Handset beeps climb with the call — you HEAR the window closing.
          if (((e.callT / 0.8) | 0) !== (((e.callT - dt) / 0.8) | 0)) {
            const d = squad.active
              ? Math.hypot(e.pos.x - squad.active.position.x, e.pos.z - squad.active.position.z)
              : 0;
            sfx.callBeep(e.callT / CALL_TIME, d);
          }
          e.facing = Math.atan2(radio.pos.x - e.pos.x, radio.pos.z - e.pos.z);
          if (e.callT > CALL_TIME) this.raiseAlarm(squad);
        }
        e.searching = false;
        e.fig.rotation.y = e.facing;
        return;
      }
    }

    if (!target) {
      e.cover = null;
      e.aimT = 0;                      // lost you — his settle starts over
      e.postT = 0;
      // INVESTIGATE: walk to the last clue (a muzzle flash heard, a buddy's
      // shout, the spot we saw them) — then SEARCH on the spot.
      let arrived = true;
      if (e.hasIntel && !e.static && Math.hypot(e.lastKnown.x - e.pos.x, e.lastKnown.z - e.pos.z) > 2.2) {
        const dir = navStep(this.nav, e, e.pos, e.lastKnown, e.speed * 0.8, dt,
                            this.obstacles, 0.6, this.bounds);
        e.fig.position.copy(e.pos);
        if (dir) {
          arrived = false;
          e.searching = false;
          e.facing = Math.atan2(dir.x, dir.z);
        }
      }
      if (arrived) {
        if (!e.searching) barks.say(e.fig, pick(['Where did he go?', 'Come out, green…', 'I heard something.']), '#cdb072');
        e.searching = true;
        e.facing += dt * 1.4;            // scan the room
        e.searchT += dt;
        if (e.searchT > SEARCH_TIME) {   // nothing here — stand down, stay jumpy
          barks.say(e.fig, pick(['Must have been nothing…', 'Rats, probably.']), '#9a8a6a');
          e.alerted = false;
          e.searching = false;
          e.searchT = 0;
          e.hasIntel = false;
          e.aware = 0.5;
          e._navPath = null;
        }
      }
      e.fig.rotation.y = e.facing;
      return;
    }

    // Eyes on: remember where, and fight.
    e.searching = false;
    e.searchT = 0;
    e.hasIntel = true;
    e.lastKnown.set(target.position.x, 0, target.position.z);
    this._engaged = true;            // the music hears the fight
    // SETTLING AIM: seconds-on-target tighten his cone (see the fire block).
    e.aimT = (e.aimT || 0) + dt;
    e.postT = (e.postT || 0) + dt;

    this._v.subVectors(target.position, e.pos); this._v.y = 0;
    const dist = this._v.length();

    e.recheck -= dt;
    if (!e.static && (e.recheck <= 0 || !e.cover)) {
      // A man who's traded fire from the same spot too long SHIFTS to a
      // different piece of cover — fights that never move are shooting
      // galleries.
      const stale = e.cover && e.postT > 4.5 && Math.random() < 0.5;
      e.cover = this._findCover(e, target, stale ? e.cover : null);
      if (stale) e.postT = 0;
      e.recheck = COVER_RECHECK;
    }
    if (e.cover && !hasLineOfSight(e.cover, target.position, this.obstacles)) e.cover = null;

    let goal = null;
    if (e.cover) goal = e.cover;
    else if (!e.static && dist > ENEMY_PREFERRED + 2) {
      const k = ENEMY_PREFERRED / dist;
      this._g.set(target.position.x - this._v.x * k, 0, target.position.z - this._v.z * k);
      goal = this._g;
    }

    if (goal && !e.static) {
      this._g.subVectors(goal, e.pos); this._g.y = 0;
      if (this._g.length() > 0.5) {
        navStep(this.nav, e, e.pos, goal, e.speed, dt, this.obstacles, 0.6, this.bounds);
        e.fig.position.copy(e.pos);
      }
    }

    e.facing = Math.atan2(this._v.x, this._v.z);
    e.fig.rotation.y = e.facing;

    e.fireCd -= dt;
    if (dist < ENEMY_RANGE * 0.9 && e.fireCd <= 0 && e.suppressed <= 0 && e.stagger <= 0) {
      const muzzle = e.fig.localToWorld(e.fig.userData.muzzleOffset.clone());
      // Aim where the body actually is — crouching lowers the target,
      // popping out over cover raises it again.
      const aimY = (target.crouched && !target.peeking) ? 0.75 : TORSO_Y;
      const aim = new THREE.Vector3(target.position.x, aimY, target.position.z).sub(muzzle).normalize();
      // SETTLING AIM: a fresh target gets wide first shots (you HEAR them
      // snap past); ~2.5s of eyes-on tightens to true. Ducking out of sight
      // resets him; hitting him rattles it. That's the duel: pop, trade,
      // and get back down before he settles.
      const settle = Math.min(1, (e.aimT || 0) / 2.5);
      const sp = e.spread * (2.2 - 1.2 * settle);
      aim.x += (Math.random() - 0.5) * sp;
      aim.y += (Math.random() - 0.5) * sp;
      aim.z += (Math.random() - 0.5) * sp;
      bullets.fire(muzzle, aim.normalize(), 'enemy', e.damage);
      // GUNNER: 4-round burst, then a long breath. Everyone else: steady.
      if (e.burst) {
        e.burstLeft--;
        e.fireCd = e.burstLeft > 0 ? e.fireInterval : (e.burstLeft = e.burst, e.burstPause);
      } else {
        e.fireCd = e.fireInterval;
      }
      this.combatStarted = true;
    }

    if (dist < TOUCH_RANGE) target.takeDamage(TOUCH_DPS * dt, e.pos);
  }

  // One frame of a takedown finisher (see TAKEDOWN_KINDS). The figure pivots
  // at its feet, so rotation.x = ±PI/2 sweeps the body down like a felled
  // tree: + is face-down ahead of him, - is flat on his back behind him.
  // Returns true once the final pose is set.
  _finisher(d, dt) {
    const f = d.fig;
    const rifle = f.userData.rifle;
    switch (d.kind) {
      case 'swat': {
        // Batted off his feet — a short fly-back, then flat on his side.
        if (d.t >= 0.45) {
          f.rotation.z = (Math.PI / 2) * d.tip;
          f.position.y = 0.3;
          return true;
        }
        f.position.x += d.dx * dt * 9;
        f.position.z += d.dz * dt * 9;
        f.position.y = Math.sin((d.t / 0.45) * Math.PI) * 1.2;
        f.rotation.z = (d.t / 0.45) * (Math.PI / 2) * d.tip;
        return false;
      }
      case 'crumple': {
        // Knees buckle, a held beat kneeling, then face-down like a
        // dropped doll.
        if (d.t < 0.28) {
          const k = easeOut(d.t / 0.28);
          f.position.y = -0.5 * k;
          f.rotation.x = 0.18 * k;
          rifle.rotation.x = 0.12 + 0.95 * k;   // the muzzle sags with his grip
        } else if (d.t < 0.6) {
          f.position.y = -0.5;                  // the beat on his knees
          f.rotation.x = 0.18;
        } else if (d.t < 1.0) {
          const k = easeIn((d.t - 0.6) / 0.4);
          f.rotation.x = 0.18 + (Math.PI / 2 - 0.18) * k;
          f.position.y = -0.5 + 0.64 * k;       // the pivot rides up as he lays out
        } else {
          f.rotation.x = Math.PI / 2;
          f.position.y = 0.14;
          return true;
        }
        return false;
      }
      case 'spin': {
        // Wrenched half-around — then straight down on his back.
        if (d.t < 0.22) {
          f.rotation.y = d.yaw0 + 2.6 * d.spin * easeOut(d.t / 0.22);
        } else if (d.t < 0.62) {
          const k = easeIn((d.t - 0.22) / 0.4);
          f.rotation.y = d.yaw0 + (2.6 + 0.5 * k) * d.spin;
          f.rotation.x = -(Math.PI / 2) * k;
          f.position.y = Math.sin(k * Math.PI) * 0.2 + 0.15 * k;
          rifle.rotation.x = 0.12 + 1.0 * k;
        } else {
          f.rotation.x = -Math.PI / 2;
          f.position.y = 0.15;
          return true;
        }
        return false;
      }
      case 'drag': {
        // Hauled over backward — he lands looking up from the killer's boots.
        if (d.t >= 0.5) {
          f.rotation.x = -Math.PI / 2;
          f.position.y = 0.15;
          return true;
        }
        const k = easeIn(d.t / 0.5);
        f.rotation.x = -(Math.PI / 2) * k;
        f.position.x -= d.dx * dt * 2.4;        // slides INTO the grab
        f.position.z -= d.dz * dt * 2.4;
        f.position.y = Math.sin((d.t / 0.5) * Math.PI) * 0.18 + 0.15 * k;
        rifle.rotation.x = 0.12 + 1.1 * k;
        return false;
      }
    }
    return true;
  }

  _nearestSoldier(squad, from) {
    let best = null, bestD = Infinity;
    for (const m of squad.members) {
      if (!m.alive) continue;
      const d = m.position.distanceTo(from);
      if (d < bestD) { bestD = d; best = m; }
    }
    return best;
  }

  // `excl` (optional Vector3): a spot to move AWAY from — used when a man
  // has gone stale at his post and wants a different angle.
  _findCover(e, target, excl = null) {
    let best = null, bestScore = Infinity;
    for (const c of this.coverPoints) {
      if (c.distanceTo(e.pos) > COVER_SEARCH) continue;
      if (excl && c.distanceTo(excl) < 4) continue;
      const dT = c.distanceTo(target.position);
      if (dT > ENEMY_RANGE) continue;
      if (!hasLineOfSight(c, target.position, this.obstacles)) continue;
      const score = c.distanceTo(e.pos) + Math.abs(dT - ENEMY_PREFERRED) * 0.5;
      if (score < bestScore) { bestScore = score; best = c; }
    }
    return best ? best.clone() : null;
  }
}
