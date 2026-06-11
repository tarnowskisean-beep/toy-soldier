// squad.js — owns the 4-man fireteam: switching control, orders, formation.
//
// The Squad is the "command layer." It knows which soldier you're possessing,
// turns your aim-and-order inputs into per-soldier orders, and arranges the AI
// members into a formation behind whoever you're controlling.

import * as THREE from 'three';
import { Soldier } from './soldier.js';
import { ORDER } from './soldier.js';
import { CLASSES, SQUAD_ORDER } from './classes.js';
import { WORLD_SCALE } from './world.js';

// Formation slots for the (up to 3) inactive members, RELATIVE to the leader:
// x = left/right, z = forward/back (negative = behind). Rotated to face the
// active soldier's heading each frame. A SIDE wedge, not a column — the chase
// camera sits directly behind the leader, so a slot near x=0 is a soldier
// standing in the lens.
const SLOTS = [
  { x: -3.0, z: -1.4 },
  { x: 3.0, z: -1.4 },
  { x: -5.4, z: -3.0 },
];

const MEDIC_HEAL_RATE = 4;   // hp/sec near the medic — recovery, not a free refill
const MEDIC_RANGE = 7;

export class Squad {
  constructor(scene, obstacles, nav) {
    this.nav = nav;
    this.members = SQUAD_ORDER.map((key, i) => {
      const s = new Soldier(scene, CLASSES[key], obstacles, nav);
      // Rally EAST of the wreck — clamped to standable ground, because a spawn
      // overlapping ANY furniture is a soldier that can never move.
      const open = nav.nearestOpen((2.5 + i * 2.7) * WORLD_SCALE, (-8 - (i % 2) * 2.6) * WORLD_SCALE);
      s.position.set(open.x, 0, open.z);
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
    this._threat = new THREE.Vector3();
  }

  // A supply drop: every living member pockets reserve ammo and a patch-up.
  resupply(reservePct, healAmount) {
    for (const m of this.members) {
      if (!m.alive) continue;
      m.reserve = Math.min(m.cls.reserve, m.reserve + Math.round(m.cls.reserve * reservePct));
      m.heal(healAmount);
    }
  }

  get active() { return this.members[this.activeIndex]; }
  get alive() { return this.members.some((m) => m.alive); }

  // Take direct control of member `i` (if alive). The one you leave behind keeps
  // doing whatever its current order is.
  setActive(i) {
    if (i < 0 || i >= this.members.length || !this.members[i].alive) return;
    // The man you leave drops his player-only stances.
    const prev = this.active;
    prev.aiming = false;
    prev.zoomed = false;
    prev.suppressing = false;
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
    // Each man gets his own spot in a small wedge on the point (soldiers
    // don't collide with each other — same destination = men standing inside
    // each other). Clamped to standable ground: a click ON a crate means
    // "go to the crate", not "merge with the crate".
    const spots = [[0, 0], [1.8, 1.1], [-1.8, 1.1]];
    let k = 0;
    this._eachOther((m) => {
      const o = spots[k++ % spots.length];
      const open = this.nav.nearestOpen(point.x + o[0], point.z + o[1]);
      m.order = ORDER.MOVE;
      m.orderPoint.set(open.x, 0, open.z);
      m.target = null;
    });
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

  // Turn the local SLOTS offsets into world positions around the active
  // soldier. A slot that lands inside furniture gets nudged to the nearest
  // standable spot, so nobody is ever ordered INTO the couch.
  _worldSlots(a) {
    const cy = Math.cos(a.yaw), sy = Math.sin(a.yaw);
    return SLOTS.map((o) => {
      // right = (cos, -sin), forward = (sin, cos)
      const rx = o.x * cy + o.z * sy;
      const rz = -o.x * sy + o.z * cy;
      const open = this.nav.nearestOpen(a.position.x + rx, a.position.z + rz);
      return this._slot.clone().set(open.x, 0, open.z);
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
        // Torso height — crouching genuinely lowers you under chest-high fire.
        const dy = b.mesh.position.y - (m.position.y + (m.crouched ? 0.75 : 1.1));
        const dz = b.mesh.position.z - m.position.z;
        if (dx * dx + dy * dy + dz * dz < 0.9 * 0.9) {
          // The tracer points back at the shooter — good enough for the
          // damage-direction arrow.
          this._threat.set(m.position.x - b.dir.x * 12, 0, m.position.z - b.dir.z * 12);
          m.takeDamage(b.damage, this._threat);
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
