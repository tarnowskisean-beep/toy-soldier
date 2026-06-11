// soldier.js — one green squad member. Can be PLAYER-controlled or AI-controlled.
//
// The same object plays both ways. When you're "possessing" this soldier, it
// reads the mouse/keyboard. When you switch away, it runs its standing ORDER as
// AI. This dual nature is the heart of a squad game — every man is a character
// you *could* be, and an AI when you're not.

import * as THREE from 'three';
import { createFigure } from './figure.js';
import { moveBy, hasLineOfSight } from './physics.js';
import { BOUNDS } from './world.js';

const MOUSE_SENS = 0.0022;

// The possible standing orders for an AI squadmate.
export const ORDER = { FOLLOW: 'follow', HOLD: 'hold', MOVE: 'move', ATTACK: 'attack' };

export class Soldier {
  constructor(scene, classDef, obstacles) {
    this.cls = classDef;
    this.obstacles = obstacles;

    this.figure = createFigure(0x3f8f3f, {            // army green
      rifleLength: classDef.rifleLength,
      bulky: classDef.bulky,
      marking: classDef.marking,
    });
    scene.add(this.figure);

    this.position = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0.25;                 // only used while player-controlled
    this.maxHealth = classDef.hp;
    this.health = classDef.hp;
    this.alive = true;
    this.downed = false;     // killed but revivable by a medic
    this.fireCooldown = 0;
    this.abilityCd = 0;      // cooldown on press-abilities (grenade/revive)
    this.suppressing = false;// Heavy: holding the suppress ability this frame
    this.zoomed = false;     // Sniper: holding scope this frame
    this.crouched = false;   // C toggles: slower, tighter aim, harder to spot
    this.sprinting = false;  // Shift held: fast, loud, easy to spot, wild aim

    // AI state
    this.order = ORDER.FOLLOW;
    this.orderPoint = new THREE.Vector3();   // destination for MOVE orders
    this.target = null;                      // enemy object for ATTACK orders

    // Reused scratch vectors (avoid per-frame allocation).
    this._f = new THREE.Vector3();
    this._r = new THREE.Vector3();
    this._t = new THREE.Vector3();
  }

