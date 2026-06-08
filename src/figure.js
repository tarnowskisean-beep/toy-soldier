// figure.js — builds a plastic army man out of boxes, with per-class variations.
//
// One builder, many looks: pass options to change the gun length, body bulk, and
// add decorations (a medic cross, a leader's radio antenna). Still just grouped
// box meshes — that's all a "character model" really is under the hood.

import * as THREE from 'three';

// createFigure(color, opts)
//   color: the molded-plastic tint (green for squad, tan for enemy)
//   opts.rifleLength: length of the gun (default 0.9)
//   opts.bulky: wider torso/limbs for the Heavy (default false)
//   opts.marking: 'leader' | 'cross' | 'none'  (default 'none')
export function createFigure(color, opts = {}) {
  const rifleLength = opts.rifleLength ?? 0.9;
  const bulky = opts.bulky ?? false;
  const marking = opts.marking ?? 'none';

  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05 });

  const box = (w, h, d, x, y, z, m = mat) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    group.add(mesh);
    return mesh;
  };

  const bw = bulky ? 1.35 : 1; // body-width multiplier for the Heavy

  box(0.7 * bw, 0.9, 0.4 * bw, 0, 1.05, 0);     // torso
  box(0.45, 0.45, 0.45, 0, 1.75, 0);            // head
  box(0.24 * bw, 0.8, 0.24, -0.22 * bw, 0.4, 0);// left leg
  box(0.24 * bw, 0.8, 0.24,  0.22 * bw, 0.4, 0);// right leg
  box(0.18 * bw, 0.7, 0.18, -0.5 * bw, 1.1, 0); // left arm
  box(0.18 * bw, 0.7, 0.18,  0.5 * bw, 1.1, 0); // right arm

  // Rifle — thin dark box pointing forward (+Z). Length set by class.
  const gunMat = new THREE.MeshStandardMaterial({ color: 0x222018, roughness: 0.8 });
  const gunThick = bulky ? 0.18 : 0.12;
  box(gunThick, gunThick, rifleLength, 0.5 * bw, 1.1, 0.3 + rifleLength / 2, gunMat);

  // Signature flat oval base.
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.12, 20), mat);
  base.position.y = 0.06;
  base.scale.z = 1.5;
  base.castShadow = true;
  group.add(base);

  // --- Decorations ---
  if (marking === 'cross') {
    // White medic cross on the chest.
    const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    box(0.26, 0.09, 0.02, 0, 1.15, 0.205, white);
    box(0.09, 0.26, 0.02, 0, 1.15, 0.205, white);
  } else if (marking === 'leader') {
    // A thin radio antenna so you can spot the leader at a glance.
    const antenna = box(0.04, 0.9, 0.04, -0.25, 1.9, -0.18, gunMat);
    antenna.castShadow = false;
  }

  // Muzzle position (front tip of the rifle) for spawning bullets.
  group.userData.muzzleOffset = new THREE.Vector3(0.5 * bw, 1.1, 0.3 + rifleLength + 0.1);

  return group;
}
