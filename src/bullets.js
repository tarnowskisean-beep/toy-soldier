// bullets.js — manages every projectile in flight.
//
// A bullet is a position, a velocity, how long it lives, which team fired it,
// and how much damage it deals. Each frame we sweep them forward and discard any
// that expire, leave the arena, or strike a crate. We pool the sphere meshes so
// we're not allocating garbage every shot.

import * as THREE from 'three';
import { BOUNDS } from './world.js';
import { segHitsRect } from './physics.js';

const BULLET_SPEED = 70;
const BULLET_LIFE = 1.5;
// Tracers: stretched glowing streaks, not dots — gunfire you can SEE.
const GEO = new THREE.SphereGeometry(0.11, 6, 6);
const MAT_PLAYER = new THREE.MeshBasicMaterial({ color: 0xffeeaa });
const MAT_ENEMY = new THREE.MeshBasicMaterial({ color: 0xff6a35 });
const SPARK_GEO = new THREE.SphereGeometry(0.07, 4, 4);
const SPARK_MAT = new THREE.MeshBasicMaterial({ color: 0xffc66a });

export class Bullets {
  constructor(scene, obstacles) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.active = [];
    this.pool = [];
    this.sparks = [];
    this.onFire = null;    // hook: (origin, team) — audio + sentry hearing
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
      const px = p.x, pz = p.z;              // remember where it was...
      p.addScaledVector(b.vel, dt);          // ...then move it
      b.life -= dt;

      let dead = b.life <= 0 || p.y < 0 ||
        p.x < BOUNDS.minX - 8 || p.x > BOUNDS.maxX + 8 ||
        p.z < BOUNDS.minZ - 8 || p.z > BOUNDS.maxZ + 8;

      // Crate collision: did the path from old->new cross any crate? (Sweeping
      // the segment, not just testing the point, prevents fast bullets tunneling.)
      if (!dead) {
        for (const box of this.obstacles) {
          if (p.y <= box.max.y &&
              segHitsRect(px, pz, p.x, p.z, box.min.x, box.min.z, box.max.x, box.max.z)) {
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
}