  forwardVector() { return this._f.set(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }

  muzzleWorldPosition() {
    return this.figure.localToWorld(this.figure.userData.muzzleOffset.clone());
  }

  // ---- Called once per frame by the Squad. ----
  // ctx = { isActive, input, enemies, bullets, formationSlot }
  // Effective stats, adjusted by the Heavy's suppress stance.
  fireInterval() { return this.suppressing ? this.cls.fireInterval * 0.5 : this.cls.fireInterval; }
  spread() {
    let s = this.suppressing ? this.cls.spread * 2.5 : this.cls.spread;
    if (this.crouched) s *= 0.6;          // braced
    if (this.sprinting) s *= 2.4;         // running and gunning
    return s;
  }

  update(dt, ctx) {
    if (!this.alive) return;
    this.fireCooldown -= dt;
    this.abilityCd = Math.max(0, this.abilityCd - dt);

    if (ctx.isActive) this._controlPlayer(ctx.input, dt);
    else              this._controlAI(dt, ctx);

    // Sync the visible figure to our logical position/facing. Crouching squashes
    // the toy down (and reads as "harder to see" at a glance).
    this.figure.position.copy(this.position);
    this.figure.rotation.y = this.yaw;
    const targetSquash = this.crouched ? 0.66 : 1;
    this.figure.scale.y += (targetSquash - this.figure.scale.y) * Math.min(1, dt * 14);
  }

  // ---------- PLAYER control ----------
  _controlPlayer(input, dt) {
    // Scope slows the mouse for fine aim; suppress slows your feet.
    const sens = MOUSE_SENS * (this.zoomed ? 0.4 : 1);
    this.yaw -= input.mouseDX * sens;
    this.pitch += input.mouseDY * sens;
    this.pitch = Math.max(-0.2, Math.min(0.9, this.pitch));

    const fwd = this.forwardVector();
    this._r.set(fwd.z, 0, -fwd.x);              // right = forward rotated 90°

    let mx = 0, mz = 0;
    if (input.isDown('KeyW')) { mx += fwd.x; mz += fwd.z; }
    if (input.isDown('KeyS')) { mx -= fwd.x; mz -= fwd.z; }
    if (input.isDown('KeyD')) { mx += this._r.x; mz += this._r.z; }
    if (input.isDown('KeyA')) { mx -= this._r.x; mz -= this._r.z; }

    const len = Math.hypot(mx, mz);
    this.sprinting = len > 0 && input.isDown('ShiftLeft') && !this.crouched;
    if (len > 0) {
      let speed = this.cls.speed;
      if (this.sprinting) speed *= 1.65;
      if (this.crouched) speed *= 0.55;       // sneaking
      if (this.suppressing) speed *= 0.5;     // dug-in heavy moves slowly
      const step = (speed * dt) / len;
      moveBy(this.position, mx * step, mz * step, this.obstacles, 0.6, BOUNDS);
    } else {
      this.sprinting = false;
    }
  }

  // Player firing — called from main when the mouse is held. `aimPoint` is the
  // world point under the crosshair, so shots go where you're actually looking.
  tryFireAt(aimPoint, bullets) {
    if (!this.alive || this.fireCooldown > 0) return false;
    bullets.fire(this.muzzleWorldPosition(), this._aimDir(aimPoint), 'player', this.cls.damage);
    this.fireCooldown = this.fireInterval();
    return true;
  }

  // ---------- AI control ----------
  _controlAI(dt, ctx) {
    // Who should we shoot? An explicit ATTACK target if it's still alive,
    // otherwise the nearest enemy within our effective range.
    let engage = (this.order === ORDER.ATTACK && this._targetAlive())
      ? this.target
      : this._nearestEnemy(ctx.enemies, this.cls.range);

    // Rules of engagement: hold fire until the player starts the war (or the
    // enemy does) — except point-blank self-defense.
    if (engage && !ctx.free && engage.pos.distanceTo(this.position) > 9) engage = null;

    // Where should we walk?
    let goal = null;
    if (this.order === ORDER.FOLLOW) goal = ctx.formationSlot;
    else if (this.order === ORDER.MOVE) goal = this.orderPoint;
    else if (this.order === ORDER.ATTACK && this._targetAlive()) goal = this.target.pos;

    if (goal) {
      this._t.subVectors(goal, this.position); this._t.y = 0;
      const dist = this._t.length();
      // How close we want to get before stopping.
      const standoff = this.order === ORDER.ATTACK ? this.cls.range * 0.65 : 0.5;
      if (this.order === ORDER.MOVE && dist < 0.7) this.order = ORDER.HOLD; // arrived
      if (dist > standoff) {
        this._t.multiplyScalar(1 / dist);
        const step = this.cls.speed * dt;
        moveBy(this.position, this._t.x * step, this._t.z * step, this.obstacles, 0.6, BOUNDS);
        if (!engage) this.yaw = Math.atan2(this._t.x, this._t.z); // face travel dir
      }
    }

    // If an ATTACK target died, fall back to regrouping.
    if (this.order === ORDER.ATTACK && !this._targetAlive()) {
      this.order = ORDER.FOLLOW;
      this.target = null;
    }

    // Engage: turn to the enemy and fire on cooldown — but only with a clear
    // shot. A crate between us and the target means we hold fire (and our own
    // cover protects us in return).
    if (engage) {
      this._t.subVectors(engage.pos, this.position); this._t.y = 0;
      this.yaw = Math.atan2(this._t.x, this._t.z);
      const clearShot = hasLineOfSight(this.position, engage.pos, this.obstacles);
      if (clearShot && this.fireCooldown <= 0) {
        const aim = engage.pos.clone(); aim.y = 1.1;   // aim at the torso
        ctx.bullets.fire(this.muzzleWorldPosition(), this._aimDir(aim), 'player', this.cls.damage);
        this.fireCooldown = this.cls.fireInterval;
      }
    }
  }

  _targetAlive() { return this.target && this.target.hp > 0; }

  _nearestEnemy(enemies, range) {
    let best = null, bestD = range;
    for (const e of enemies) {
      const d = e.pos.distanceTo(this.position);
      if (d < bestD) { bestD = d; best = e; }
    }
    return best;
  }

  // Direction from the muzzle to `point`, with a little random spread per class.
  _aimDir(point) {
    const dir = this._t.copy(point).sub(this.muzzleWorldPosition()).normalize();
    const s = this.spread();
    dir.x += (Math.random() - 0.5) * s;
    dir.y += (Math.random() - 0.5) * s;
    dir.z += (Math.random() - 0.5) * s;
    return dir.normalize().clone();
  }

  takeDamage(amount) {
    if (!this.alive) return;
    this.health = Math.max(0, this.health - amount);
    if (this.health === 0) this._die();
  }

  heal(amount) {
    if (!this.alive) return;
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  _die() {
    this.alive = false;
    this.downed = true;        // a medic can still bring them back
    // Lay the figure on its side so you can see who fell.
    this.figure.rotation.z = Math.PI / 2;
    this.figure.position.y = 0.3;
  }

  // Brought back by a medic: stand up with a fraction of max health.
  revive(pct) {
    this.alive = true;
    this.downed = false;
    this.health = Math.round(this.maxHealth * pct);
    this.figure.rotation.z = 0;
    this.figure.position.y = 0;
  }
}
