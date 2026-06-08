// input.js — tracks keyboard + mouse so the game loop can ask "is W down?"
//
// We don't act on input here. We just RECORD state. Step 2 of the game loop
// (update) reads this state each frame. Keeping input separate from logic is a
// habit worth forming early — it keeps the rest of the code testable and clean.

export class Input {
  constructor(domElement) {
    this.keys = {};                       // held state, e.g. { KeyW: true }
    this.pressed = {};                    // "just went down THIS frame" (edge)
    this.mouseDX = 0;                     // how far the mouse moved this frame (x)
    this.mouseDY = 0;                     // ...and y. Reset to 0 after each frame.
    this.firing = false;                  // is the left mouse button held?
    this.aiming = false;                  // is the right mouse button held? (hold abilities)
    this.locked = false;                  // do we currently own the mouse (pointer lock)?

    this._dom = domElement;

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

    // --- firing (left button) and hold-abilities (right button) ---
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) this.firing = true;
      if (e.button === 2) this.aiming = true;
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.firing = false;
      if (e.button === 2) this.aiming = false;
    });
    // Don't pop the browser's right-click menu over the game.
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    // --- pointer lock bookkeeping ---
    // When the browser grants/releases the mouse, update our `locked` flag.
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this._dom;
    });
  }

  isDown(code) { return !!this.keys[code]; }

  // True only on the single frame a key was first pressed (for orders/switching).
  consume(code) {
    if (this.pressed[code]) { this.pressed[code] = false; return true; }
    return false;
  }

  // Ask the browser to capture the mouse (hides cursor, gives raw movement).
  requestLock() { this._dom.requestPointerLock(); }

  // Call once at the END of each frame so movement deltas and edge-presses
  // don't carry over into the next frame.
  endFrame() { this.mouseDX = 0; this.mouseDY = 0; this.pressed = {}; }
}
