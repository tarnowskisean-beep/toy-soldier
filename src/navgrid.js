// navgrid.js — pathfinding: how an AI walks AROUND furniture instead of into it.
//
// Steering straight at a goal wedges soldiers on couch corners forever:
// moveBy() can slide along ONE wall, but a concave pocket blocks both axes and
// the soldier grinds in place. The classic fix (used by basically every game
// since the 90s) has three parts:
//
//   1. BAKE the floor into a coarse grid of walkable/blocked cells — once,
//      at load, because the furniture never moves.
//   2. SEARCH the grid with A* — Dijkstra plus a "which way is the goal" hint,
//      so the search expands almost straight toward the target.
//   3. SMOOTH the cell-by-cell route down to a few corner waypoints and steer
//      at those with the same moveBy() everyone already uses.
//
// navStep() at the bottom is the drop-in mover: walks straight when the way
// is clear, paths around furniture when it isn't, and re-plans if it gets
// stuck anyway. Squad AI and enemies both call it.

import { moveBy } from './physics.js';

const SQRT2 = Math.SQRT2;

export class NavGrid {
  // `radius` pads every obstacle by the walker's body so a "walkable" cell is
  // one a soldier can actually STAND in, not just poke a toe into.
  constructor(bounds, obstacles, cell = 1, radius = 0.65) {
    this.bounds = bounds;
    this.cell = cell;
    this.w = Math.ceil((bounds.maxX - bounds.minX) / cell);
    this.h = Math.ceil((bounds.maxZ - bounds.minZ) / cell);
    const n = this.w * this.h;

    this.blocked = new Uint8Array(n);
    for (let gz = 0; gz < this.h; gz++) {
      for (let gx = 0; gx < this.w; gx++) {
        const x = bounds.minX + (gx + 0.5) * cell;
        const z = bounds.minZ + (gz + 0.5) * cell;
        for (const b of obstacles) {
          if (x > b.min.x - radius && x < b.max.x + radius &&
              z > b.min.z - radius && z < b.max.z + radius) {
            this.blocked[gz * this.w + gx] = 1;
            break;
          }
        }
      }
    }

    // A* scratch, allocated once and reused — pathfinding runs every time an
    // AI re-plans, so it must not churn garbage. `_seen`/`_closed` use a stamp
    // (search counter) instead of being cleared: a cell is "from this search"
    // only if its stamp matches.
    this._g = new Float64Array(n);
    this._f = new Float64Array(n);
    this._parent = new Int32Array(n);
    this._seen = new Int32Array(n);
    this._closed = new Int32Array(n);
    this._stamp = 0;
    this._heap = [];
  }

  _gx(x) { return Math.max(0, Math.min(this.w - 1, Math.floor((x - this.bounds.minX) / this.cell))); }
  _gz(z) { return Math.max(0, Math.min(this.h - 1, Math.floor((z - this.bounds.minZ) / this.cell))); }
  _wx(gx) { return this.bounds.minX + (gx + 0.5) * this.cell; }
  _wz(gz) { return this.bounds.minZ + (gz + 0.5) * this.cell; }

  blockedAt(x, z) { return !!this.blocked[this._gz(z) * this.w + this._gx(x)]; }

