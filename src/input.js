// input.js — tracks keyboard + mouse + gamepad so the game loop can ask "is W down?"
//
// We don't act on input here. We just RECORD state. Step 2 of the game loop
// (update) reads this state each frame. Keeping input separate from logic is a
// habit worth forming early — it keeps the rest of the code testable and clean.
//
// The gamepad is the interesting one: unlike the keyboard (which PUSHES events
// at us), the Gamepad API is POLLED — every frame we ask the browser for the
// pad's current state and diff it against last frame's to manufacture the same
// "edges" (just-pressed) that key events give us for free. pollGamepad() then
// writes onto the SAME fields the keyboard and mouse write (keys, pressed,
// mouseDX, firing, aiming), so the rest of the game never knows a pad exists.

// Xbox pad buttons → the key codes the game already understands. Indices are
// the W3C "standard" mapping, which Xbox controllers report in every browser.
const PAD_BINDS = {
  0: 'KeyE',      // A — interact: revive / silent takedown
  1: 'KeyC',      // B — take cover / crouch
  2: 'KeyR',      // X — reload
  3: 'Space',     // Y — class ability: grenade / revive / dig in
  4: 'Tab',       // LB — cycle squaddie
  5: 'KeyQ',      // RB — squad order: move / attack what I'm aiming at
  8: 'KeyM',      // View — map
  9: 'KeyM',      // Menu — map (no pause screen yet, map is the next best thing)
  11: 'KeyG',     // R3 — single out the squadmate under the crosshair
  12: 'KeyF',     // D-pad up — regroup ("on me")
  13: 'KeyH',     // D-pad down — hold positions
  14: 'KeyX',     // D-pad left — hold fire / weapons free
  15: 'Tab',      // D-pad right — cycle squaddie (same as LB)
};
// L3 (10) and the triggers (6/7) are handled specially below — sprint latch,
// aim and fire — because they're holds/latches, not simple key taps.

const DEADZONE = 0.16;       // sticks never rest at exactly 0 — ignore the wobble
const LOOK_SPEED = 1050;     // full right-stick deflection ≈ this many "mouse px"/sec
const TRIG_ON = 0.35, TRIG_OFF = 0.22;  // trigger thresholds (gap prevents flicker)

// Apply the deadzone RADIALLY (on the stick's distance from center, not per
// axis) and re-scale so movement starts at 0 right past the dead zone instead
// of jumping. Returns [x, y, magnitude 0..1].
function stickValue(ax, ay) {
  const mag = Math.hypot(ax, ay);
  if (mag < DEADZONE) return [0, 0, 0];
  const t = Math.min(1, (mag - DEADZONE) / (1 - DEADZONE));
  return [(ax / mag) * t, (ay / mag) * t, t];
}

