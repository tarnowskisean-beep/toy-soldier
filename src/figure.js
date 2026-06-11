// figure.js — builds a classic PLASTIC ARMY MAN.
//
// What sells the icon isn't detail, it's the MOLD LANGUAGE: a single color of
// glossy plastic (rifle and helmet included), an M1 helmet dome, an action
// stance — one leg striding, torso leaned in, rifle held across the chest in
// both hands — and the flat oval base they're forever attached to.

import * as THREE from 'three';

// createFigure(color, opts)
//   color: the molded-plastic tint (green for squad, tan for enemy)
//   opts.rifleLength: visual gun length (also moves the muzzle)
//   opts.bulky: wider body for the Heavy
//   opts.marking: 'leader' | 'cross' | 'none'
export function createFigure(color, opts = {}) {
  const rifleLength = (opts.rifleLength ?? 0.9) + 0.55;   // toy rifles read LONG
  const bulky = opts.bulky ?? false;
  const marking = opts.marking ?? 'none';
  const bw = bulky ? 1.3 : 1;

  const group = new THREE.Group();
  // ONE glossy plastic for everything — that's the army-man look.
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.32, metalness: 0.0 });
  // Everything that must fade when this figure blocks the camera.
  const fadeMats = [mat];

  const add = (geo, x, y, z, rx = 0, ry = 0, rz = 0, m = mat) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.castShadow = true;
    group.add(mesh);
    return mesh;
  };
  const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);

  // --- The oval base (the signature) ---
  const base = add(new THREE.CylinderGeometry(0.62, 0.68, 0.16, 22), 0, 0.08, 0.05);
  base.scale.z = 1.55;

  // --- Legs: mid-stride. Left planted forward, right trailing. ---
  add(box(0.26 * bw, 0.92, 0.26), -0.18 * bw, 0.56, 0.16, -0.32);   // forward leg
  add(box(0.26 * bw, 0.92, 0.26),  0.18 * bw, 0.55, -0.16, 0.38);   // trailing leg
  add(box(0.52 * bw, 0.28, 0.36), 0, 1.0, 0);                        // hips

  // --- Torso, leaned into the advance ---
  add(box(0.62 * bw, 0.78, 0.42 * bw), 0, 1.42, 0.04, 0.12);

  // --- Head + the M1 HELMET (dome + brim) ---
  add(box(0.3, 0.3, 0.28), 0, 1.93, 0.06);
  const dome = add(new THREE.SphereGeometry(0.34, 12, 9), 0, 2.0, 0.05);
  dome.scale.set(1.04 * bw, 0.72, 1.18);
  add(new THREE.CylinderGeometry(0.38, 0.42, 0.07, 14), 0, 1.9, 0.05);

  // --- Rifle held ACROSS THE CHEST in both hands, muzzle forward ---
  // Same plastic as the body — molded in one piece, like the real toys.
  add(box(0.14, 0.2, rifleLength), 0.08 * bw, 1.45, 0.55, -0.04, -0.14);
  add(box(0.1, 0.3, 0.22), 0.05 * bw, 1.28, 0.3);                    // grip/magazine
  // Right arm: shoulder down-forward to the grip.
  add(box(0.17 * bw, 0.52, 0.17), 0.34 * bw, 1.4, 0.26, 0.95, 0, -0.3);
  // Left arm: reaching across to the forestock.
  add(box(0.16 * bw, 0.56, 0.16), -0.2 * bw, 1.47, 0.42, 1.1, 0, 0.45);

  // --- Class markings ---
  if (marking === 'cross') {
    const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    fadeMats.push(white);
    add(box(0.26, 0.09, 0.03), 0, 1.5, 0.26 * bw, 0.12, 0, 0, white);
    add(box(0.09, 0.26, 0.03), 0, 1.5, 0.26 * bw, 0.12, 0, 0, white);
  } else if (marking === 'leader') {
    add(box(0.34, 0.42, 0.18), 0, 1.5, -0.3 * bw);                   // radio pack
    const ant = add(box(0.035, 0.85, 0.035), 0.12, 2.05, -0.32 * bw);
    ant.castShadow = false;
  }

  // Muzzle: front tip of the rifle (local space), for spawning bullets.
  group.userData.muzzleOffset = new THREE.Vector3(0.08 * bw, 1.45, 0.55 + rifleLength / 2 + 0.08);
  group.userData.fadeMats = fadeMats;

  return group;
}
