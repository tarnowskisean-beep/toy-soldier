// bullets.js — manages every projectile in flight.
//
// A bullet is a position, a velocity, how long it lives, which team fired it,
// and how much damage it deals. Each frame we sweep them forward and discard any
// that expire, leave the arena, or strike a crate. We pool the sphere meshes so
// we're not allocating garbage every shot.

import * as THREE from 'three';
import { segBoxEntryT } from './physics.js';

const BULLET_SPEED = 85;
const BULLET_LIFE = 1.6;
// Tracers: stretched glowing streaks, not dots — gunfire you can SEE.
const GEO = new THREE.SphereGeometry(0.11, 6, 6);
const MAT_PLAYER = new THREE.MeshBasicMaterial({ color: 0xffeeaa });
const MAT_ENEMY = new THREE.MeshBasicMaterial({ color: 0xff6a35 });
const SPARK_GEO = new THREE.SphereGeometry(0.07, 4, 4);
const SPARK_MAT = new THREE.MeshBasicMaterial({ color: 0xffc66a });

const SHARD_GEO = new THREE.BoxGeometry(1, 1, 1);
const MAX_RESTING_SHARDS = 90;   // debris stays on the floor, capped

export class Bullets {
  constructor(scene, obstacles, bounds) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.bounds = bounds;
    this.active = [];
    this.pool = [];
    this.sparks = [];
    this.shards = [];
    this.resting = [];     // shards that came to rest — the battlefield's litter
    this.onFire = null;    // hook: (origin, team) — audio + sentry hearing
  }

  // A toy soldier doesn't bleed — he SHATTERS. Burst of plastic shards,
  // most fade, a few rest on the floor as debris.
  shatter(pos, color = 0xcdb072) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.35 });
    for (let i = 0; i < 11; i++) {
      const m = new THREE.Mesh(SHARD_GEO, mat);
      const s = 0.1 + Math.random() * 0.18;
      m.scale.set(s, s, s * (0.6 + Math.random()));
      m.position.set(pos.x, 0.6 + Math.random() * 1.1, pos.z);
      m.castShadow = true;
      this.scene.add(m);
      this.shards.push({
        m,
        vx: (Math.random() - 0.5) * 16, vy: 3 + Math.random() * 9, vz: (Math.random() - 0.5) * 16,
        rx: (Math.random() - 0.5) * 14, rz: (Math.random() - 0.5) * 14,
        keep: Math.random() < 0.35,    // some shards become permanent debris
      });
    }
  }

  // A little burst of sparks where a round lands.
  burst(pos) {
    for (let i = 0; i < 5; i++) {
      const m = new THREE.Mesh(SPARK_GEO, SPARK_MAT);
      m.position.copy(pos);
      this.scene.add(m);
      this.sparks.push({
        m,
        vx: (Math.random() - 0.5) * 14, vy: 4 + Math.random() * 8, vz: (Math.random() - 0.5) * 14,
        life: 0.22 + Math.random() * 0.1,
      });
    }
  }

  // Fire from `origin` along `dir`. `team` is 'player' or 'enemy'; `damage` is
  // applied to whatever it hits (defaults cover old callers).
  fire(origin, dir, team = 'player', damage = 15) {
    const mesh = this.pool.pop() || new THREE.Mesh(GEO, MAT_PLAYER);
    mesh.material = team === 'enemy' ? MAT_ENEMY : MAT_PLAYER;
    mesh.position.copy(origin);
    // Stretch the round along its flight path = a tracer streak.
    mesh.scale.set(1, 1, 14);
    mesh.lookAt(origin.x + dir.x, origin.y + dir.y, origin.z + dir.z);
    this.scene.add(mesh);
    if (this.onFire) this.onFire(origin, team);
    this.active.push({
      mesh,
      vel: dir.clone().multiplyScalar(BULLET_SPEED),
      dir: dir.clone(),                       // kept for hit knockback direction
      life: BULLET_LIFE,
      team,
      damage,
    });
  }

  update(dt) {
    for (let i = this.shards.length - 1; i >= 0; i--) {
      const sh = this.shards[i];
      sh.vy -= 26 * dt;
      sh.m.position.x += sh.vx * dt;
      sh.m.position.y += sh.vy * dt;
      sh.m.position.z += sh.vz * dt;
      sh.m.rotation.x += sh.rx * dt;
      sh.m.rotation.z += sh.rz * dt;
      if (sh.m.position.y <= 0.06) {
        this.shards.splice(i, 1);
        if (sh.keep) {
          sh.m.position.y = 0.06;
          this.resting.push(sh.m);
          if (this.resting.length > MAX_RESTING_SHARDS) this.scene.remove(this.resting.shift());
        } else {
          this.scene.remove(sh.m);
        }
      }
    }
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const sp = this.sparks[i];
      sp.life -= dt;
      if (sp.life <= 0) { this.scene.remove(sp.m); this.sparks.splice(i, 1); continue; }
      sp.vy -= 30 * dt;
      sp.m.position.x += sp.vx * dt; sp.m.position.y += sp.vy * dt; sp.m.position.z += sp.vz * dt;
    }
    for (let i = this.active.length - 1; i >= 0; i--) {
      const b = this.active[i];
      const p = b.mesh.position;
      const px = p.x, py = p.y, pz = p.z;    // remember where it was...
      p.addScaledVector(b.vel, dt);          // ...then move it
      b.life -= dt;

      let dead = b.life <= 0 || p.y < 0 ||
        p.x < this.bounds.minX - 8 || p.x > this.bounds.maxX + 8 ||
        p.z < this.bounds.minZ - 8 || p.z > this.bounds.maxZ + 8;

      // Crate collision, in honest 3D: the bullet dies only if its flight
      // segment truly enters a box — a round that PASSES OVER a toy block
      // keeps flying (the old 2D check ate shots that visibly cleared cover).
      if (!dead) {
        for (const box of this.obstacles) {
          if (segBoxEntryT(px, py, pz, p.x, p.y, p.z, box) < Infinity) {
            dead = true;
            this.burst(p);          // sparks where it struck
            break;
          }
        }
      }
      if (dead) this._retire(i);
    }
  }

  _retire(i) {
    const b = this.active[i];
    this.scene.remove(b.mesh);
    this.pool.push(b.mesh);
    this.active.splice(i, 1);
  }

  retireBullet(bullet) {
    const i = this.active.indexOf(bullet);
    if (i !== -1) this._retire(i);
  }

  // Checkpoint rewind: every round in flight vanishes. (Sparks and shards
  // are cosmetic — they finish on their own.)
  clear() {
    for (let i = this.active.length - 1; i >= 0; i--) this._retire(i);
  }
}
