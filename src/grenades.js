// grenades.js — every EXPLOSIVE in the game: the Leader's frag grenade, the
// Heavy's bazooka rockets, the Sniper's anti-tank mines — and, going the other
// way, the tank's shell bursts. One module because they all end the same way:
// a BLAST with a radius and a center damage that falls off to zero at the edge.
//
// Blast rules, one place:
//   - player ordnance hurts the TAN (and the tank's armor) — never the squad
//   - tank shells hurt the SQUAD — never the tan
//   - every blast is HEARD across half the house, and rattles the camera

import * as THREE from 'three';
import { segHitsRect, segBoxEntryT } from './physics.js';
import { sfx } from './audio.js';

const GRAVITY = 32;
const THROW_HORIZ = 26;     // baseline horizontal throw speed
const FUSE = 2.2;           // a grenade explodes after this long even airborne

// Each explosive is a (radius, damage) pair: damage at the center, falling
// linearly to zero at the blast edge. The bazooka and the mine are the
// ARMOR-CRACKERS: two of either (in any mix) kill the tank.
const GRENADE = { radius: 8.5, damage: 130 };
const ROCKET  = { radius: 7,   damage: 220, speed: 46, fuse: 3 };
const MINE    = { radius: 7,   damage: 220, armTime: 1.2, trigger: 1.6 };
const SHELL   = { radius: 6,   damage: 55 };   // the tank's gun — hurts GREENS

const NADE_GEO = new THREE.SphereGeometry(0.22, 8, 8);
const NADE_MAT = new THREE.MeshStandardMaterial({ color: 0x2f3a24, roughness: 0.7 });
const FLASH_GEO = new THREE.SphereGeometry(1, 16, 12);
const ROCKET_BODY = new THREE.CylinderGeometry(0.13, 0.13, 0.7, 8);
const ROCKET_NOSE = new THREE.ConeGeometry(0.13, 0.3, 8);
const ROCKET_MAT = new THREE.MeshStandardMaterial({ color: 0x3a4a2e, roughness: 0.5 });
const MINE_GEO = new THREE.CylinderGeometry(0.42, 0.5, 0.16, 14);
const MINE_MAT = new THREE.MeshStandardMaterial({ color: 0x2c3322, roughness: 0.55 });
const PUFF_MAT = new THREE.SpriteMaterial({ color: 0xb8b8b8, transparent: true, opacity: 0.5, depthWrite: false });

export class Grenades {
  constructor(scene, obstacles, bounds) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.bounds = bounds;
    this.nades = [];
    this.rockets = [];
    this.mines = [];
    this.flashes = [];
    this.puffs = [];       // rocket exhaust trail
    this.tank = null;      // the mission's tank, if it fields one (main wires it)
    this.onBoom = null;    // hook(pos): screen shake + the BOOM
    this.t = 0;            // mine-blink clock
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

  // The bazooka: a rocket flies STRAIGHT (no arc) and detonates on whatever
  // it touches first — wall, crate, tan, armor.
  fireRocket(origin, target) {
    const dir = target.clone().sub(origin).normalize();
    const mesh = new THREE.Group();
    const body = new THREE.Mesh(ROCKET_BODY, ROCKET_MAT);
    body.rotation.x = Math.PI / 2;
    mesh.add(body);
    const nose = new THREE.Mesh(ROCKET_NOSE, ROCKET_MAT);
    nose.rotation.x = Math.PI / 2;
    nose.position.z = 0.5;
    mesh.add(nose);
    mesh.position.copy(origin);
    mesh.lookAt(origin.x + dir.x, origin.y + dir.y, origin.z + dir.z);
    this.scene.add(mesh);
    this.rockets.push({ mesh, vel: dir.multiplyScalar(ROCKET.speed), life: ROCKET.fuse, puffT: 0 });
    sfx.rocket();
  }

