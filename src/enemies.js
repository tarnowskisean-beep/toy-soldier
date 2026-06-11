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
import { BOUNDS } from './world.js';

const ENEMY_HP = 40;
const ENEMY_SPEED = 5;
const ENEMY_RANGE = 30;        // max engagement distance once alerted
const ENEMY_PREFERRED = 14;    // likes to fight from about here
const ENEMY_FIRE_INTERVAL = 0.8;
const ENEMY_DAMAGE = 7;
const ENEMY_SPREAD = 0.07;
const COVER_SEARCH = 24;
const COVER_RECHECK = 2.5;
const HIT_RADIUS = 1.1;
const TOUCH_RANGE = 2.0;
const TOUCH_DPS = 20;

// Detection model.
const SIGHT_RANGE = 23;        // how far a sentry can see
const SIGHT_CONE = 0.2;        // dot(facing, toTarget) must exceed this (~78°)
const HEAR_RANGE = 17;         // gunfire within this wakes a sentry
const SHOUT_RANGE = 9;         // an alerted soldier wakes friends within this
const AWARE_RATE = 1.1;        // seconds^-1 of suspicion while you're visible
const AWARE_DECAY = 0.5;
const PATROL_SPEED = 2.6;

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

export class Enemies {
  constructor(scene, obstacles, coverPoints) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.coverPoints = coverPoints;
    this.list = [];
    this.dying = [];               // knockdown animations in flight
    this.kills = 0;
    this.combatStarted = false;    // green ROE: squad AI holds fire until this
    this.firstSpotted = false;     // drops the UNDETECTED tag
    this.hitFlash = 0;             // >0 briefly when a player bullet lands (HUD hitmarker)
    this._v = new THREE.Vector3();
    this._g = new THREE.Vector3();
  }

  // A spawn that lands inside furniture would be blind (LOS from inside a box
  // always fails) and stuck — nudge it to the nearest free spot.
  _freeSpot(x, z) {
    const inside = (px, pz) => this.obstacles.some(b =>
      px > b.min.x - 0.6 && px < b.max.x + 0.6 && pz > b.min.z - 0.6 && pz < b.max.z + 0.6);
    if (!inside(x, z)) return { x, z };
    for (let r = 1; r < 8; r += 0.5) {
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        const px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r;
        if (!inside(px, pz)) return { x: px, z: pz };
      }
    }
    return { x, z };
  }

  // Spawn the mission's layout: [{ x, z, facing(rad), patrol?: {x, z} }, ...]
  spawnLayout(layout) {
    for (const s of layout) {
      const fig = createFigure(0xc2a86a);
      const spot = this._freeSpot(s.x, s.z);
      const pos = new THREE.Vector3(spot.x, 0, spot.z);
      fig.position.copy(pos);
      fig.rotation.y = s.facing;
      this.scene.add(fig);

      const tell = new THREE.Sprite(MAT_Q);
      tell.scale.set(1.5, 1.5, 1);
      tell.position.set(0, 3.1, 0);
      tell.visible = false;
      fig.add(tell);

      this.list.push({
        fig, pos, tell,
        hp: ENEMY_HP,
        fireCd: Math.random() * 0.5,
        recheck: 0, cover: null, suppressed: 0, stagger: 0,
        alerted: false, aware: 0, alertFlash: 0,
        facing: s.facing,
        patrol: s.patrol ? { a: { x: s.x, z: s.z }, b: { ...s.patrol }, toB: true } : null,
      });
    }
  }

  alert(e) {
    if (e.alerted) return;
    e.alerted = true;
    e.alertFlash = 2.2;
    this.firstSpotted = true;
    this.combatStarted = true;
    // Shout: wake nearby friends.
    for (const o of this.list) {
      if (!o.alerted && Math.hypot(o.pos.x - e.pos.x, o.pos.z - e.pos.z) < SHOUT_RANGE) {
        o.alerted = true;
        o.alertFlash = 2.2;
      }
    }
  }

  // Gunfire wakes sentries in earshot ONLY — fights stay local; the far rooms
  // sleep until the noise reaches them.
  hearGunshot(pos) {
    this.combatStarted = true;
    for (const e of this.list) {
      if (!e.alerted && Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z) < HEAR_RANGE) this.alert(e);
    }
  }

  applySuppression(point, radius, time) {
    for (const e of this.list) {
      const dx = e.pos.x - point.x, dz = e.pos.z - point.z;
      if (dx * dx + dz * dz < radius * radius) {
        if (!e.alerted) this.alert(e);
        e.suppressed = Math.max(e.suppressed, time);
        e.recheck = Math.min(e.recheck, 0.2);
      }
    }
  }

  update(dt, squad, bullets) {
    this.hitFlash = Math.max(0, this.hitFlash - dt);

    // Knockdown animations: the swatted-toy fly-back, then they lie still.
    for (let i = this.dying.length - 1; i >= 0; i--) {
      const d = this.dying[i];
      d.t += dt;
      if (d.t < 0.45) {
        d.fig.position.x += d.dx * dt * 9;
        d.fig.position.z += d.dz * dt * 9;
        d.fig.position.y = Math.sin(Math.min(1, d.t / 0.45) * Math.PI) * 1.2;
        d.fig.rotation.z = (d.t / 0.45) * (Math.PI / 2) * d.tip;
      } else {
        d.fig.rotation.z = (Math.PI / 2) * d.tip;
        d.fig.position.y = 0.3;
        this.dying.splice(i, 1);   // corpse stays in the scene — a toy battlefield
      }
    }

    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i];

      // --- Incoming player-team fire ---
      for (const b of bullets.active) {
        if (b.team !== 'player') continue;
        if (b.mesh.position.distanceTo(e.pos) < HIT_RADIUS) {
          e.hp -= b.damage;
          e.stagger = 0.35;                       // FLINCH: hit = can't shoot for a beat
          this.hitFlash = 0.12;
          this.alert(e);
          // Rock him back along the bullet's path.
          const bd = b.dir || this._v.set(0, 0, 0);
          moveBy(e.pos, bd.x * 0.5, bd.z * 0.5, this.obstacles, 0.6, BOUNDS);
          e.fig.position.copy(e.pos);
          bullets.retireBullet(b);
          break;
        }
      }
      if (e.hp <= 0) {
        // Knocked flying like a swatted toy.
        const dir = this._v.subVectors(e.pos, this._nearestSoldier(squad, e.pos)?.position || e.pos);
        const len = Math.hypot(dir.x, dir.z) || 1;
        this.dying.push({ fig: e.fig, t: 0, dx: dir.x / len, dz: dir.z / len, tip: Math.random() < 0.5 ? 1 : -1 });
        e.fig.remove(e.tell);
        this.list.splice(i, 1);
        this.kills++;
        continue;
      }

      e.suppressed = Math.max(0, e.suppressed - dt);
      e.stagger = Math.max(0, e.stagger - dt);
      e.alertFlash = Math.max(0, e.alertFlash - dt);

      if (!e.alerted) {
        this._sentry(e, dt, squad);
      } else {
        this._fight(e, dt, squad, bullets);
      }

      // --- Detection tell ---
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
      } else {
        e.tell.visible = false;
      }
    }
  }

  // --- SENTRY: stand watch / walk patrol; build suspicion on what you see ---
  _sentry(e, dt, squad) {
    // Patrol walk (ping-pong between spawn and patrol point).
    if (e.patrol) {
      const goal = e.patrol.toB ? e.patrol.b : e.patrol.a;
      const dx = goal.x - e.pos.x, dz = goal.z - e.pos.z;
      const d = Math.hypot(dx, dz);
      if (d < 0.8) {
        e.patrol.toB = !e.patrol.toB;
      } else {
        moveBy(e.pos, (dx / d) * PATROL_SPEED * dt, (dz / d) * PATROL_SPEED * dt,
               this.obstacles, 0.6, BOUNDS);
        e.fig.position.copy(e.pos);
        e.facing = Math.atan2(dx, dz);
        e.fig.rotation.y = e.facing;
      }
    }

    // Watch the arc: nearest visible squad member in the cone.
    let seen = null, seenD = SIGHT_RANGE;
    const fx = Math.sin(e.facing), fz = Math.cos(e.facing);
    for (const m of squad.members) {
      if (!m.alive) continue;
      const dx = m.position.x - e.pos.x, dz = m.position.z - e.pos.z;
      const d = Math.hypot(dx, dz);
      if (d >= seenD) continue;
      if ((fx * dx + fz * dz) / (d || 1) < SIGHT_CONE) continue;
      if (!hasLineOfSight(e.pos, m.position, this.obstacles)) continue;
      seen = m; seenD = d;
    }
    if (seen) {
      let rate = AWARE_RATE * (1.2 - seenD / SIGHT_RANGE);   // closer = faster
      if (seen.crouched) rate *= 0.5;                        // sneaking works
      if (seen.sprinting) rate *= 1.8;                       // sprinting is LOUD
      e.aware += dt * Math.max(0.15, rate);
      if (e.aware >= 1) this.alert(e);
    } else {
      e.aware = Math.max(0, e.aware - dt * AWARE_DECAY);
    }
  }

  // --- ALERTED: the original tactical brain — cover, range, fire ---
  _fight(e, dt, squad, bullets) {
    const target = this._nearestSoldier(squad, e.pos);
    if (!target) return;

    this._v.subVectors(target.position, e.pos); this._v.y = 0;
    const dist = this._v.length();
    const los = hasLineOfSight(e.pos, target.position, this.obstacles);

    e.recheck -= dt;
    if (e.recheck <= 0 || !e.cover) {
      e.cover = this._findCover(e, target);
      e.recheck = COVER_RECHECK;
    }
    if (e.cover && !hasLineOfSight(e.cover, target.position, this.obstacles)) e.cover = null;

    let goal = null;
    if (e.cover) goal = e.cover;
    else if (dist > ENEMY_PREFERRED + 2) {
      const k = ENEMY_PREFERRED / dist;
      this._g.set(target.position.x - this._v.x * k, 0, target.position.z - this._v.z * k);
      goal = this._g;
    }

    if (goal) {
      this._g.subVectors(goal, e.pos); this._g.y = 0;
      const gd = this._g.length();
      if (gd > 0.5) {
        this._g.multiplyScalar(1 / gd);
        moveBy(e.pos, this._g.x * ENEMY_SPEED * dt, this._g.z * ENEMY_SPEED * dt,
               this.obstacles, 0.6, BOUNDS);
        e.fig.position.copy(e.pos);
      }
    }

    e.facing = Math.atan2(this._v.x, this._v.z);
    e.fig.rotation.y = e.facing;

    e.fireCd -= dt;
    if (los && dist < ENEMY_RANGE * 0.9 && e.fireCd <= 0 && e.suppressed <= 0 && e.stagger <= 0) {
      const muzzle = e.fig.localToWorld(e.fig.userData.muzzleOffset.clone());
      const aim = new THREE.Vector3(target.position.x, 1.1, target.position.z).sub(muzzle).normalize();
      aim.x += (Math.random() - 0.5) * ENEMY_SPREAD;
      aim.y += (Math.random() - 0.5) * ENEMY_SPREAD;
      aim.z += (Math.random() - 0.5) * ENEMY_SPREAD;
      bullets.fire(muzzle, aim.normalize(), 'enemy', ENEMY_DAMAGE);
      e.fireCd = ENEMY_FIRE_INTERVAL;
      this.combatStarted = true;
    }

    if (dist < TOUCH_RANGE) target.takeDamage(TOUCH_DPS * dt);
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

  _findCover(e, target) {
    let best = null, bestScore = Infinity;
    for (const c of this.coverPoints) {
      if (c.distanceTo(e.pos) > COVER_SEARCH) continue;
      const dT = c.distanceTo(target.position);
      if (dT > ENEMY_RANGE) continue;
      if (!hasLineOfSight(c, target.position, this.obstacles)) continue;
      const score = c.distanceTo(e.pos) + Math.abs(dT - ENEMY_PREFERRED) * 0.5;
      if (score < bestScore) { bestScore = score; best = c; }
    }
    return best ? best.clone() : null;
  }
}
