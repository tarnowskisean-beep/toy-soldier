// figure.js — a SOLDIER molded in glossy plastic: Conflict-Desert-Storm
// proportions, army-man surfacing. The whole figure reads as ONE injection
// mold: rounded limbs, a tapered torso, a pot helmet with a rolled brim, and
// a rifle in the same plastic as the man carrying it.
//
// What makes a figure read HUMAN:
//   - lean proportions (~7 heads tall), a torso that tapers to the waist
//   - a real neck and a fitted helmet over an actual head (plus a nose!)
//   - a combat vest and web belt (the military silhouette is gear, not muscles)
//   - TWO-SEGMENT LEGS: the thigh swings and the KNEE flexes on the
//     back-swing — knee articulation is the human-walk signature
//   - the rifle stock at the shoulder, both hands on the gun
//
// What makes it read MOLDED PLASTIC:
//   - capsules, spheres and cones instead of boxes wherever the body curves
//   - one glossy clearcoat material for flesh+fatigues, a matte-darker shade
//     for gear — tone-on-tone, like a two-shot mold
//   - the rifle in the SAME plastic (a real army man is one piece of green)
//
// The figure exposes:
//   userData.muzzleOffset — figure-local muzzle tip (bullet spawns)
//   userData.rifle        — the arms+rifle assembly (ADS swings/raises it)
//   userData.rifleHomeY   — the assembly's rest height
//   userData.fadeMats     — materials to ghost when blocking the camera
//   userData.animate(phase, amp) — walk cycle (phase = distance walked,
//        amp 0..1 blends molded action stance ↔ full stride)
//   userData.setRifleSide(±1) — mirror the carry to either shoulder

import * as THREE from 'three';