export class Input {
  constructor(domElement) {
    this.keys = {};                       // held state, e.g. { KeyW: true }
    this.pressed = {};                    // "just went down THIS frame" (edge)
    this.mouseDX = 0;                     // how far the mouse moved this frame (x)
    this.mouseDY = 0;                     // ...and y. Reset to 0 after each frame.
    this.firing = false;                  // is the left mouse button held?
    this.aiming = false;                  // sights up? (RMB: tap = toggle, hold = hold)
    this._rmbDownAt = 0;
    this._rmbTurningOff = false;
    this.locked = false;                  // do we currently own the mouse (pointer lock)?
    this.debugLock = false;               // dev: lets automation drive the game without pointer lock

    // --- gamepad state ---
    this.padConnected = false;            // a pad is plugged in / paired
    this.padActive = false;               // ...and has actually been touched (gates the game like pointer lock)
    this.padMoveX = 0;                    // left stick, strafe  (-1 left … +1 right)
    this.padMoveY = 0;                    // left stick, forward (-1 back … +1 forward)
    this.padPressed = {};                 // raw pad edges ('A','B','Up','Down') for menu screens
    this._padBtns = {};                   // last frame's button state, to detect edges
    this._padSprint = false;              // L3 latches sprint until the stick eases off
    this._padFiring = false;              // what the triggers asserted last frame
    this._padAiming = false;

    this._dom = domElement;

    window.addEventListener('gamepadconnected', () => { this.padConnected = true; });
    window.addEventListener('gamepaddisconnected', () => {
      // Pad yanked mid-fight: release everything it was holding — no ghost inputs.
      this.padConnected = false;
      this.padActive = false;
      this.padMoveX = 0; this.padMoveY = 0;
      this._padSprint = false;
      if (this._padFiring) { this.firing = false; this._padFiring = false; }
      if (this._padAiming) { this.aiming = false; this._padAiming = false; }
      for (const code of Object.values(PAD_BINDS)) this.keys[code] = false;
      this.keys['ShiftLeft'] = false;
      this._padBtns = {};
    });

    // --- keyboard ---
    window.addEventListener('keydown', (e) => {
      // Tab moves browser focus; Space scrolls the page — we want both for the
      // game, so stop the browser's default for them.
      if (e.code === 'Tab' || e.code === 'Space') e.preventDefault();
      // Record an edge only on the transition from up→down (ignore key-repeat).
      if (!this.keys[e.code]) this.pressed[e.code] = true;
      this.keys[e.code] = true;
    });
    window.addEventListener('keyup',   (e) => { this.keys[e.code] = false; });

    // --- mouse look (only counts while pointer is locked) ---
    window.addEventListener('mousemove', (e) => {
      if (!this.locked) return;
      this.mouseDX += e.movementX;
      this.mouseDY += e.movementY;
    });

    // --- firing (left button) and aiming (right button) ---
    // Aiming is a SMART TOGGLE: tap RMB to raise the sights (they STAY up so
    // you can left-click to fire — vital on trackpads, where you physically
    // can't hold right and click left at once), tap again to lower. Mouse
    // users who HOLD RMB get classic hold-to-aim: a long press lowers the
    // sights on release.
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) this.firing = true;
      if (e.button === 2) {
        if (!this.aiming) {
          this.aiming = true;
          this._rmbDownAt = performance.now();
          this._rmbTurningOff = false;
        } else {
          this._rmbTurningOff = true;
        }
      }
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.firing = false;
      if (e.button === 2) {
        if (this._rmbTurningOff) this.aiming = false;
        else if (performance.now() - this._rmbDownAt > 350) this.aiming = false;
      }
    });
    // Don't pop the browser's right-click menu over the game.
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    // --- pointer lock bookkeeping ---
    // When the browser grants/releases the mouse, update our `locked` flag.
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this._dom;
      // Losing the mouse drops the trigger and the sights — no ghost inputs.
      if (!this.locked) {
        this.firing = false;
        this.aiming = false;
      }
    });
  }

  // Call once at the START of each frame, before game logic reads input.
  // Diffs the pad against last frame and writes the result onto the same
  // fields keyboard + mouse use, so everything downstream Just Works.
  pollGamepad(dt) {
    this.padMoveX = 0; this.padMoveY = 0;
    if (!this.padConnected) return;
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let gp = null;
    for (const p of pads) if (p && p.connected) { gp = p; break; }
    if (!gp) return;

    // --- sticks ---
    // Left stick = movement. Up on a stick reads NEGATIVE, so flip Y.
    const [mx, my, moveMag] = stickValue(gp.axes[0] || 0, gp.axes[1] || 0);
    this.padMoveX = mx;
    this.padMoveY = -my;
    // Right stick = look. We feed it into mouseDX/DY — the same channel the
    // mouse uses — scaled by dt because a held stick is a RATE (turn this fast)
    // while a mouse delta is a DISTANCE. Squaring the deflection (t * |t|)
    // gives a gentle center for fine aim and a fast edge for snapping around.
    const [lx, ly] = stickValue(gp.axes[2] || 0, gp.axes[3] || 0);
    this.mouseDX += lx * Math.abs(lx) * LOOK_SPEED * dt;
    this.mouseDY += ly * Math.abs(ly) * LOOK_SPEED * dt;

    // --- triggers (analog, with on/off hysteresis so a half-pull can't flicker) ---
    const trig = (i) => (gp.buttons[i] ? gp.buttons[i].value : 0);
    const rt = trig(7), lt = trig(6);
    const wantFire = this._padFiring ? rt > TRIG_OFF : rt > TRIG_ON;
    if (wantFire !== this._padFiring) { this._padFiring = wantFire; this.firing = wantFire; }
    const wantAim = this._padAiming ? lt > TRIG_OFF : lt > TRIG_ON;   // hold-to-aim
    if (wantAim !== this._padAiming) { this._padAiming = wantAim; this.aiming = wantAim; }

    // --- buttons → virtual key presses ---
    let touched = moveMag > 0 || lx !== 0 || ly !== 0 || this._padFiring || this._padAiming;
    const down = (i) => !!(gp.buttons[i] && gp.buttons[i].pressed);
    for (const [idx, code] of Object.entries(PAD_BINDS)) {
      const now = down(+idx), was = !!this._padBtns[idx];
      if (now && !was) { if (!this.keys[code]) this.pressed[code] = true; this.keys[code] = true; }
      else if (!now && was) { this.keys[code] = false; }
      this._padBtns[idx] = now;
      touched = touched || now;
    }

    // --- L3 = sprint LATCH: click once to run, ease the stick off to stop.
    // (Holding a stick clicked while also steering it is hand-cramp territory.)
    if (down(10) && !this._padBtns[10]) this._padSprint = true;
    this._padBtns[10] = down(10);
    if (this._padSprint && moveMag < 0.4) this._padSprint = false;
    const sprint = this._padSprint;
    if (sprint && !this.keys['ShiftLeft']) this.keys['ShiftLeft'] = true;
    else if (!sprint && this._padBtns['sprintHeld']) this.keys['ShiftLeft'] = false;
    this._padBtns['sprintHeld'] = sprint;

    // --- raw edges for the menu screens (A confirms, B backs out, d-pad moves) ---
    for (const [idx, name] of [[0, 'A'], [1, 'B'], [12, 'Up'], [13, 'Down']]) {
      const now = down(idx);
      if (now && !this._padBtns['raw' + name]) this.padPressed[name] = true;
      this._padBtns['raw' + name] = now;
    }

    if (touched) this.padActive = true;
  }

  isDown(code) { return !!this.keys[code]; }

  // True only on the single frame a key was first pressed (for orders/switching).
  consume(code) {
    if (this.pressed[code]) { this.pressed[code] = false; return true; }
    return false;
  }

  // Same, for raw pad buttons on menu screens ('A', 'B', 'Up', 'Down').
  consumePad(name) {
    if (this.padPressed[name]) { this.padPressed[name] = false; return true; }
    return false;
  }

  // Ask the browser to capture the mouse (hides cursor, gives raw movement).
  // May be called from a gamepad press, which the browser does NOT count as a
  // "user gesture" — in that case the request fails and that's fine: with a pad
  // you don't need the mouse captured at all.
  requestLock() {
    try {
      const p = this._dom.requestPointerLock();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* no gesture, no lock — pad play works without it */ }
  }

  // Call once at the END of each frame so movement deltas and edge-presses
  // don't carry over into the next frame.
  endFrame() { this.mouseDX = 0; this.mouseDY = 0; this.pressed = {}; this.padPressed = {}; }
}
