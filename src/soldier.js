// soldier.js — one green squad member. Can be PLAYER-controlled or AI-controlled.
//
// The same object plays both ways. When you're "possessing" this soldier, it
// reads the mouse/keyboard. When you switch away, it runs its standing ORDER as
// AI. This dual nature is the heart of a squad game — every man is a character
// you *could* be, and an AI when you're not.

import * as THREE from 'three';
import { createFigure } from './figure.js';
import { moveBy, hasLineOfSight } from './physics.js';
import { navStep } from './navgrid.js';
import { sfx } from './audio.js';
import { barks } from './barks.js';

const MOUSE_SENS = 0.0022;

// AI squadmates shoot DELIBERATELY — slower, less precise than a player.
// Your aim is the squad's killing power; theirs is support. Without this the
// three AIs out-shoot you and every fight wins itself.
const AI_FIRE_SLOW = 3.2;
const AI_SPREAD = 2.0;

// The possible standing orders for an AI squadmate.
export const ORDER = { FOLLOW: 'follow', HOLD: 'hold', MOVE: 'move', ATTACK: 'attack' };

export class Soldier {
  constructor(scene, classDef, obstacles, nav, bounds) {
    this.cls = classDef;
    this.obstacles = obstacles;
    this.nav = nav;
    this.bounds = bounds;

    this.figure = createFigure(0x2f9e35, {            // kelly green plastic
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
    this.crashDowned = false;// knocked out by the crash — ANY squadmate can wake him
    this.fireCooldown = 0;
    this.abilityCd = 0;      // cooldown on press-abilities (grenade/revive)

    // Ammo: a magazine you burn and a reserve you carry. AI squadmates manage
    // theirs off-book — the economy is the player's problem by design.
    this.mag = classDef.mag;
    this.reserve = classDef.reserve;
    this.reloading = 0;      // seconds left on the current reload
    this.dryCd = 0;          // rate-limits the empty-rifle click

    // Where the last hit came from (drives the HUD damage-direction arrow).
    this.lastHitFrom = new THREE.Vector3();
    this.lastHitAt = -1e9;
    this.suppressing = false;// Heavy: DIG IN toggled (Space) — bullet hose stance
    this.zoomed = false;     // Sniper: aiming = scoped
    this.aiming = false;     // RMB held: shoulder the rifle — steady, slow, zoomed
    this.crouched = false;   // C toggles: slower, tighter aim, harder to spot
    this.peeking = false;    // in cover + aiming = popped out over it
    this.coverNear = false;  // snappable cover nearby (drives the hint)
    this.inCover = false;    // attached to a cover face (C to enter/exit)
    this.coverBox = null;    // the obstacle we're hugging
    this.coverSide = null;   // which face: 'px' | 'nx' | 'pz' | 'nz'
    this.sprinting = false;  // Shift held: fast, loud, easy to spot, wild aim

    // AI state
    this.order = ORDER.FOLLOW;
    this.orderPoint = new THREE.Vector3();   // destination for MOVE orders
    this.target = null;                      // enemy object for ATTACK orders

    // Walk-cycle state: phase advances with ground covered, amp blends
    // stance ↔ stride so stopping doesn't freeze mid-step.
    this._walkPhase = 0;
    this._animAmp = 0;
    this._animPrev = new THREE.Vector3();

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
    if (this.aiming) s *= 0.55;           // shouldered — sights on
    if (this.sprinting) s *= 2.4;         // running and gunning
    return s;
  }

  // Start swapping magazines (R, or automatic on an empty mag).
  startReload() {
    if (this.reloading > 0 || this.mag >= this.cls.mag || this.reserve <= 0) return;
    this.reloading = this.cls.reload;
    sfx.reload();
    barks.say(this.figure, 'Reloading!', '#9fd8ff');
  }

  update(dt, ctx) {
    if (!this.alive) return;
    this.fireCooldown -= dt;
    this.abilityCd = Math.max(0, this.abilityCd - dt);
    this.dryCd = Math.max(0, this.dryCd - dt);
    if (this.reloading > 0) {
      this.reloading -= dt;
      if (this.reloading <= 0) {
        const take = Math.min(this.cls.mag - this.mag, this.reserve);
        this.mag += take;
        this.reserve -= take;
        this.reloading = 0;
      }
    }

    if (ctx.isActive) this._controlPlayer(ctx.input, dt);
    else              this._controlAI(dt, ctx);

    // Sync the visible figure to our logical position/facing. Crouching
    // squashes the toy down; POPPING OUT over cover rises most of the way
    // back up — enough for the muzzle to clear a sandbag.
    this.figure.position.copy(this.position);
    this.figure.rotation.y = this.yaw;
    const targetSquash = this.crouched ? (this.peeking ? 0.9 : 0.66) : 1;
    this.figure.scale.y += (targetSquash - this.figure.scale.y) * Math.min(1, dt * 14);
    // Shouldering the rifle: swing it from across-the-chest onto the
    // sightline AND raise it to the cheek — aimed down the sights, visibly.
    const rifle = this.figure.userData.rifle;
    if (rifle) {
      const k = Math.min(1, dt * 10);
      const homeY = this.figure.userData.rifleHomeY;
      rifle.rotation.y += ((this.aiming ? 0.02 : -0.14) - rifle.rotation.y) * k;
      rifle.position.y += ((this.aiming ? homeY + 0.16 : homeY) - rifle.position.y) * k;
      rifle.rotation.x += ((this.aiming ? -0.06 : 0) - rifle.rotation.x) * k;
    }

    // Drive the walk cycle from actual ground covered.
    const moved = this.position.distanceTo(this._animPrev);
    this._animPrev.copy(this.position);
    this._walkPhase += moved * 2.6;
    this._animAmp += ((moved > 0.004 ? 1 : 0) - this._animAmp) * Math.min(1, dt * 9);
    this.figure.userData.animate(this._walkPhase, this._animAmp);
  }

  // Find the nearest pop-over-able cover face (top between knee and chest)
  // in ANY direction within reach. Returns { box, side, dist } or null.
  _findCoverFace(radius = 2.4) {
    let best = null;
    for (const b of this.obstacles) {
      if (b.max.y < 0.7 || b.max.y > 1.45) continue;
      // Distance from us to the box (0 if overlapping its footprint).
      const dx = Math.max(b.min.x - this.position.x, 0, this.position.x - b.max.x);
      const dz = Math.max(b.min.z - this.position.z, 0, this.position.z - b.max.z);
      const d = Math.hypot(dx, dz);
      if (d > radius || (best && d >= best.dist)) continue;
      // Which face are we off of? The dominant axis of separation.
      let side;
      if (dx >= dz) side = this.position.x > b.max.x ? 'px' : 'nx';
      else side = this.position.z > b.max.z ? 'pz' : 'nz';
      best = { box: b, side, dist: d };
    }
    return best;
  }

  // C near cover = TAKE COVER (snap + crouch). C in cover = stand back up.
  // C in the open = plain crouch toggle, as always.
  toggleCover() {
    if (this.inCover) {
      this.inCover = false;
      this.coverBox = null;
      this.crouched = false;
      return;
    }
    const face = this._findCoverFace();
    if (face) {
      this.inCover = true;
      this.coverBox = face.box;
      this.coverSide = face.side;
      this.crouched = true;
    } else {
      this.crouched = !this.crouched;
    }
  }

  // ---------- PLAYER control ----------
  _controlPlayer(input, dt) {
    this.coverNear = !this.inCover && !!this._findCoverFace();
    this.peeking = this.inCover && this.aiming;
    // Sights slow the mouse for fine aim (the scope, even more).
    const sens = MOUSE_SENS * (this.zoomed ? 0.4 : this.aiming ? 0.65 : 1);
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

    // --- IN COVER: sticky. A/D slide along the face; pushing straight away
    // (or sprinting) steps out; everything else stays glued. ---
    if (this.inCover && this.coverBox) {
      const b = this.coverBox;
      const n = this.coverSide === 'px' ? [1, 0] : this.coverSide === 'nx' ? [-1, 0]
              : this.coverSide === 'pz' ? [0, 1] : [0, -1];
      if (len > 0) {
        const ix = mx / len, iz = mz / len;
        if (ix * n[0] + iz * n[1] > 0.75 || input.isDown('ShiftLeft')) {
          this.inCover = false;            // stepped out — back to free movement
          this.coverBox = null;
          this.crouched = false;
        } else {
          const tx = -n[1], tz = n[0];     // the face's tangent
          const slide = ix * tx + iz * tz;
          const step = this.cls.speed * 0.5 * dt * slide;
          moveBy(this.position, tx * step, tz * step, this.obstacles, 0.6, this.bounds);
        }
      }
      if (this.inCover) {
        this.sprinting = false;
        // Glue to the hug line just off the face, clamped to its extent.
        const k = Math.min(1, dt * 12);
        if (n[0] !== 0) {
          const hugX = (n[0] > 0 ? b.max.x : b.min.x) + n[0] * 0.62;
          this.position.x += (hugX - this.position.x) * k;
          this.position.z = Math.max(b.min.z - 0.2, Math.min(b.max.z + 0.2, this.position.z));
        } else {
          const hugZ = (n[1] > 0 ? b.max.z : b.min.z) + n[1] * 0.62;
          this.position.z += (hugZ - this.position.z) * k;
          this.position.x = Math.max(b.min.x - 0.2, Math.min(b.max.x + 0.2, this.position.x));
        }
        return;
      }
    }

    this.sprinting = len > 0 && input.isDown('ShiftLeft') && !this.crouched;
    if (len > 0) {
      let speed = this.cls.speed;
      if (this.sprinting) speed *= 1.65;
      if (this.crouched) speed *= 0.55;       // sneaking
      if (this.aiming) speed *= 0.55;         // walking the sights
      if (this.suppressing) speed *= 0.5;     // dug-in heavy moves slowly
      const step = (speed * dt) / len;
      moveBy(this.position, mx * step, mz * step, this.obstacles, 0.6, this.bounds);
    } else {
      this.sprinting = false;
    }
  }

  // Player firing — called from main when the mouse is held. `aimPoint` is the
  // world point under the crosshair, so shots go where you're actually looking.
  tryFireAt(aimPoint, bullets) {
    if (!this.alive || this.fireCooldown > 0 || this.reloading > 0) return false;
    if (this.mag <= 0) {
      if (this.reserve > 0) {
        this.startReload();
      } else if (this.dryCd <= 0) {
        sfx.dry();               // out. Find a supply drop.
        this.dryCd = 0.35;
      }
      return false;
    }
    bullets.fire(this.muzzleWorldPosition(), this._aimDir(aimPoint), 'player', this.cls.damage);
    this.mag--;
    this.fireCooldown = this.fireInterval();
    if (this.mag === 0 && this.reserve > 0) this.startReload();
    return true;
  }

  // ---------- AI control ----------
  _controlAI(dt, ctx) {
    this.peeking = false;
    this.coverNear = false;
    // Who should we shoot? An explicit ATTACK target if it's still alive,
    // otherwise the nearest enemy within our effective range.
    let engage = (this.order === ORDER.ATTACK && this._targetAlive())
      ? this.target
      : this._nearestEnemy(ctx.enemies, this.cls.range);

    // Rules of engagement: hold fire until the player starts the war (or the
    // enemy does) — except point-blank self-defense.
    if (engage && !ctx.free && engage.pos.distanceTo(this.position) > 12) engage = null;
    // HOLD FIRE is an order: bite the trigger even with a target in the open.
    // Only point-blank self-defense overrides it.
    if (engage && ctx.fireMode === 'hold' && engage.pos.distanceTo(this.position) > 6) engage = null;

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
        // Hustle when the formation left us behind — the leader can sprint,
        // followers can at least jog.
        let speed = this.cls.speed;
        if (this.order === ORDER.FOLLOW && dist > 12) speed *= 1.5;
        // navStep paths around furniture instead of grinding into it.
        const dir = navStep(this.nav, this, this.position, goal, speed, dt,
                            this.obstacles, 0.6, this.bounds);
        if (!engage && dir) this.yaw = Math.atan2(dir.x, dir.z); // face travel dir
      }
    }

    // If an ATTACK target died, fall back to regrouping.
    if (this.order === ORDER.ATTACK && !this._targetAlive()) {
      this.order = ORDER.FOLLOW;
      this.target = null;
    }

    // Fighting from a standstill, an AI squadmate takes a knee — a smaller
    // target that reads as a soldier, not a statue.
    this.crouched = !!engage && !goal;

    // Engage: turn to the enemy and fire on cooldown — but only with a clear
    // shot. A crate between us and the target means we hold fire (and our own
    // cover protects us in return).
    if (engage) {
      this._t.subVectors(engage.pos, this.position); this._t.y = 0;
      this.yaw = Math.atan2(this._t.x, this._t.z);
      const clearShot = hasLineOfSight(this.position, engage.pos, this.obstacles, 1.45, (engage.baseY || 0) + 1.1);
      if (clearShot && this.fireCooldown <= 0) {
        const aim = engage.pos.clone(); aim.y = (engage.baseY || 0) + 1.1;   // the torso, wherever it stands
        ctx.bullets.fire(this.muzzleWorldPosition(), this._aimDir(aim, AI_SPREAD), 'player', this.cls.damage);
        this.fireCooldown = this.cls.fireInterval * AI_FIRE_SLOW;
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

  // Direction from the muzzle to `point`, with a little random spread per
  // class (× an extra factor for deliberate-but-imperfect AI fire).
  _aimDir(point, spreadMult = 1) {
    const dir = this._t.copy(point).sub(this.muzzleWorldPosition()).normalize();
    const s = this.spread() * spreadMult;
    dir.x += (Math.random() - 0.5) * s;
    dir.y += (Math.random() - 0.5) * s;
    dir.z += (Math.random() - 0.5) * s;
    return dir.normalize().clone();
  }

  // `fromPos` ({x,z}, optional) = where the hurt came from, for the HUD arrow.
  takeDamage(amount, fromPos) {
    if (!this.alive) return;
    if (fromPos) {
      this.lastHitFrom.set(fromPos.x, 0, fromPos.z);
      this.lastHitAt = performance.now();
    }
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

  // Brought back by a medic (or shaken awake after the crash): stand up with
  // a fraction of max health.
  revive(pct) {
    this.alive = true;
    this.downed = false;
    this.crashDowned = false;
    this.health = Math.round(this.maxHealth * pct);
    this.figure.rotation.z = 0;
    this.figure.position.y = 0;
  }
}
