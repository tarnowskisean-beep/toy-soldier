// physics.js — shared movement-with-collision helper.
//
// Both squad members and enemies need to walk around the arena without passing
// through crates or leaving the map. Rather than duplicate that logic, they all
// call moveBy(). One copy of a rule = one place to fix bugs.

// Try to move `pos` by (dx, dz). We attempt each axis SEPARATELY so that when
// you push into a wall you slide along its face instead of stopping dead.
// `bounds` is the walkable rect: { minX, maxX, minZ, maxZ }.
export function moveBy(pos, dx, dz, obstacles, radius, bounds) {
  _step(pos, pos.x + dx, pos.z, obstacles, radius, bounds);
  _step(pos, pos.x, pos.z + dz, obstacles, radius, bounds);
}

// Does the 2D segment (ax,az)->(bx,bz) cross the axis-aligned rectangle?
// Liang–Barsky clipping: shrink the [0,1] travel range to the part inside the
// rect; if anything survives, the segment hits it. We work in the XZ plane and
// ignore height — our crates are tall enough to fully block, which keeps it simple.
export function segHitsRect(ax, az, bx, bz, minx, minz, maxx, maxz) {
  let t0 = 0, t1 = 1;
  const dx = bx - ax, dz = bz - az;
  const clip = (p, q) => {
    if (p === 0) return q >= 0;       // parallel to this edge: inside iff q>=0
    const r = q / p;
    if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; }
    else { if (r < t0) return false; if (r < t1) t1 = r; }
    return true;
  };
  if (clip(-dx, ax - minx) && clip(dx, maxx - ax) &&
      clip(-dz, az - minz) && clip(dz, maxz - az)) {
    return t0 <= t1;
  }
  return false;
}

// 3D segment vs box (the same slab idea, all three axes). Returns the entry
// fraction t in [0,1] where the segment first crosses into the box, or
// Infinity if it misses. The camera boom and line-of-sight both use this.
export function segBoxEntryT(ax, ay, az, bx, by, bz, box) {
  let t0 = 0, t1 = 1;
  const dx = bx - ax, dy = by - ay, dz = bz - az;
  const clip = (p, q) => {
    if (p === 0) return q >= 0;
    const r = q / p;
    if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; }
    else { if (r < t0) return false; if (r < t1) t1 = r; }
    return true;
  };
  if (clip(-dx, ax - box.min.x) && clip(dx, box.max.x - ax) &&
      clip(-dy, ay - box.min.y) && clip(dy, box.max.y - ay) &&
      clip(-dz, az - box.min.z) && clip(dz, box.max.z - az) && t0 <= t1) {
    return t0;
  }
  return Infinity;
}

// Is there a clear sightline between two world points? Checked in 3D at real
// eye/target heights, so a knee-high sandbag hides a CROUCHED man but not a
// standing one — height is what makes low cover a real choice.
// `hFrom`/`hTo` default to eye level and torso height.
export function hasLineOfSight(from, to, obstacles, hFrom = 1.4, hTo = 1.1) {
  const ay = (from.y || 0) + hFrom, by = (to.y || 0) + hTo;
  for (const box of obstacles) {
    if (segBoxEntryT(from.x, ay, from.z, to.x, by, to.z, box) < Infinity) {
      return false;
    }
  }
  return true;
}

function _step(pos, nx, nz, obstacles, radius, bounds) {
  // Stay inside the house.
  if (nx < bounds.minX || nx > bounds.maxX || nz < bounds.minZ || nz > bounds.maxZ) return;
  // Don't enter any crate (expanded by our body radius).
  for (const box of obstacles) {
    if (nx > box.min.x - radius && nx < box.max.x + radius &&
        nz > box.min.z - radius && nz < box.max.z + radius) {
      // Already overlapping this box (bad spawn, shove)? Then it can't pin
      // us — let the move through so a wedged body can walk back out.
      if (pos.x > box.min.x - radius && pos.x < box.max.x + radius &&
          pos.z > box.min.z - radius && pos.z < box.max.z + radius) continue;
      return; // blocked on this axis
    }
  }
  pos.x = nx;
  pos.z = nz;
}
