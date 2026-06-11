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

// Is there a clear line (no crate in the way) between two world points?
// Used by both enemies and squad AI to decide whether they have a shot.
export function hasLineOfSight(from, to, obstacles) {
  for (const box of obstacles) {
    if (segHitsRect(from.x, from.z, to.x, to.z,
                    box.min.x, box.min.z, box.max.x, box.max.z)) {
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
      return; // blocked on this axis
    }
  }
  pos.x = nx;
  pos.z = nz;
}
