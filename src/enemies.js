// enemies.js — the tan army, now with a tactical brain.
//
// Each tan soldier: picks the nearest squad member, looks for a CRATE it can
// shoot from (a "cover point" with line-of-sight to its target), moves there,
// and fires from cover. With no good cover it just holds at a comfortable range
// and shoots. Crates block bullets and sight lines, so positioning is real now.

import * as THREE from 'three';
import { createFigure } from './figure.js';
import { moveBy, hasLineOfSight } from './physics.js';
import { ARENA } from './world.js';

const ENEMY_HP = 40;
const ENEMY_SPEED = 5;
const ENEMY_RANGE = 36;        // can shoot a target within this distance...
const ENEMY_PREFERRED = 15;    // ...but likes to hold around here
const ENEMY_FIRE_INTERVAL = 0.85;
const ENEMY_DAMAGE = 8;
const ENEMY_SPREAD = 0.07;
const COVER_SEARCH = 28;       // how far an enemy will look for a crate to use
const COVER_RECHECK = 2.5;     // seconds between re-picking cover
const HIT_RADIUS = 1.1;        // player bullet vs enemy
const TOUCH_RANGE = 2.0;       // melee fallback if a squaddie is right on top
const TOUCH_DPS = 20;

export class Enemies {
  constructor(scene, obstacles, coverPoints) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.coverPoints = coverPoints;
    this.list = [];
    this.kills = 0;
    this.respawnOnDeath = false;   // missions spawn finite enemies / their own waves
    this._v = new THREE.Vector3();
    this._g = new THREE.Vector3();
  }

  spawnWave(count) {
    for (let i = 0; i < count; i++) this._spawnOne();
  }

  _spawnOne() {
    const fig = createFigure(0xc2a86a);   // tan
    const angle = Math.random() * Math.PI * 2;
    const dist = ARENA * 0.7;
    const pos = new THREE.Vector3(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
    fig.position.copy(pos);
    this.scene.add(fig);
    this.list.push({ fig, pos, hp: ENEMY_HP, fireCd: Math.random() * 0.5, recheck: 0, cover: null, suppressed: 0 });
  }

  // The Heavy's suppress ability pins down enemies near `point`: they stop firing
  // and scramble (they keep seeking cover). Called each frame while suppressing.
  applySuppression(point, radius, time) {
    for (const e of this.list) {
      const dx = e.pos.x - point.x, dz = e.pos.z - point.z;
      if (dx * dx + dz * dz < radius * radius) {
        e.suppressed = Math.max(e.suppressed, time);
        e.recheck = Math.min(e.recheck, 0.2);   // re-pick cover quickly
      }
    }
  }

  update(dt, squad, bullets) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i];

      // --- Take incoming fire from the squad (player-team bullets) ---
      for (const b of bullets.active) {
        if (b.team !== 'player') continue;
        if (b.mesh.position.distanceTo(e.pos) < HIT_RADIUS) {
          e.hp -= b.damage;              // class damage matters: sniper one-shots
          bullets.retireBullet(b);
          break;
        }
      }
      if (e.hp <= 0) {
        this.scene.remove(e.fig);
        this.list.splice(i, 1);
        this.kills++;
        if (this.respawnOnDeath) this._spawnOne();   // endless mode only
        continue;
      }

      // --- Pick a target ---
      const target = this._nearestSoldier(squad, e.pos);
      if (!target) continue;            // squad wiped — nothing to do

      this._v.subVectors(target.position, e.pos); this._v.y = 0;
      const dist = this._v.length();
      const los = hasLineOfSight(e.pos, target.position, this.obstacles);

      // --- Choose / validate cover ---
      e.recheck -= dt;
      if (e.recheck <= 0 || !e.cover) {
        e.cover = this._findCover(e, target);
        e.recheck = COVER_RECHECK;
      }
      // Drop cover that no longer sees the target (e.g. the target moved).
      if (e.cover && !hasLineOfSight(e.cover, target.position, this.obstacles)) e.cover = null;

      // --- Decide where to move ---
      let goal = null;
      if (e.cover) {
        goal = e.cover;
      } else if (dist > ENEMY_PREFERRED + 2) {
        // No cover: close to preferred range along the line to the target.
        const k = ENEMY_PREFERRED / dist;
        this._g.set(
          target.position.x - this._v.x * k,
          0,
          target.position.z - this._v.z * k
        );
        goal = this._g;
      }

      if (goal) {
        this._g.subVectors(goal, e.pos); this._g.y = 0;
        const gd = this._g.length();
        if (gd > 0.5) {
          this._g.multiplyScalar(1 / gd);
          moveBy(e.pos, this._g.x * ENEMY_SPEED * dt, this._g.z * ENEMY_SPEED * dt,
                 this.obstacles, 0.6, ARENA - 1);
          e.fig.position.copy(e.pos);
        }
      }

      // Always face the target.
      e.fig.rotation.y = Math.atan2(this._v.x, this._v.z);

      // --- Shoot (clear line, in range, and not pinned by suppressing fire) ---
      e.fireCd -= dt;
      e.suppressed = Math.max(0, e.suppressed - dt);
      if (los && dist < ENEMY_RANGE && e.fireCd <= 0 && e.suppressed <= 0) {
        const muzzle = e.fig.localToWorld(e.fig.userData.muzzleOffset.clone());
        const aim = new THREE.Vector3(target.position.x, 1.1, target.position.z).sub(muzzle).normalize();
        aim.x += (Math.random() - 0.5) * ENEMY_SPREAD;
        aim.y += (Math.random() - 0.5) * ENEMY_SPREAD;
        aim.z += (Math.random() - 0.5) * ENEMY_SPREAD;
        bullets.fire(muzzle, aim.normalize(), 'enemy', ENEMY_DAMAGE);
        e.fireCd = ENEMY_FIRE_INTERVAL;
      }

      // Melee fallback if a soldier is right on top of them.
      if (dist < TOUCH_RANGE) target.takeDamage(TOUCH_DPS * dt);
    }
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

  // Find the best nearby cover point that can see the target: close to us,
  // within firing range of the target. Returns a clone or null.
  _findCover(e, target) {
    let best = null, bestScore = Infinity;
    for (const c of this.coverPoints) {
      if (c.distanceTo(e.pos) > COVER_SEARCH) continue;
      const dT = c.distanceTo(target.position);
      if (dT > ENEMY_RANGE) continue;                              // too far to shoot from
      if (!hasLineOfSight(c, target.position, this.obstacles)) continue; // crate blocks the shot
      const score = c.distanceTo(e.pos) + Math.abs(dT - ENEMY_PREFERRED) * 0.5;
      if (score < bestScore) { bestScore = score; best = c; }
    }
    return best ? best.clone() : null;
  }
}
