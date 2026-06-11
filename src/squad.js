// squad.js — owns the 4-man fireteam: switching control, orders, formation.
//
// The Squad is the "command layer." It knows which soldier you're possessing,
// turns your aim-and-order inputs into per-soldier orders, and arranges the AI
// members into a formation behind whoever you're controlling.

import * as THREE from 'three';
import { Soldier } from './soldier.js';
import { ORDER } from './soldier.js';
import { CLASSES, SQUAD_ORDER } from './classes.js';

// Formation slots for the (up to 3) inactive members, RELATIVE to the leader:
// x = left/right, z = forward/back (negative = behind). Rotated to face the
// active soldier's heading each frame.
const SLOTS = [
  { x: -2.8, z: -2.4 },
  { x: 2.8, z: -2.4 },
  { x: 0, z: -4.6 },
];

const MEDIC_HEAL_RATE = 9;   // hp/sec the medic restores to nearby squadmates
const MEDIC_RANGE = 7;

export class Squad {
  constructor(scene, obstacles) {
    this.members = SQUAD_ORDER.map((key, i) => {
      const s = new Soldier(scene, CLASSES[key], obstacles);
      s.position.set(2.5 + i * 2.7, 0, -8 - (i % 2) * 2.6);   // rally EAST of the wreck
      s.yaw = Math.PI / 2;                                     // facing into the room
      s.figure.position.copy(s.position);
      s.order = ORDER.FOLLOW;
      return s;
    });
    this.activeIndex = 0;

    // Glowing ring under the soldier you're currently controlling.
    this.ring = new THREE.Mesh(
      new THREE.RingGeometry(0.7, 0.95, 28),
      new THREE.MeshBasicMaterial({ color: 0x7dff7d, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
    );
    this.ring.rotation.x = -Math.PI / 2;
    scene.add(this.ring);

    this._slot = new THREE.Vector3();
  }

  get active() { return this.members[this.activeIndex]; }
  get alive() { return this.members.some((m) => m.alive); }

  // Take direct control of member `i` (if alive). The one you leave behind keeps
  // doing whatever its current order is.
  setActive(i) {
    if (i < 0 || i >= this.members.length || !this.members[i].alive) return;
    this.activeIndex = i;
    this.ring.material.color.setHex(this.active.cls.ringColor);
  }

  // Tab through living members.
  cycle() {
    for (let n = 1; n <= this.members.length; n++) {
      const i = (this.activeIndex + n) % this.members.length;
      if (this.members[i].alive) { this.setActive(i); return; }
    }
  }

  // --- Orders apply to every OTHER living squadmate (not the one you control) ---
  orderMove(point) {
    this._eachOther((m) => { m.order = ORDER.MOVE; m.orderPoint.copy(point); m.target = null; });
  }
  orderAttack(enemy) {
    this._eachOther((m) => { m.order = ORDER.ATTACK; m.target = enemy; });
  }
  orderHold() {
    this._eachOther((m) => { m.order = ORDER.HOLD; m.target = null; });
  }
  orderFollow() {
    this._eachOther((m) => { m.order = ORDER.FOLLOW; m.target = null; });
  }

  _eachOther(fn) {
    for (let i = 0; i < this.members.length; i++) {
      if (i === this.activeIndex || !this.members[i].alive) continue;
      fn(this.members[i]);
    }
  }

  update(dt, ctx) {
    const a = this.active;
    const slots = this._worldSlots(a);

    // Update every member, handing the inactive ones a formation slot to fill.
    let s = 0;
    for (let i = 0; i < this.members.length; i++) {
      const m = this.members[i];
      const isActive = i === this.activeIndex;
      m.update(dt, {
        isActive,
        input: ctx.input,
        enemies: ctx.enemies,
        bullets: ctx.bullets,
        free: ctx.free,
        formationSlot: isActive ? null : slots[s++ % slots.length],
      });
    }

    this._medicHeal(dt);

    // Keep the selection ring under the active soldier; if they fell, take over
    // the next living member automatically.
    if (!a.alive) this.cycle();
    this.ring.position.set(this.active.position.x, 0.07, this.active.position.z);
    this.ring.visible = this.active.alive;
  }

  // Turn the local SLOTS offsets into world positions behind the active soldier.
  _worldSlots(a) {
    const cy = Math.cos(a.yaw), sy = Math.sin(a.yaw);
    return SLOTS.map((o) => {
      // right = (cos, -sin), forward = (sin, cos)
      const rx = o.x * cy + o.z * sy;
      const rz = -o.x * sy + o.z * cy;
      return this._slot.clone().set(a.position.x + rx, 0, a.position.z + rz);
    });
  }

  // Medic ability: revive the nearest DOWNED squadmate within range. Returns the
  // revived soldier (or null if none is close enough).
  reviveNear(medic, range = 5) {
    let best = null, bestD = range;
    for (const m of this.members) {
      if (m === medic || !m.downed) continue;
      const d = m.position.distanceTo(medic.position);
      if (d < bestD) { bestD = d; best = m; }
    }
    if (best) { best.revive(0.5); return best; }
    return null;
  }

  // Enemy bullets vs squad members. Called each frame from main. A hit applies
  // the bullet's damage and removes it.
  takeBulletHits(bullets) {
    for (let i = bullets.active.length - 1; i >= 0; i--) {
      const b = bullets.active[i];
      if (b.team !== 'enemy') continue;
      for (const m of this.members) {
        if (!m.alive) continue;
        const dx = b.mesh.position.x - m.position.x;
        const dy = b.mesh.position.y - (m.position.y + 1.1);   // torso height
        const dz = b.mesh.position.z - m.position.z;
        if (dx * dx + dy * dy + dz * dz < 0.9 * 0.9) {
          m.takeDamage(b.damage);
          bullets.retireBullet(b);
          break;
        }
      }
    }
  }

  _medicHeal(dt) {
    const medic = this.members.find((m) => m.cls.key === 'medic' && m.alive);
    if (!medic) return;
    for (const m of this.members) {
      if (m === medic || !m.alive) continue;
      if (m.position.distanceTo(medic.position) < MEDIC_RANGE) {
        m.heal(MEDIC_HEAL_RATE * dt);
      }
    }
  }
}