export function createFigure(color, opts = {}) {
  const rifleLength = (opts.rifleLength ?? 0.9) + 0.5;
  const bulky = opts.bulky ?? false;
  const marking = opts.marking ?? 'none';
  const bw = bulky ? 1.18 : 1;

  const group = new THREE.Group();
  // ONE glossy plastic for everything — clearcoat is what reads as "molded".
  const mat = new THREE.MeshPhysicalMaterial({
    color, roughness: 0.26, metalness: 0,
    clearcoat: 0.7, clearcoatRoughness: 0.22,
  });
  // Gear (vest, helmet, boots) in a slightly darker shade of the same
  // plastic — tone-on-tone keeps the army-man mold language but draws the
  // silhouette.
  const gear = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color).multiplyScalar(0.78),
    roughness: 0.38, metalness: 0, clearcoat: 0.45, clearcoatRoughness: 0.35,
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
  const cap = (r, len) => new THREE.CapsuleGeometry(r, len, 4, 12);
  const ball = (r) => new THREE.SphereGeometry(r, 14, 11);
  const tube = (r, len, r2) => new THREE.CylinderGeometry(r, r2 ?? r, len, 12);

  // ---- LEGS: hip pivot → thigh → KNEE pivot → shin + molded boot. ----
  const makeLeg = (side) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.16 * bw, 1.06, 0);
    add(hip, cap(0.115 * bw, 0.3), 0, -0.22, 0);                   // thigh
    const knee = new THREE.Group();
    knee.position.set(0, -0.46, 0);
    add(knee, ball(0.095 * bw), 0, 0.01, 0);                       // molded knee
    add(knee, cap(0.082, 0.26), 0, -0.18, 0.005);                  // shin
    // Boot: a rounded capsule lying toe-forward, in gear plastic.
    add(knee, cap(0.082, 0.17), 0, -0.45, 0.08, Math.PI / 2, 0, 0, gear);
    hip.add(knee);
    group.add(hip);
    return { hip, knee };
  };
  const lLeg = makeLeg(-1);
  const rLeg = makeLeg(1);

  // ---- UPPER BODY (bobs as one piece while running) ----
  const upper = new THREE.Group();
  group.add(upper);

  // Hips, web belt, and a torso that TAPERS — waist to chest, smooth cone.
  const pelvis = add(upper, ball(0.2 * bw), 0, 1.17, 0);
  pelvis.scale.set(1.05, 0.72, 0.82);
  add(upper, tube(0.185 * bw, 0.08), 0, 1.3, 0, 0, 0, 0, gear);    // web belt
  const torso = add(upper, tube(0.22 * bw, 0.46, 0.155 * bw), 0, 1.55, 0.01);
  torso.scale.z = 0.8;                                             // oval chest
  torso.rotation.x = 0.04;                                         // slight lean
  // COMBAT VEST: a gear shell wrapping the chest, with two pouches.
  const vest = add(upper, tube(0.245 * bw, 0.3, 0.21 * bw), 0, 1.58, 0.015, 0.04, 0, 0, gear);
  vest.scale.z = 0.82;
  add(upper, box(0.16, 0.11, 0.06), -0.09 * bw, 1.62, 0.19, 0.05, 0, 0, gear); // pouch
  add(upper, box(0.16, 0.11, 0.06), 0.09 * bw, 1.5, 0.19, 0.05, 0, 0, gear);   // pouch
  add(upper, ball(0.105 * bw), -0.255 * bw, 1.74, 0.01);           // shoulders
  add(upper, ball(0.105 * bw), 0.255 * bw, 1.74, 0.01);

  // Neck and head — with a FACE. A toy reads human from three marks: eye
  // sockets in the helmet's shadow, a nose, and a grim little mouth. Molded
  // in a darker shade of the same plastic, like paint that never chips.
  const face = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color).multiplyScalar(0.1),
    roughness: 0.4, metalness: 0, clearcoat: 0.3,
  });
  fadeMats.push(face);
  add(upper, tube(0.07, 0.12, 0.062), 0, 1.8, 0.02);
  const head = add(upper, ball(0.145), 0, 1.93, 0.03);
  head.scale.set(0.92, 1.05, 0.96);
  add(upper, ball(0.032), 0, 1.905, 0.165);                        // nose
  // Eyes ride ON the head surface, just under the brim's shadow line —
  // buried even a few hundredths inside the ellipsoid and they vanish.
  const eyeL = add(upper, ball(0.033), -0.054, 1.928, 0.164, 0, 0, 0, face);
  eyeL.scale.set(1.15, 0.95, 0.5);
  const eyeR = add(upper, ball(0.033), 0.054, 1.928, 0.164, 0, 0, 0, face);
  eyeR.scale.set(1.15, 0.95, 0.5);
  add(upper, box(0.054, 0.014, 0.014), 0, 1.856, 0.162, 0, 0, 0, face); // the grim mouth
  // Chin strap: a half-ring down the cheeks and under the jaw.
  add(upper, new THREE.TorusGeometry(0.148, 0.015, 6, 14, Math.PI),
      0, 1.92, 0.045, 0, 0, Math.PI, gear);
  // POT HELMET: dome + a rolled brim at FOREHEAD height (a brim at eye level
  // hides the eyes it should be shading) + the class band above it.
  const dome = add(upper, ball(0.185), 0, 2.0, 0.03, 0, 0, 0, gear);
  dome.scale.set(1.06 * bw, 0.76, 1.13);
  const brim = add(upper, new THREE.TorusGeometry(0.178, 0.03, 8, 20), 0, 1.952, 0.03, Math.PI / 2, 0, 0, gear);
  brim.scale.set(1.06 * bw, 1.18, 1);
  if (opts.bandColor) {
    const bandMat = new THREE.MeshStandardMaterial({ color: opts.bandColor, roughness: 0.4 });
    fadeMats.push(bandMat);
    add(upper, tube(0.193, 0.055, 0.2), 0, 1.995, 0.03, 0, 0, 0, bandMat)
      .scale.set(1.02 * bw, 1, 1.1);
  }

  // ---- ARMS + RIFLE: one assembly CARRIED AT THE SHOULDER — stock in the
  // pocket, angled across and muzzle-down at low-ready; aiming raises it
  // level beside the cheek. A soldier carries his weapon on a shoulder, not
  // bolted to his sternum. The rifle is the SAME plastic as the man. ----
  const armsRifle = new THREE.Group();
  armsRifle.position.set(0.26 * bw, 1.6, 0.12);
  armsRifle.rotation.y = -0.25;                     // low-ready across the body
  armsRifle.rotation.x = 0.12;                      // muzzle dipped
  upper.add(armsRifle);

  // The rifle, piece by piece — a real silhouette at TOY proportions:
  // army-man molds exaggerate the weapon, and a scale-true barrel vanishes
  // at gameplay distance.
  const stk = add(armsRifle, box(0.09, 0.14, 0.34), 0.005, -0.06, -0.14, -0.22); // stock, dropped
  stk.scale.x = 0.92;
  add(armsRifle, box(0.1, 0.19, 0.06), 0.005, -0.095, -0.3, -0.22);              // butt plate
  add(armsRifle, box(0.11, 0.16, 0.5), 0, 0, 0.18);                               // receiver
  add(armsRifle, box(0.07, 0.16, 0.09), 0, -0.13, 0.06, 0.35);                    // pistol grip
  add(armsRifle, box(0.06, 0.06, 0.04), 0, 0.105, 0.05);                          // rear sight
  add(armsRifle, box(0.09, 0.24, 0.13), 0, -0.17, 0.25, 0.28);                    // magazine, raked
  // Handguard + barrel out to the true muzzle (bullets spawn at the tip).
  add(armsRifle, cap(0.068, 0.24), 0, 0.004, 0.52, Math.PI / 2);                  // handguard
  const tipZ = 0.49 + rifleLength * 0.8;
  const barLen = tipZ - 0.6;
  add(armsRifle, tube(bulky ? 0.055 : 0.042, barLen), 0, 0.012, 0.6 + barLen / 2, Math.PI / 2);
  add(armsRifle, box(0.025, 0.1, 0.03), 0, 0.075, tipZ - 0.12);                   // front sight
  if (bulky) {                                                                     // the MG muzzle
    add(armsRifle, tube(0.07, 0.11, 0.058), 0, 0.012, tipZ - 0.05, Math.PI / 2);
  }
  if (rifleLength > 1.9) {                                                         // sniper glass
    add(armsRifle, tube(0.05, 0.24), 0, 0.15, 0.2, Math.PI / 2, 0, 0, gear);
    add(armsRifle, tube(0.06, 0.035), 0, 0.15, 0.33, Math.PI / 2, 0, 0, gear);
  }
  // Right arm: shoulder → bent elbow → grip, tucked along the body. Left
  // arm: across the chest to the forestock. Elbow balls keep the joints
  // molded; everything HUGS the rifle line — splayed arms read mantis.
  add(armsRifle, cap(0.08 * bw, 0.16), 0.05 * bw, 0.02, -0.06, 1.25, 0, -0.3);
  add(armsRifle, ball(0.075 * bw), 0.09 * bw, -0.07, -0.02);                      // right elbow
  add(armsRifle, cap(0.068 * bw, 0.13), 0.05 * bw, -0.1, 0.02, 1.5, 0, 0.55);
  add(armsRifle, ball(0.075), 0.005, -0.12, 0.07);                                // grip hand
  add(armsRifle, cap(0.078 * bw, 0.2), -0.33 * bw, 0.07, 0.06, 1.15, 0, 1.0);
  add(armsRifle, ball(0.07 * bw), -0.2 * bw, 0.0, 0.16);                          // left elbow
  add(armsRifle, cap(0.065 * bw, 0.16), -0.1 * bw, -0.01, 0.27, 1.5, 0, 0.45);
  add(armsRifle, ball(0.075), -0.01, 0.0, 0.4);                                   // forestock hand

  // ---- Class markings ----
  if (marking === 'cross') {
    const white = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.35, clearcoat: 0.4 });
    fadeMats.push(white);
    // Proud of the vest face, or the mold swallows it.
    add(upper, box(0.17, 0.055, 0.04), 0, 1.62, 0.225 * bw, 0.05, 0, 0, white);
    add(upper, box(0.055, 0.17, 0.04), 0, 1.62, 0.225 * bw, 0.05, 0, 0, white);
  } else if (marking === 'leader') {
    const pack = add(upper, box(0.24, 0.32, 0.13), 0, 1.56, -0.23 * bw, 0, 0, 0, gear);
    pack.scale.x = 0.95;
    const ant = add(upper, tube(0.012, 0.6), 0.09, 1.98, -0.25 * bw);
    ant.castShadow = false;
  }

  // ---- The walk cycle. ----
  // The human-gait essentials, in order of importance:
  //   1. The knee bends through the FORWARD swing (clearing the ground) and
  //      lands nearly straight. A knee that only kicks up behind, with a
  //      stiff leg thrown forward, is a goose-step — the old bug.
  //   2. The body RIDES the steps: highest when vaulting over a straight
  //      stance leg, shoulders counter-twisting gently against the hips,
  //      leaning slightly into the move.
  // `crouch` (0..1) is a POSE, not a squash: thighs fold up, knees bend
  // deep, hips and torso DROP, the body hunches, the stride shortens.
  group.userData.animate = (phase, amp, crouch = 0) => {
    const stride = (0.55 - crouch * 0.25) * amp;
    const drop = crouch * 0.42;
    const leg = (L, p, stanceHip, stanceKnee, fold, foldKnee) => {
      L.hip.rotation.x = stanceHip * (1 - amp) + Math.sin(p) * stride - crouch * fold;
      // cos(p - 0.2): zero through the stance, rising through the swing,
      // peaking just past mid-swing — a soft knee at landing, like people.
      L.knee.rotation.x = stanceKnee * (1 - amp)
        + (0.08 + Math.max(0, Math.cos(p - 0.2)) * (0.95 - crouch * 0.4)) * amp
        + crouch * foldKnee;
      L.hip.position.y = 1.06 - drop;
    };
    leg(lLeg, phase, -0.22, 0.1, 0.95, 1.5);
    leg(rLeg, phase + Math.PI, 0.26, 0.32, 1.05, 1.45);
    upper.position.y = Math.abs(Math.cos(phase)) * (0.05 - crouch * 0.025) * amp - drop;
    upper.rotation.y = Math.sin(phase) * 0.07 * amp;   // shoulder counter-twist
    upper.rotation.z = Math.sin(phase) * 0.03 * amp;   // step sway
    upper.rotation.x = crouch * 0.12 + 0.05 * amp * (1 - crouch);  // hunch / lean-in
  };
  group.userData.animate(0, 0);                     // start in the molded stance

  // Muzzle: the barrel tip, figure-local (armsRifle sits in `upper` at y 1.6).
  group.userData.muzzleOffset = new THREE.Vector3(
    0.26 * bw, 1.62, 0.12 + 0.49 + rifleLength * 0.8);
  group.userData.rifle = armsRifle;
  group.userData.rifleHomeY = armsRifle.position.y;
  group.userData.fadeMats = fadeMats;

  // The carry can MIRROR to either shoulder so the rifle always rides the
  // side the aim camera looks over (a right-shoulder camera with a
  // left-shoulder gun reads wrong from behind). `screenSide` is the camera's
  // shoulder seen from the chase cam: +1 = screen-right = figure-local -x.
  // Negative scale mirrors the whole assembly; three.js corrects winding
  // and normals for mirrored matrices, so it's a true free mirror.
  group.userData.rifleSide = -1;                    // built at local +x = screen-left
  group.userData.setRifleSide = (screenSide) => {
    if (screenSide === group.userData.rifleSide) return;
    group.userData.rifleSide = screenSide;
    const lx = -0.26 * bw * screenSide;             // local x of the carrying shoulder
    armsRifle.position.x = lx;
    armsRifle.scale.x = screenSide === 1 ? -1 : 1;  // ±1, doubles as the yaw mirror sign
    group.userData.muzzleOffset.x = lx;             // bullets leave the VISIBLE muzzle
  };

  return group;
}
