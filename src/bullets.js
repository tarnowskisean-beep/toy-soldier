// bullets.js — manages every projectile in flight.
//
// A bullet is a position, a velocity, how long it lives, which team fired it,
// and how much damage it deals. Each frame we sweep them forward and discard any
// that expire, leave the arena, or strike a crate. We pool the sphere meshes so
// we're not allocating garbage every shot.

import * as THREE from 'three';
import { ARENA } from './world.js';
import { segHitsRect } from './physics.js';

const BULLET_SPEED = 70;
const BULLET_LIFE = 1.5;
const GEO = new THREE.SphereGeometry(0.13, 6, 6);
const MAT_PLAYER = new THREE.MeshBasicMaterial({ color: 0xfff2a0 });  // yellow
const MAT_ENEMY = new THREE.MeshBasicMaterial({ color: 0xff5a2a });   // orange-red

export class Bullets {
  constructor(scene, obstacles) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.active = [];
    this.pool = [];
  }

  // Fire from `origin` along `dir`. `team` is 'player' or 'enemy'; `damage` is
  // applied to whatever it hits (defaults cover old callers).
  fire(origin, dir, team = 'player', damage = 15) {
    const mesh = this.pool.pop() || new THREE.Mesh(GEO, MAT_PLAYER);
    mesh.material = team === 'enemy' ? MAT_ENEMY : MAT_PLAYER;
    mesh.position.copy(origin);
    this.scene.add(mesh);
    this.active.push({
      mesh,
      vel: dir.clone().multiplyScalar(BULLET_SPEED),
      life: BULLET_LIFE,
      team,
      damage,
    });
  }

  update(dt) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const b = this.active[i];
      const p = b.mesh.position;
      const px = p.x, pz = p.z;              // remember where it was...
      p.addScaledVector(b.vel, dt);          // ...then move it
      b.life -= dt;

      let dead = b.life <= 0 ||
        Math.abs(p.x) > ARENA || Math.abs(p.z) > ARENA || p.y < 0;

      // Crate collision: did the path from old->new cross any crate? (Sweeping
      // the segment, not just testing the point, prevents fast bullets tunneling.)
      if (!dead) {
        for (const box of this.obstacles) {
          if (p.y <= box.max.y &&
              segHitsRect(px, pz, p.x, p.z, box.min.x, box.min.z, box.max.x, box.max.z)) {
            dead = true; break;
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
