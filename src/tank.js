// tank.js — the tan PLASTIC TANK: a rolling pillbox guarding a far room.
//
// Its hull is a real obstacle box, so rifle fire sparks off it like a wall —
// bullets are USELESS against armor. Only a BLAST hurts it: the Heavy's
// bazooka, the Sniper's mines under its treads, or a well-cooked frag. It
// patrols a straight lane; when it SEES a green it stops, traverses the
// turret, and throws shells that burst like grenades. Crouch behind furniture
// to stay off its sights — or feed it 400 hp worth of explosives.

import * as THREE from 'three';
import { segBoxEntryT } from './physics.js';
import { sfx } from './audio.js';

const HP = 400;
const DRIVE_SPEED = 3.4;
const TURN_RATE = 1.1;        // hull turn (rad/s)
const TRAVERSE = 1.6;         // turret traverse (rad/s) — slow enough to flank
const SIGHT = 38;             // engagement range, standing target
const SIGHT_SNEAK = 16;       // a crouched green must get THIS close to be seen
const FIRE_INTERVAL = 4.2;
const SHELL_SPEED = 26;
const AIM_TOLERANCE = 0.08;   // barrel must be on target (rad) before firing
const LOST_MEMORY = 1.8;      // keeps the turret trained after you break LOS

const HALF_L = 3.3, HALF_W = 2.15, BOX_H = 3.0;   // footprint of the armor box

// Shortest signed angle from a to b.
const angTo = (a, b) => {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
};

export class Tank {
  // `def` = { x, z, facing, patrol: {x, z} } — already world-scaled.
  constructor(scene, obstacles, def) {
    this.scene = scene;
    this.obstacles = obstacles;
    this.pos = new THREE.Vector3(def.x, 0, def.z);
    this.heading = def.facing || 0;
    this.turretYaw = this.heading;
    this.patrol = def.patrol
      ? { a: { x: def.x, z: def.z }, b: { x: def.patrol.x, z: def.patrol.z }, toB: true }
      : null;

    this.hp = HP;
    this.alive = true;
    this.fireCd = FIRE_INTERVAL * 0.5;
    this.lostT = 0;
    this.hitFlash = 0;
    this.shells = [];
    this.smoke = [];          // the death plume
    this._turretFly = null;   // the popped turret, mid-air
    this._v = new THREE.Vector3();

    this._build();
    // The armor IS an obstacle: bullets die on it (sparks = the armor ping),
    // soldiers can't walk through it, and it blocks lines of sight.
    this.box = new THREE.Box3();
    this._syncBox();
    obstacles.push(this.box);
  }

  // ---- The molded toy: treads, hull, glacis, turret, one long gun. ----
  _build() {
    this._tanMat = new THREE.MeshPhysicalMaterial({
      color: 0xcdb072, roughness: 0.32, metalness: 0,
      clearcoat: 0.5, clearcoatRoughness: 0.3,
    });
    this._darkMat = new THREE.MeshPhysicalMaterial({
      color: 0x8f7a4e, roughness: 0.45, metalness: 0,
      clearcoat: 0.3, clearcoatRoughness: 0.4,
    });
    const g = new THREE.Group();
    const add = (parent, geo, x, y, z, mat = this._tanMat, rx = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.x = rx;
      m.castShadow = m.receiveShadow = true;
      parent.add(m);
      return m;
    };
    // Treads: two dark slabs, the toy's whole lower body.
    add(g, new THREE.BoxGeometry(1.3, 1.15, 6.6), -1.55, 0.58, 0, this._darkMat);
    add(g, new THREE.BoxGeometry(1.3, 1.15, 6.6), 1.55, 0.58, 0, this._darkMat);
    // Hull + sloped glacis nose.
    add(g, new THREE.BoxGeometry(3.6, 1.2, 6.0), 0, 1.55, 0);
    add(g, new THREE.BoxGeometry(3.55, 1.0, 1.7), 0, 1.3, 2.85, this._tanMat, 0.5);
    add(g, new THREE.BoxGeometry(3.55, 0.9, 1.0), 0, 1.35, -3.0, this._tanMat, -0.35);
    // Turret: a squat box under a dome, hatch on top, gun out the front.
    const turret = new THREE.Group();
    turret.position.set(0, 2.4, -0.4);
    add(turret, new THREE.BoxGeometry(2.5, 0.85, 3.0), 0, 0, 0);
    const dome = add(turret, new THREE.SphereGeometry(1.25, 14, 10), 0, 0.35, 0);
    dome.scale.set(1, 0.55, 1.15);
    add(turret, new THREE.CylinderGeometry(0.45, 0.5, 0.2, 12), 0, 0.95, -0.5, this._darkMat);
    add(turret, new THREE.CylinderGeometry(0.15, 0.17, 4.4, 10), 0, 0.2, 2.7, this._darkMat, Math.PI / 2);
    add(turret, new THREE.CylinderGeometry(0.24, 0.24, 0.5, 10), 0, 0.2, 4.7, this._darkMat, Math.PI / 2);
    g.add(turret);
    this.turret = turret;
    this._muzzle = new THREE.Vector3(0, 0.2, 5.0);   // turret-local barrel tip
    g.position.copy(this.pos);
    g.rotation.y = this.heading;
    this.scene.add(g);
    this.group = g;
  }

