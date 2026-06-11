// figure.js — a SOLDIER, not a chunk: Conflict-Desert-Storm-style military
// proportions molded in glossy plastic.
//
// What makes a figure read HUMAN:
//   - lean proportions (~7 heads tall), a torso that tapers to the waist
//   - a real neck and a fitted helmet over an actual head
//   - a combat vest (the military silhouette is gear, not muscles)
//   - TWO-SEGMENT LEGS: the thigh swings and the KNEE flexes on the
//     back-swing — knee articulation is the human-walk signature
//   - the rifle stock at the shoulder, both hands on the gun
//
// The figure exposes:
//   userData.muzzleOffset — figure-local muzzle tip (bullet spawns)
//   userData.rifle        — the arms+rifle assembly (ADS swings/raises it)
//   userData.rifleHomeY   — the assembly's rest height
//   userData.fadeMats     — materials to ghost when blocking the camera
//   userData.animate(phase, amp) — walk cycle (phase = distance walked,
//        amp 0..1 blends molded action stance ↔ full stride)

import * as THREE from 'three';

export function createFigure(color, opts = {}) {
  const rifleLength = (opts.rifleLength ?? 0.9) + 0.5;
  const bulky = opts.bulky ?? false;
  const marking = opts.marking ?? 'none';
  const bw = bulky ? 1.18 : 1;

  const group = new THREE.Group();
  // ONE glossy plastic for everything — clearcoat is what reads as "molded".
  const mat = new THREE.MeshPhysicalMaterial({
    color, roughness: 0.3, metalness: 0,
    clearcoat: 0.55, clearcoatRoughness: 0.3,
  });
  // Gear (vest, helmet) in a slightly darker shade of the same plastic —
  // tone-on-tone keeps the army-man mold language but draws the silhouette.
  const gear = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color).multiplyScalar(0.78),
    roughness: 0.42, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.4,
  });
  const fadeMats = [mat, gear];

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

  // ---- LEGS: hip pivot → thigh → KNEE pivot → shin + boot. ----
  const makeLeg = (side) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.155 * bw, 1.06, 0);
    add(hip, cap(0.11 * bw, 0.3), 0, -0.22, 0);                    // thigh
    const knee = new THREE.Group();
    knee.position.set(0, -0.46, 0);
    add(knee, cap(0.085, 0.28), 0, -0.18, 0.005);                  // shin
    add(knee, box(0.2, 0.15, 0.34), 0, -0.45, 0.06, undefined, undefined, undefined, gear); // boot
    hip.add(knee);
    group.add(hip);
    return { hip, knee };
  };
  const lLeg = makeLeg(-1);
  const rLeg = makeLeg(1);

  // ---- UPPER BODY (bobs as one piece while running) ----
  const upper = new THREE.Group();
  group.add(upper);

  add(upper, box(0.34 * bw, 0.24, 0.26), 0, 1.18, 0);              // pelvis
  add(upper, box(0.29 * bw, 0.26, 0.23), 0, 1.4, 0.01);            // waist (the taper)
  const chest = add(upper, box(0.42 * bw, 0.34, 0.28), 0, 1.61, 0.02);
  chest.rotation.x = 0.05;                                         // slight lean
  // COMBAT VEST: the military read — a gear shell wrapping the chest.
  add(upper, box(0.46 * bw, 0.3, 0.34), 0, 1.57, 0.02, 0.05, 0, 0, gear);
  add(upper, box(0.18, 0.1, 0.06), -0.1 * bw, 1.62, 0.2, 0, 0, 0, gear);   // chest pouch
  add(upper, box(0.18, 0.1, 0.06), 0.1 * bw, 1.5, 0.2, 0, 0, 0, gear);     // chest pouch
  add(upper, ball(0.105 * bw), -0.255 * bw, 1.74, 0.01);           // shoulders
  add(upper, ball(0.105 * bw), 0.255 * bw, 1.74, 0.01);

  // Neck, head, FITTED helmet (a helmet sits ON a head, it isn't the head).
  add(upper, new THREE.CylinderGeometry(0.065, 0.075, 0.12, 10), 0, 1.8, 0.02);
  add(upper, ball(0.145), 0, 1.93, 0.03).scale.set(0.92, 1.04, 0.95);
  const dome = add(upper, ball(0.185), 0, 1.99, 0.03, 0, 0, 0, gear);
  dome.scale.set(1.06 * bw, 0.74, 1.12);
  add(upper, new THREE.CylinderGeometry(0.2, 0.215, 0.04, 14), 0, 1.925, 0.03, 0, 0, 0, gear);
  // Class-colored helmet band — the in-world twin of the HUD ring color.
  if (opts.bandColor) {
    const bandMat = new THREE.MeshStandardMaterial({ color: opts.bandColor, roughness: 0.4 });
    fadeMats.push(bandMat);
    add(upper, new THREE.CylinderGeometry(0.195, 0.205, 0.06, 14), 0, 1.965, 0.03, 0, 0, 0, bandMat);
  }

  // ---- ARMS + RIFLE: one assembly, stock at the shoulder. ----
  const armsRifle = new THREE.Group();
  armsRifle.position.set(0.16 * bw, 1.6, 0.14);
  armsRifle.rotation.y = -0.14;                     // across the chest at rest
  upper.add(armsRifle);

  add(armsRifle, box(0.08, 0.14, 0.3), 0.01, -0.04, -0.08, 0, 0, -0.08);    // stock
  add(armsRifle, box(0.1, 0.15, 0.46), 0, 0, 0.24);                          // receiver
  add(armsRifle, new THREE.CylinderGeometry(0.038, 0.038, rifleLength * 0.8, 8),
      0, 0.02, 0.49 + rifleLength * 0.4, Math.PI / 2);                       // barrel
  add(armsRifle, box(0.08, 0.2, 0.12), 0, -0.15, 0.18);                      // magazine
  // Right arm: shoulder to the grip. Left arm: across to the forestock.
  add(armsRifle, cap(0.085 * bw, 0.24), 0.16 * bw, -0.02, -0.04, 1.2, 0, -0.55);
  add(armsRifle, cap(0.08 * bw, 0.28), -0.14 * bw, 0.02, 0.16, 1.3, 0, 0.6);
  add(armsRifle, ball(0.075), 0.03, -0.07, 0.1);                             // grip hand
  add(armsRifle, ball(0.075), -0.03, -0.01, 0.38);                           // forestock hand

  // ---- Class markings ----
  if (marking === 'cross') {
    const white = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.35, clearcoat: 0.4 });
    fadeMats.push(white);
    add(upper, box(0.18, 0.06, 0.03), 0, 1.62, 0.21 * bw, 0.05, 0, 0, white);
    add(upper, box(0.06, 0.18, 0.03), 0, 1.62, 0.21 * bw, 0.05, 0, 0, white);
  } else if (marking === 'leader') {
    add(upper, box(0.26, 0.34, 0.14), 0, 1.56, -0.24 * bw, 0, 0, 0, gear);   // radio pack
    const ant = add(upper, box(0.025, 0.6, 0.025), 0.09, 1.98, -0.26 * bw);
    ant.castShadow = false;
  }

  // ---- The walk cycle: thighs swing, KNEES flex on the back-swing. ----
  group.userData.animate = (phase, amp) => {
    const swL = Math.sin(phase), swR = Math.sin(phase + Math.PI);
    lLeg.hip.rotation.x = -0.22 * (1 - amp) + swL * 0.5 * amp;
    rLeg.hip.rotation.x = 0.26 * (1 - amp) + swR * 0.5 * amp;
    lLeg.knee.rotation.x = 0.1 * (1 - amp) + (0.12 + Math.max(0, -swL) * 0.75) * amp;
    rLeg.knee.rotation.x = 0.32 * (1 - amp) + (0.12 + Math.max(0, -swR) * 0.75) * amp;
    upper.position.y = Math.abs(Math.cos(phase)) * 0.04 * amp;
    upper.rotation.z = Math.sin(phase) * 0.025 * amp;
  };
  group.userData.animate(0, 0);                     // start in the molded stance

  // Muzzle: the barrel tip, figure-local (armsRifle sits in `upper` at y 1.6).
  group.userData.muzzleOffset = new THREE.Vector3(
    0.16 * bw, 1.62, 0.14 + 0.49 + rifleLength * 0.8);
  group.userData.rifle = armsRifle;
  group.userData.rifleHomeY = armsRifle.position.y;
  group.userData.fadeMats = fadeMats;

  return group;
}