  // Nearest standable spot to a world point — for goals that land INSIDE
  // furniture (a move order clicked onto a crate, a formation slot in a couch).
  // Spirals outward ring by ring.
  nearestOpen(x, z) {
    const gx = this._gx(x), gz = this._gz(z);
    if (!this.blocked[gz * this.w + gx]) return { x, z };
    for (let r = 1; r <= 14; r++) {
      for (let dz = -r; dz <= r; dz++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;  // ring edge only
          const nx = gx + dx, nz = gz + dz;
          if (nx < 0 || nz < 0 || nx >= this.w || nz >= this.h) continue;
          if (!this.blocked[nz * this.w + nx]) return { x: this._wx(nx), z: this._wz(nz) };
        }
      }
    }
    return { x, z };
  }

  // Can a BODY walk straight between two points? Samples the grid along the
  // segment. (Different from line-of-SIGHT: this respects body radius,
  // because the grid was baked with it.)
  isClear(ax, az, bx, bz) {
    const d = Math.hypot(bx - ax, bz - az);
    const steps = Math.max(1, Math.ceil(d / (this.cell * 0.5)));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      if (this.blockedAt(ax + (bx - ax) * t, az + (bz - az) * t)) return false;
    }
    return true;
  }

  // --- the binary min-heap (priority = _f) backing A*'s open set ---
  _push(i) {
    const heap = this._heap, f = this._f;
    heap.push(i);
    let c = heap.length - 1;
    while (c > 0) {
      const p = (c - 1) >> 1;
      if (f[heap[p]] <= f[heap[c]]) break;
      [heap[p], heap[c]] = [heap[c], heap[p]];
      c = p;
    }
  }
  _pop() {
    const heap = this._heap, f = this._f;
    const top = heap[0], last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let p = 0;
      for (;;) {
        const l = p * 2 + 1, r = l + 1;
        let s = p;
        if (l < heap.length && f[heap[l]] < f[heap[s]]) s = l;
        if (r < heap.length && f[heap[r]] < f[heap[s]]) s = r;
        if (s === p) break;
        [heap[p], heap[s]] = [heap[s], heap[p]];
        p = s;
      }
    }
    return top;
  }

  // A* from (sx,sz) to (tx,tz), world coords. Returns world waypoints
  // [{x,z}, ...] ending at the target (or its nearest open cell), or null if
  // no route exists. 8-way movement; diagonals only when both orthogonal
  // neighbors are open (no cutting corners through a crate edge).
  findPath(sx, sz, tx, tz) {
    const W = this.w, H = this.h;
    let sgx = this._gx(sx), sgz = this._gz(sz);
    let tgx = this._gx(tx), tgz = this._gz(tz);
    // A walker can legally stand with its center in a "blocked" cell (the grid
    // pads by radius) — search from/to the nearest open cell instead.
    if (this.blocked[sgz * W + sgx]) {
      const p = this.nearestOpen(sx, sz);
      sgx = this._gx(p.x); sgz = this._gz(p.z);
    }
    if (this.blocked[tgz * W + tgx]) {
      const p = this.nearestOpen(tx, tz);
      tgx = this._gx(p.x); tgz = this._gz(p.z);
    }
    const start = sgz * W + sgx, target = tgz * W + tgx;
    if (this.blocked[start] || this.blocked[target]) return null;
    if (start === target) return [{ x: this._wx(tgx), z: this._wz(tgz) }];

    const stamp = ++this._stamp;
    const g = this._g, f = this._f, parent = this._parent;
    const seen = this._seen, closed = this._closed;
    this._heap.length = 0;

    // Octile heuristic: exact straight/diagonal distance on an empty grid.
    const hcost = (i) => {
      const dx = Math.abs((i % W) - tgx), dz = Math.abs(((i / W) | 0) - tgz);
      return Math.min(dx, dz) * SQRT2 + Math.abs(dx - dz);
    };

    g[start] = 0;
    f[start] = hcost(start);
    parent[start] = -1;
    seen[start] = stamp;
    this._push(start);

    let found = false;
    let guard = 40000;                  // never hang the frame on a bad query
    while (this._heap.length && guard-- > 0) {
      const cur = this._pop();
      if (closed[cur] === stamp) continue;        // stale duplicate in heap
      closed[cur] = stamp;
      if (cur === target) { found = true; break; }

      const cx = cur % W, cz = (cur / W) | 0;
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dz === 0) continue;
          const nx = cx + dx, nz = cz + dz;
          if (nx < 0 || nz < 0 || nx >= W || nz >= H) continue;
          const ni = nz * W + nx;
          if (this.blocked[ni] || closed[ni] === stamp) continue;
          if (dx !== 0 && dz !== 0 &&
              (this.blocked[cz * W + nx] || this.blocked[nz * W + cx])) continue;
          const ng = g[cur] + (dx !== 0 && dz !== 0 ? SQRT2 : 1);
          if (seen[ni] !== stamp || ng < g[ni]) {
            seen[ni] = stamp;
            g[ni] = ng;
            f[ni] = ng + hcost(ni);
            parent[ni] = cur;
            this._push(ni);
          }
        }
      }
    }
    if (!found) return null;

    // Walk parents back to the start, then keep only DIRECTION CHANGES —
    // a straight hallway is one waypoint, not forty.
    const cells = [];
    for (let i = target; i !== -1; i = parent[i]) cells.push(i);
    cells.reverse();
    const pts = [];
    for (let i = 0; i < cells.length; i++) {
      if (i > 0 && i < cells.length - 1) {
        const a = cells[i - 1], b = cells[i], c = cells[i + 1];
        const d1x = (b % W) - (a % W), d1z = ((b / W) | 0) - ((a / W) | 0);
        const d2x = (c % W) - (b % W), d2z = ((c / W) | 0) - ((b / W) | 0);
        if (d1x === d2x && d1z === d2z) continue;   // same direction: skip
      }
      pts.push({ x: this._wx(cells[i] % W), z: this._wz((cells[i] / W) | 0) });
    }

    // String-pulling: from each kept point, jump to the FURTHEST later point
    // you can walk straight to. Turns staircase routes into clean diagonals.
    const out = [];
    let i = 0;
    while (i < pts.length - 1) {
      let j = pts.length - 1;
      while (j > i + 1 && !this.isClear(pts[i].x, pts[i].z, pts[j].x, pts[j].z)) j--;
      out.push(pts[j]);
      i = j;
    }
    return out.length ? out : [pts[pts.length - 1]];
  }
}