  // The hull rotates but the obstacle box is axis-aligned: wrap the rotated
  // footprint in the tightest AABB for this heading.
  _syncBox() {
    const s = Math.abs(Math.sin(this.heading)), c = Math.abs(Math.cos(this.heading));
    const ex = s * HALF_L + c * HALF_W;
    const ez = c * HALF_L + s * HALF_W;
    this.box.min.set(this.pos.x - ex, 0, this.pos.z - ez);
    this.box.max.set(this.pos.x + ex, BOX_H, this.pos.z + ez);
  }

  // LOS from the commander's hatch — skipping our OWN armor box, which would
  // otherwise blind us from inside.
  _canSee(m) {
    const ty = m.position.y + (m.crouched && !m.peeking ? 0.75 : 1.1);
    for (const b of this.obstacles) {
      if (b === this.box) continue;
      if (segBoxEntryT(this.pos.x, 2.9, this.pos.z, m.position.x, ty, m.position.z, b) < Infinity) {
        return false;
      }
    }
    return true;
  }

  update(dt, squad, enemies, ordnance) {
    if (!this.alive) {
      this._wreckFx(dt);
      this._updateShells(dt, squad, enemies, ordnance);
      return;
    }
    this.fireCd -= dt;
    if (this.hitFlash > 0) {
      this.hitFlash -= dt;
      this._tanMat.emissive.setHex(this.hitFlash > 0 ? 0x553311 : 0x000000);
    }

    // --- EYES: nearest visible green. Crouching shrinks its sight. ---
    let target = null, tDist = Infinity;
    for (const m of squad.members) {
      if (!m.alive) continue;
      const d = this.pos.distanceTo(m.position);
      const sight = (m.crouched && !m.peeking) ? SIGHT_SNEAK : SIGHT;
      if (d < sight && d < tDist && this._canSee(m)) { target = m; tDist = d; }
    }

    if (target) {
      // Contact: the war is ON, and the whole room knows a tank has eyes.
      enemies.combatStarted = true;
      enemies.firstSpotted = true;
      this.lostT = LOST_MEMORY;
      // Stop and traverse the turret onto the target.
      const want = Math.atan2(target.position.x - this.pos.x, target.position.z - this.pos.z);
      const diff = angTo(this.turretYaw, want);
      const step = Math.min(Math.abs(diff), TRAVERSE * dt);
      this.turretYaw += Math.sign(diff) * step;
      if (Math.abs(diff) < AIM_TOLERANCE && this.fireCd <= 0 && tDist > 3) {
        this.fireCd = FIRE_INTERVAL;
        this._fireShell(target, squad, enemies, ordnance);
      }
    } else if (this.lostT > 0) {
      this.lostT -= dt;       // hold the lay a beat — peeking back out is risky
    } else {
      // Stand down: turret home, resume the lane.
      const home = angTo(this.turretYaw, this.heading);
      this.turretYaw += Math.sign(home) * Math.min(Math.abs(home), TRAVERSE * dt);
      if (this.patrol) this._drive(dt, squad);
    }

    this.group.position.copy(this.pos);
    // The rumble: a rolling toy tank shouldn't glide like a hovercraft.
    if (this._moving) this.group.position.y = Math.sin(performance.now() * 0.02) * 0.03;
    this._moving = false;
    this.group.rotation.y = this.heading;
    this.turret.rotation.y = angTo(this.heading, this.turretYaw);
    this._syncBox();
    this._updateShells(dt, squad, enemies, ordnance);
  }

