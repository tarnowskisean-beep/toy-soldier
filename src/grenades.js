// grenades.js — the Leader's frag grenade: an arcing lob that explodes on impact.
//
// Unlike bullets (which fly straight and fast), a grenade is affected by gravity,
// so it travels in an arc. We compute a throw velocity that lands it near the
// crosshair, then let gravity pull it down each frame. On impact it deals area
// damage that falls off with distance, plus a brief expanding-flash visual.

import * as THREE from 'three';
import { BOUNDS } from './world.js';
import { segHitsRect } from './physics.js';

const GRAVITY = 32;
const THROW_HORIZ = 22;     // baseline horizontal throw speed
const FUSE = 2.2;           // explodes after this long even if it never lands
const RADIUS = 7;           // blast radius
const MAX_DAMAGE = 130;     // damage at the center, falling to 0 at the edge

const NADE_GEO = new THREE.SphereGeometry(0.22, 8, 8);
const NADE_MAT = new THREE.MeshStandardMaterial({ color: 0x2f3a24, roughness: 0.7 });
const FLASH_GEO = new THREE.SphereGeometry(1, 16, 12);

export class Grenades {
  constructor(scene, obstacles) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.nades = [];
    this.flashes = [];
  }

  // Lob a grenade from `origin` toward world point `target`.
  throwAt(origin, target) {
    const dx = target.x - origin.x, dz = target.z - origin.z;
    const horiz = Math.hypot(dx, dz) || 0.001;
    const t = Math.max(0.5, horiz / THROW_HORIZ);     // time of flight
    // Solve for the vertical speed that lands it at y≈0 after time t.
    const vy = (0 - origin.y + 0.5 * GRAVITY * t * t) / t;

    const mesh = new THREE.Mesh(NADE_GEO, NADE_MAT);
    mesh.castShadow = true;
    mesh.position.copy(origin);
    this.scene.add(mesh);
    this.nades.push({ mesh, vel: new THREE.Vector3(dx / t, vy, dz / t), fuse: FUSE });
  }

  update(dt, enemies) {
    // --- Move grenades, detect detonation ---
    for (let i = this.nades.length - 1; i >= 0; i--) {
      const n = this.nades[i];
      n.vel.y -= GRAVITY * dt;
      const p = n.mesh.position;
      const px = p.x, pz = p.z;
      p.addScaledVector(n.vel, dt);
      n.fuse -= dt;

      let boom = n.fuse <= 0 || p.y <= 0.2 || p.x < BOUNDS.minX || p.x > BOUNDS.maxX || p.z < BOUNDS.minZ || p.z > BOUNDS.maxZ;
      if (!boom) {
        for (const b of this.obstacles) {
          if (p.y <= b.max.y && segHitsRect(px, pz, p.x, p.z, b.min.x, b.min.z, b.max.x, b.max.z)) {
            boom = true; break;
          }
        }
      }
      if (boom) {
        this._explode(p.clone(), enemies);
        this.scene.remove(n.mesh);
        this.nades.splice(i, 1);
      }
    }

    // --- Animate explosion flashes (expand + fade) ---
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      f.life -= dt;
      const k = 1 - f.life / f.max;                 // 0 → 1 over the flash
      f.mesh.scale.setScalar(0.5 + k * RADIUS);
      f.mesh.material.opacity = Math.max(0, 1 - k);
      if (f.life <= 0) { this.scene.remove(f.mesh); this.flashes.splice(i, 1); }
    }
  }

  _explode(pos, enemies) {
    // Area damage with linear falloff to the blast edge.
    for (const e of enemies) {
      const d = e.pos.distanceTo(pos);
      if (d < RADIUS) e.hp -= MAX_DAMAGE * (1 - d / RADIUS);
    }
    // Visual flash.
    const mesh = new THREE.Mesh(FLASH_GEO,
      new THREE.MeshBasicMaterial({ color: 0xffaa33, transparent: true, opacity: 0.9 }));
    mesh.position.set(pos.x, 0.6, pos.z);
    this.scene.add(mesh);
    this.flashes.push({ mesh, life: 0.45, max: 0.45 });
  }
}