  // Plant a mine on the floor. It arms after a beat, then goes off under the
  // first thing that rolls (the tank) or walks (a tan) over it.
  placeMine(x, z) {
    const group = new THREE.Group();
    const disc = new THREE.Mesh(MINE_GEO, MINE_MAT);
    disc.position.y = 0.08;
    disc.castShadow = true;
    group.add(disc);
    const bump = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xff4030 })
    );
    bump.position.y = 0.18;
    group.add(bump);
    group.position.set(x, 0, z);
    this.scene.add(group);
    this.mines.push({ group, bump, pos: new THREE.Vector3(x, 0, z), arm: MINE.armTime });
    sfx.reload();   // the plant: two mechanical clicks
  }

  // `enemies` is the Enemies system (not just the list): an explosion deals
  // damage AND is heard across half the house.
  update(dt, enemies) {
    this.t += dt;

    // --- Move grenades, detect detonation ---
    for (let i = this.nades.length - 1; i >= 0; i--) {
      const n = this.nades[i];
      // Anyone close to a live grenade screams and scatters — counterplay
      // works both ways: a frag FLUSHES a dug-in post even when it misses.
      enemies.panicFrom(n.mesh.position, 13);
      n.vel.y -= GRAVITY * dt;
      const p = n.mesh.position;
      const px = p.x, pz = p.z;
      p.addScaledVector(n.vel, dt);
      n.fuse -= dt;

      let boom = n.fuse <= 0 || p.y <= 0.2 ||
        p.x < this.bounds.minX || p.x > this.bounds.maxX ||
        p.z < this.bounds.minZ || p.z > this.bounds.maxZ;
      if (!boom) {
        for (const b of this.obstacles) {
          if (p.y <= b.max.y && segHitsRect(px, pz, p.x, p.z, b.min.x, b.min.z, b.max.x, b.max.z)) {
            boom = true; break;
          }
        }
      }
      if (boom) {
        this._explode(p.clone(), enemies, GRENADE);
        this.scene.remove(n.mesh);
        this.nades.splice(i, 1);
      }
    }

    // --- Rockets: straight flight, contact detonation, smoke trail ---
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.life -= dt;
      const p = r.mesh.position;
      const px = p.x, py = p.y, pz = p.z;
      p.addScaledVector(r.vel, dt);

      r.puffT -= dt;
      if (r.puffT <= 0) {
        r.puffT = 0.025;
        const sp = new THREE.Sprite(PUFF_MAT.clone());
        sp.position.set(px, py, pz);
        sp.scale.setScalar(0.4);
        this.scene.add(sp);
        this.puffs.push({ sp, life: 0.5, max: 0.5 });
      }

      let boomAt = null;
      if (r.life <= 0 || p.y <= 0.1 ||
          p.x < this.bounds.minX || p.x > this.bounds.maxX ||
          p.z < this.bounds.minZ || p.z > this.bounds.maxZ) {
        boomAt = p.clone();
      } else {
        // First box the flight segment enters — explode ON the surface, so a
        // direct hull hit counts as distance ~0 for the armor falloff.
        let bestT = Infinity;
        for (const b of this.obstacles) {
          const t = segBoxEntryT(px, py, pz, p.x, p.y, p.z, b);
          if (t < bestT) bestT = t;
        }
        if (bestT < Infinity) {
          boomAt = new THREE.Vector3(px + (p.x - px) * bestT, py + (p.y - py) * bestT, pz + (p.z - pz) * bestT);
        } else {
          for (const e of enemies.list) {
            const dx = p.x - e.pos.x, dy = p.y - (e.baseY + 1.1), dz = p.z - e.pos.z;
            if (dx * dx + dy * dy + dz * dz < 1.2 * 1.2) { boomAt = p.clone(); break; }
          }
        }
      }
      if (boomAt) {
        this._explode(boomAt, enemies, ROCKET);
        this.scene.remove(r.mesh);
        this.rockets.splice(i, 1);
      }
    }

    // --- Mines: arm, blink, wait for something heavy ---
    for (let i = this.mines.length - 1; i >= 0; i--) {
      const m = this.mines[i];
      m.arm -= dt;
      // Blink fast while arming, slow once it's live.
      m.bump.visible = Math.sin(this.t * (m.arm > 0 ? 22 : 5)) > -0.3;
      if (m.arm > 0) continue;
      let boom = false;
      if (this.tank && this.tank.alive && this.tank.box.distanceToPoint(m.pos) < 0.9) {
        boom = true;       // a tread found it
      } else {
        for (const e of enemies.list) {
          if (e.baseY > 0) continue;     // a man on a tower can't step on it
          if (Math.hypot(e.pos.x - m.pos.x, e.pos.z - m.pos.z) < MINE.trigger) { boom = true; break; }
        }
      }
      if (boom) {
        this._explode(m.pos.clone(), enemies, MINE);
        this.scene.remove(m.group);
        this.mines.splice(i, 1);
      }
    }

    // --- Rocket exhaust puffs (swell + fade) ---
    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const f = this.puffs[i];
      f.life -= dt;
      const k = 1 - f.life / f.max;
      f.sp.scale.setScalar(0.4 + k * 1.4);
      f.sp.material.opacity = 0.5 * (1 - k);
      if (f.life <= 0) { this.scene.remove(f.sp); this.puffs.splice(i, 1); }
    }

    // --- Animate explosion flashes (expand + fade) ---
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      f.life -= dt;
      const k = 1 - f.life / f.max;                 // 0 → 1 over the flash
      f.mesh.scale.setScalar(0.5 + k * f.radius);
      f.mesh.material.opacity = Math.max(0, 1 - k);
      if (f.life <= 0) { this.scene.remove(f.mesh); this.flashes.splice(i, 1); }
    }
  }

  // The TANK's shell burst: same flash and noise, but the blast hurts the
  // SQUAD (the tan don't shell their own).
  shellBoom(pos, squad, enemies) {
    for (const m of squad.members) {
      if (!m.alive) continue;
      const d = m.position.distanceTo(pos);
      if (d < SHELL.radius) m.takeDamage(SHELL.damage * (1 - d / SHELL.radius), pos);
    }
    enemies.hearBlast(pos);    // tan come LOOKING at the crater — i.e., at you
    if (this.onBoom) this.onBoom(pos);
    this._flash(pos, SHELL.radius);
  }

  // Player ordnance: area damage to the tan with linear falloff — and the
  // only thing in the game that hurts the tank's armor.
  _explode(pos, enemies, spec) {
    for (const e of enemies.list) {
      const d = e.pos.distanceTo(pos);
      if (d < spec.radius) e.hp -= spec.damage * (1 - d / spec.radius);
    }
    if (this.tank && this.tank.alive &&
        this.tank.takeBlast(pos, spec.radius, spec.damage)) {
      // That blast cracked it open: the tank's own death explosion on top.
      this._flash(this.tank.pos, 13);
      if (this.onBoom) this.onBoom(this.tank.pos);
    }
    // BOOM travels: sentries far beyond the blast wake up and come looking.
    enemies.hearBlast(pos);
    if (this.onBoom) this.onBoom(pos);
    this._flash(pos, spec.radius);
  }

  _flash(pos, radius) {
    const mesh = new THREE.Mesh(FLASH_GEO,
      new THREE.MeshBasicMaterial({ color: 0xffaa33, transparent: true, opacity: 0.9 }));
    mesh.position.set(pos.x, Math.max(0.6, pos.y), pos.z);
    this.scene.add(mesh);
    this.flashes.push({ mesh, life: 0.45, max: 0.45, radius });
  }
}