// One frame of "walk smart toward goal": straight when clear, around furniture
// when not. Mutates `pos`; returns the movement direction {x,z} (for facing)
// or null if there was nothing to do. `agent` is any object — its _nav*
// fields cache the current path between frames.
export function navStep(nav, agent, pos, goal, speed, dt, obstacles, radius, bounds) {
  const step = speed * dt;
  let tx, tz;

  if (nav.isClear(pos.x, pos.z, goal.x, goal.z)) {
    agent._navPath = null;
    tx = goal.x; tz = goal.z;
  } else {
    // (Re)plan when we have no path or the goal wandered off the old one.
    const goalMoved = agent._navPath &&
      Math.hypot(goal.x - agent._navGoalX, goal.z - agent._navGoalZ) > 2.0;
    if (!agent._navPath || goalMoved) {
      agent._navPath = nav.findPath(pos.x, pos.z, goal.x, goal.z);
      agent._navGoalX = goal.x; agent._navGoalZ = goal.z;
      if (!agent._navPath) return null;             // truly unreachable: stand
    }
    const path = agent._navPath;
    while (path.length > 1 && Math.hypot(path[0].x - pos.x, path[0].z - pos.z) < 0.8) {
      path.shift();                                  // reached a corner: next
    }
    tx = path[0].x; tz = path[0].z;
  }

  const dx = tx - pos.x, dz = tz - pos.z;
  const d = Math.hypot(dx, dz);
  if (d < 1e-4) return null;
  const px = pos.x, pz = pos.z;
  moveBy(pos, (dx / d) * Math.min(step, d), (dz / d) * Math.min(step, d), obstacles, radius, bounds);

  // Stuck watchdog: trying to move but barely moving → the path is bad
  // (or we're pinned by a buddy). Throw it away; next frame re-plans from
  // wherever we're wedged.
  if (Math.hypot(pos.x - px, pos.z - pz) < step * 0.25) {
    agent._navStuck = (agent._navStuck || 0) + dt;
    if (agent._navStuck > 0.5) {
      agent._navPath = null;
      agent._navStuck = 0;
    }
  } else {
    agent._navStuck = 0;
  }
  return { x: dx / d, z: dz / d };
}
