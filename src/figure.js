// figure.js — builds a SARGE'S-HEROES-style army man: a sculpted, animated
// character, not a stack of boxes.
//
// What sells it: ROUNDED molded limbs (capsules, not slabs), a real action
// stance, the M1 helmet over an actual head, both hands on the rifle, one
// glossy plastic the whole body shares — and legs that SWING when he runs.
//
// The figure exposes:
//   userData.muzzleOffset — figure-local muzzle tip (bullet spawns)
//   userData.rifle        — the arms+rifle assembly (ADS swings it forward)
//   userData.fadeMats     — materials to ghost when blocking the camera
//   userData.animate(phase, amp) — walk cycle: phase advances with distance
//        walked, amp 0..1 blends molded action stance ↔ full run swing

import * as THREE from 'three';

// createFigure(color, opts)
//   color: the molded-plastic tint (green for squad, tan for enemy)
//   opts.rifleLength: visual gun length (also moves the muzzle)
//   opts.bulky: wider body for the Heavy / gunner
//   opts.marking: 'leader' | 'cross' | 'none'
export function createFigure(color, opts = {}) {
  const rifleLength = (opts.rifleLength ?? 0.9) + 0.5;
  const bulky = opts.bulky ?? false;
  const marking = opts.marking ?? 'none';
  const bw = bulky ? 1.22 : 1;

  const group = new THREE.Group();
  // ONE glossy plastic for everything — clearcoat is what reads as "molded".
  const mat = new THREE.MeshPhysicalMaterial({
    color, roughness: 0.3, metalness: 0,
    clearcoat: 0.55, clearcoatRoughness: 0.3,
  });
  const fadeMats = [mat];

  const add = (parent, geo, x, y, z, rx = 0, ry = 0, rz = 0, m = mat) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const cap = (r, len) => new THREE.CapsuleGeometry(r, len, 3, 10);
  const ball = (r) => new THREE.SphereGeometry(r, 12, 9);

  // ---- LEGS: hip-pivot groups so they can swing. Boot soles land on y=0. ----
  const makeLeg = (side) => {                       // side: -1 left, +1 right
    const hip = new THREE.Group();
    hip.position.set(side * 0.21 * bw, 1.02, 0);
    add(hip, cap(0.145 * bw, 0.34), 0, -0.26, 0);                 // thigh
    add(hip, cap(0.115, 0.3), 0, -0.6, 0.015);                    // shin
    add(hip, box(0.26, 0.2, 0.44), 0, -0.92, 0.08);               // boot
    group.add(hip);
    return hip;
  };
  const lHip = makeLeg(-1);
  const rHip = makeLeg(1);

  // ---- UPPER BODY (bobs as one piece while running) ----
  const upper = new THREE.Group();
  group.add(upper);

  add(upper, box(0.46 * bw, 0.3, 0.34), 0, 1.1, 0);               // pelvis
  add(upper, box(0.4 * bw, 0.34, 0.3), 0, 1.27, 0.02);            // belly
  const chest = add(upper, cap(0.27 * bw, 0.26), 0, 1.47, 0.03);  // chest
  chest.rotation.x = 0.08;                                        // leaned in
  add(upper, ball(0.16 * bw), -0.31 * bw, 1.6, 0.02);             // shoulders
  add(upper, ball(0.16 * bw), 0.31 * bw, 1.6, 0.02);

  // Head + the M1 HELMET (an actual head under an actual dome).
  add(upper, new THREE.CylinderGeometry(0.085, 0.1, 0.1, 10), 0, 1.74, 0.03);
  add(upper, ball(0.165), 0, 1.85, 0.04).scale.set(0.95, 1.05, 0.95);
  const dome = add(upper, ball(0.235), 0, 1.93, 0.04);
  dome.scale.set(1.05 * bw, 0.78, 1.15);
  add(upper, new THREE.CylinderGeometry(0.255, 0.28, 0.055, 14), 0, 1.85, 0.04);

  // ---- ARMS + RIFLE: one assembly, both hands on the gun, pivoted at the
  // chest so aiming swings the whole thing toward the sightline. ----
  const armsRifle = new THREE.Group();
  // Carried to the RIGHT of center so the gun reads in silhouette from the
  // chase camera — a hidden rifle might as well not exist.
  armsRifle.position.set(0.16 * bw, 1.5, 0.12);
  armsRifle.rotation.y = -0.14;                     // across the chest at rest
  upper.add(armsRifle);

  // The rifle itself: stock, receiver, barrel, magazine.
  add(armsRifle, box(0.09, 0.15, 0.34), 0.02, -0.04, -0.06, 0, 0, -0.06);   // stock
  add(armsRifle, box(0.11, 0.17, 0.5), 0, 0, 0.28);                          // receiver
  add(armsRifle, new THREE.CylinderGeometry(0.042, 0.042, rifleLength * 0.8, 8),
      0, 0.02, 0.53 + rifleLength * 0.4, Math.PI / 2);                       // barrel
  add(armsRifle, box(0.09, 0.24, 0.14), 0, -0.17, 0.22);                     // magazine
  // Right arm: shoulder down to the grip. Left arm: across to the forestock.
  add(armsRifle, cap(0.1 * bw, 0.26), 0.2 * bw, -0.04, -0.02, 1.15, 0, -0.5);
  add(armsRifle, cap(0.09 * bw, 0.3), -0.16 * bw, 0.02, 0.18, 1.25, 0, 0.55);
  add(armsRifle, ball(0.085), 0.04, -0.08, 0.12);                            // grip hand
  add(armsRifle, ball(0.085), -0.04, -0.02, 0.42);                           // forestock hand

  // ---- Class markings ----
  if (marking === 'cross') {
    const white = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.35, clearcoat: 0.4 });
    fadeMats.push(white);
    add(upper, box(0.22, 0.075, 0.03), 0, 1.47, 0.3 * bw, 0.08, 0, 0, white);
    add(upper, box(0.075, 0.22, 0.03), 0, 1.47, 0.3 * bw, 0.08, 0, 0, white);
  } else if (marking === 'leader') {
    add(upper, box(0.32, 0.4, 0.16), 0, 1.45, -0.27 * bw);        // radio pack
    const ant = add(upper, box(0.03, 0.7, 0.03), 0.11, 1.95, -0.29 * bw);
    ant.castShadow = false;
  }

  // ---- The walk cycle. amp 0 = molded action stance; amp 1 = full stride. ----
  group.userData.animate = (phase, amp) => {
    const sw = Math.sin(phase) * 0.5 * amp;
    lHip.rotation.x = -0.24 * (1 - amp) + sw;
    rHip.rotation.x = 0.28 * (1 - amp) - sw;
    upper.position.y = Math.abs(Math.cos(phase)) * 0.05 * amp;
    upper.rotation.z = Math.sin(phase) * 0.03 * amp;              // tiny shoulder roll
  };
  group.userData.animate(0, 0);                     // start in the molded stance

  // Muzzle: the barrel tip, figure-local (armsRifle sits in `upper` at y 1.5).
  group.userData.muzzleOffset = new THREE.Vector3(
    0.16 * bw, 1.52, 0.12 + 0.53 + rifleLength * 0.8);
  group.userData.rifle = armsRifle;
  group.userData.fadeMats = fadeMats;

  return group;
}