  // Ping-pong along the patrol lane: turn the hull first, then roll. The lane
  // is authored clear of furniture; only a green standing in the way (don't
  // squash the toys) makes it idle.
  _drive(dt, squad) {
    const goal = this.patrol.toB ? this.patrol.b : this.patrol.a;
    const dx = goal.x - this.pos.x, dz = goal.z - this.pos.z;
    if (Math.hypot(dx, dz) < 1.6) { this.patrol.toB = !this.patrol.toB; return; }
    const want = Math.atan2(dx, dz);
    const diff = angTo(this.heading, want);
    this.heading += Math.sign(diff) * Math.min(Math.abs(diff), TURN_RATE * dt);
    if (Math.abs(diff) > 0.2) return;               // pivot in place, then roll
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    for (const m of squad.members) {
      if (!m.alive) continue;
      const mx = m.position.x - this.pos.x, mz = m.position.z - this.pos.z;
      const ahead = mx * fx + mz * fz;
      if (ahead > 0 && ahead < HALF_L + 1.6 && Math.abs(mx * fz - mz * fx) < HALF_W + 0.7) return;
    }
    this.pos.x += fx * DRIVE_SPEED * dt;
    this.pos.z += fz * DRIVE_SPEED * dt;
    this._moving = true;
  }

  _fireShell(target, squad, enemies, ordnance) {
    const muzzle = this.turret.localToWorld(this._muzzle.clone());
    const aimY = (target.crouched && !target.peeking) ? 0.75 : 1.1;
    const dir = this._v.set(target.position.x, aimY, target.position.z).sub(muzzle).normalize();
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xffc06a })
    );
    mesh.scale.set(1, 1, 5);
    mesh.position.copy(muzzle).addScaledVector(dir, 0.5);
    mesh.lookAt(muzzle.x + dir.x, muzzle.y + dir.y, muzzle.z + dir.z);
    this.scene.add(mesh);
    this.shells.push({ mesh, vel: dir.clone().multiplyScalar(SHELL_SPEED), life: 2.4 });
    ordnance._flash(muzzle, 1.4);                    // the muzzle bloom
    sfx.cannon(this.pos.distanceTo(squad.active.position));
    enemies.hearGunshot(this.pos);                   // the report wakes the room
  }

  _updateShells(dt, squad, enemies, ordnance) {
    for (let i = this.shells.length - 1; i >= 0; i--) {
      const s = this.shells[i];
      s.life -= dt;
      const p = s.mesh.position;
      const px = p.x, py = p.y, pz = p.z;
      s.vel.y -= 6 * dt;                             // a heavy round droops
      p.addScaledVector(s.vel, dt);

      let boomAt = null;
      if (s.life <= 0 || p.y <= 0.1) boomAt = p.clone();
      if (!boomAt) {
        let bestT = Infinity;
        for (const b of this.obstacles) {
          if (b === this.box) continue;              // not on our own armor
          const t = segBoxEntryT(px, py, pz, p.x, p.y, p.z, b);
          if (t < bestT) bestT = t;
        }
        if (bestT < Infinity) {
          boomAt = new THREE.Vector3(px + (p.x - px) * bestT, py + (p.y - py) * bestT, pz + (p.z - pz) * bestT);
        } else {
          for (const m of squad.members) {
            if (!m.alive) continue;
            const dx = p.x - m.position.x, dy = p.y - 1.0, dz = p.z - m.position.z;
            if (dx * dx + dy * dy + dz * dz < 1.0) { boomAt = p.clone(); break; }
          }
        }
      }
      if (boomAt) {
        ordnance.shellBoom(boomAt, squad, enemies);
        this.scene.remove(s.mesh);
        this.shells.splice(i, 1);
      }
    }
  }

  // --- Checkpoint plumbing: freeze/rewind the armor like any other prop. ---
  snapshot() {
    return {
      alive: this.alive, hp: this.hp,
      x: this.pos.x, z: this.pos.z,
      heading: this.heading, turretYaw: this.turretYaw,
      toB: this.patrol ? this.patrol.toB : true,
    };
  }

  restore(s) {
    for (const sh of this.shells) this.scene.remove(sh.mesh);
    this.shells.length = 0;
    this.fireCd = FIRE_INTERVAL * 0.5;
    this.lostT = 0;
    this.hitFlash = 0;
    // A snapshot can't be deader than the present (armor never heals), so the
    // only resurrection is wreck → alive: un-char the plastic, re-seat the
    // popped turret, stop the smoke.
    if (s.alive && !this.alive) {
      for (const p of this.smoke) this.scene.remove(p.sp);
      this.smoke.length = 0;
      this._turretFly = null;
      this._tanMat.color.setHex(0xcdb072);
      this._tanMat.emissive.setHex(0x000000);
      this._tanMat.clearcoat = 0.5;
      this._darkMat.color.setHex(0x8f7a4e);
      this.turret.position.set(0, 2.4, -0.4);
      this.turret.rotation.set(0, 0, 0);
    }
    this.alive = s.alive;
    this.hp = s.hp;
    this.pos.set(s.x, 0, s.z);
    this.heading = s.heading;
    this.turretYaw = s.turretYaw;
    if (this.patrol) this.patrol.toB = s.toB;
    this.group.position.copy(this.pos);
    this.group.rotation.y = this.heading;
    this.turret.rotation.y = angTo(this.heading, this.turretYaw);
    this._syncBox();
  }

  // A blast within `radius` of the ARMOR (distance to the hull box, not the
  // center — direct hits count full). Returns true if this one killed it.
  takeBlast(pos, radius, damage) {
    if (!this.alive) return false;
    const d = this.box.distanceToPoint(pos);
    if (d >= radius) return false;
    this.hp -= damage * (1 - d / radius);
    this.hitFlash = 0.18;
    if (this.hp <= 0) { this._die(); return true; }
    return false;
  }

  _die() {
    this.alive = false;
    this.hp = 0;
    // The kill, toy-style: the turret POPS off, the hull chars, smoke rises.
    // The wreck stays — a dead tank is still a wall.
    this._turretFly = { vy: 10, spin: 2.4 + Math.random() * 2 };
    this._tanMat.color.setHex(0x55503f);
    this._tanMat.emissive.setHex(0x000000);
    this._tanMat.clearcoat = 0.1;
    this._darkMat.color.setHex(0x3a352a);
    for (let i = 0; i < 6; i++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({
        color: 0x666666, transparent: true, opacity: 0.35, depthWrite: false,
      }));
      sp.position.copy(this.pos);
      sp.position.y = 2.5;
      this.scene.add(sp);
      this.smoke.push({ sp, t: i / 6 });
    }
  }

  // The dead tank smolders; the popped turret arcs down and lies beside it.
  _wreckFx(dt) {
    if (this._turretFly) {
      const f = this._turretFly;
      f.vy -= 26 * dt;
      this.turret.position.y += f.vy * dt;
      this.turret.position.x += 1.6 * dt;
      this.turret.rotation.z += f.spin * dt;
      if (this.turret.position.y <= 1.0 && f.vy < 0) {
        this.turret.position.y = 1.0;
        this.turret.rotation.z = 0.85;
        this._turretFly = null;
      }
    }
    for (const puff of this.smoke) {
      puff.t += 0.0035;
      if (puff.t > 1) puff.t -= 1;
      const k = puff.t;
      puff.sp.position.y = 2.5 + k * 9;
      puff.sp.scale.setScalar(1.5 + k * 4);
      puff.sp.material.opacity = 0.35 * (1 - k);
    }
  }
}
