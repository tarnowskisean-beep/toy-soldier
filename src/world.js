// world.js — THE HOUSE. Mission 1 of THE LONG WAY HOME: your toy plane has
// crashed into a stranger's living room. The house is a floor plan, not an
// arena: LIVING ROOM → HALLWAY → KITCHEN + STUDY off it → the FRONT DOOR.
//
// Everything here is data the rest of the game consumes: meshes for the eyes,
// `obstacles` (Box3) for movement/bullets/line-of-sight, `coverPoints` for the
// AI, `BOUNDS` for the walkable rect, and `exit` for the breach objective.

import * as THREE from 'three';
import { NavGrid } from './navgrid.js';

// Walkable interior (just inside the outer walls).
export const BOUNDS = { minX: -6.5, maxX: 153.5, minZ: -45, maxZ: 45 };

// Canvas-painted textures: no asset files, real surfaces. Each painter draws one
// tile; RepeatWrapping turns it into a floor's worth of material.
function canvasTex(size, draw, repX = 1, repY = 1) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repX, repY);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function woodTexture() {
  return canvasTex(512, (g, S) => {
    g.fillStyle = '#7a5028'; g.fillRect(0, 0, S, S);
    const rows = 6;
    for (let r = 0; r < rows; r++) {
      const y = (r / rows) * S, h = S / rows;
      const tone = 18 - Math.abs(((r * 73) % 37) - 18);
      g.fillStyle = `rgb(${112 + tone},${74 + tone * 0.7},${38 + tone * 0.4})`;
      g.fillRect(0, y, S, h);
      // grain
      g.strokeStyle = 'rgba(60,35,12,0.25)'; g.lineWidth = 1.5;
      for (let i = 0; i < 7; i++) {
        g.beginPath();
        const gy = y + (i + 0.5) * (h / 7) + Math.sin(r * 5 + i) * 2;
        g.moveTo(0, gy);
        for (let x = 0; x <= S; x += 32) g.lineTo(x, gy + Math.sin((x * 0.02) + r * 9 + i * 3) * 2.5);
        g.stroke();
      }
      // plank seam + butt joints
      g.fillStyle = 'rgba(35,18,5,0.85)'; g.fillRect(0, y, S, 3);
      const bx = ((r * 197) % S);
      g.fillRect(bx, y, 3, h);
    }
  }, 12, 8);
}

function rugTexture() {
  return canvasTex(512, (g, S) => {
    const cx = S / 2, cy = S / 2;
    g.fillStyle = '#6e1c18'; g.fillRect(0, 0, S, S);
    const ringspec = [
      [S * 0.485, '#caa24a', S * 0.02], [S * 0.44, '#2a2f55', S * 0.012],
      [S * 0.30, '#caa24a', S * 0.014], [S * 0.20, '#d8cfae', S * 0.01],
      [S * 0.09, '#2a2f55', S * 0.05],
    ];
    for (const [r, col, w] of ringspec) {
      g.strokeStyle = col; g.lineWidth = w;
      g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
    }
    // weave noise
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * S, y = Math.random() * S;
      g.fillStyle = `rgba(0,0,0,${Math.random() * 0.08})`;
      g.fillRect(x, y, 2, 1);
    }
  });
}

function wallTexture() {
  return canvasTex(256, (g, S) => {
    g.fillStyle = '#cfc5ae'; g.fillRect(0, 0, S, S);
    g.fillStyle = 'rgba(176,164,138,0.5)';
    for (let x = 0; x < S; x += 32) g.fillRect(x, 0, 14, S);   // wallpaper stripes
    for (let i = 0; i < 600; i++) {
      g.fillStyle = `rgba(110,100,80,${Math.random() * 0.05})`;
      g.fillRect(Math.random() * S, Math.random() * S, 2, 2);
    }
  }, 10, 1.4);
}

function fabricTexture(base) {
  return canvasTex(128, (g, S) => {
    g.fillStyle = base; g.fillRect(0, 0, S, S);
    for (let y = 0; y < S; y += 3) {
      g.fillStyle = `rgba(255,255,255,${y % 6 ? 0.03 : 0.05})`;
      g.fillRect(0, y, S, 1);
    }
    for (let x = 0; x < S; x += 3) {
      g.fillStyle = 'rgba(0,0,0,0.045)';
      g.fillRect(x, 0, 1, S);
    }
  }, 5, 5);
}

export function createWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x232c40);            // dusk through the windows
  scene.fog = new THREE.Fog(0x232c40, 130, 340);

  // --- Lighting: a SUNSET pouring through the west window + sky bounce + lamps.
  // Layered warm/cool light is what separates a lit set from a flat tech demo.
  scene.add(new THREE.HemisphereLight(0x46538a, 0x584432, 1.12));
  const sun = new THREE.DirectionalLight(0xffb469, 1.6);
  sun.position.set(-60, 46, 18);            // low in the west — long warm shadows
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -30; sun.shadow.camera.right = 170;
  sun.shadow.camera.top = 60;   sun.shadow.camera.bottom = -60;
  sun.shadow.camera.far = 320;
  sun.shadow.bias = -0.0004;
  scene.add(sun);

  const obstacles = [];
  const coverPoints = [];

  // Box helper: mesh + (optionally) an axis-aligned obstacle + cover points.
  const box = (w, h, d, x, z, color, { y = h / 2, obstacle = true, cover = false, rough = 0.85 } = {}) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color, roughness: rough })
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    if (obstacle) {
      obstacles.push(new THREE.Box3(
        new THREE.Vector3(x - w / 2, 0, z - d / 2),
        new THREE.Vector3(x + w / 2, h, z + d / 2)
      ));
    }
    if (cover) {
      const ox = w / 2 + 1.4, oz = d / 2 + 1.4;
      coverPoints.push(
        new THREE.Vector3(x + ox, 0, z), new THREE.Vector3(x - ox, 0, z),
        new THREE.Vector3(x, 0, z + oz), new THREE.Vector3(x, 0, z - oz)
      );
    }
    return mesh;
  };

  // --- Floors ---
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(165, 95),
    new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.62 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(73.5, 0, 0);
  floor.receiveShadow = true;
  scene.add(floor);

  // The area rug — the living room's centerpiece battlefield.
  const rug = new THREE.Mesh(
    new THREE.CircleGeometry(11, 48),
    new THREE.MeshStandardMaterial({ map: rugTexture(), roughness: 0.95 })
  );
  rug.rotation.x = -Math.PI / 2; rug.position.set(28, 0.02, 0); rug.scale.x = 1.4;
  rug.receiveShadow = true;
  scene.add(rug);

  // Kitchen tile patch.
  const tile = new THREE.Mesh(
    new THREE.PlaneGeometry(61, 45),
    new THREE.MeshStandardMaterial({ color: 0xa9a499, roughness: 0.7 })
  );
  tile.rotation.x = -Math.PI / 2; tile.position.set(123.5, 0.015, -23);
  tile.receiveShadow = true;
  scene.add(tile);

  // --- Walls (height 12). The floor plan. ---
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTexture(), roughness: 0.92 });
  const baseMat = new THREE.MeshStandardMaterial({ color: 0xe8e2d2, roughness: 0.6 });
  const wall = (w, d, x, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 12, d), wallMat);
    m.position.set(x, 6, z);
    m.castShadow = true; m.receiveShadow = true;
    scene.add(m);
    obstacles.push(new THREE.Box3(
      new THREE.Vector3(x - w / 2, 0, z - d / 2), new THREE.Vector3(x + w / 2, 12, z + d / 2)));
    // Baseboard: the little white strip that makes a box read as a ROOM.
    const b = new THREE.Mesh(new THREE.BoxGeometry(w + 0.16, 0.8, d + 0.16), baseMat);
    b.position.set(x, 0.4, z);
    b.receiveShadow = true;
    scene.add(b);
  };
  wall(1, 92, -7.5, 0);                       // west (behind the crash)
  wall(163, 1, 73.5, -46);                    // south
  wall(89.5, 1, 35.75, 46);                   // north, west of the front door (x ≤ 80.5)
  wall(66, 1, 121.5, 46);                     // north, east of the front door (x ≥ 88.5)
  wall(1, 92, 154.5, 0);                      // east
  wall(1, 60.5, 76, -15.75);                  // LR/hall divider, south of door (door z 14..22)
  wall(1, 24.5, 76, 34.25);                   // LR/hall divider, north of door
  wall(1, 18, 93, -37);                       // hall/east divider, south of kitchen door (door z -28..-20)
  wall(1, 40, 93, 0);                         // hall/east divider, between the doors
  wall(1, 18, 93, 37);                        // hall/east divider, north of study door (door z 20..28)
  wall(61.5, 1, 124.25, 0);                   // kitchen/study divider

  // --- THE CRASH SITE: your green toy plane, nose into the floorboards ---
  const planeMat = new THREE.MeshStandardMaterial({ color: 0x3f8f3f, roughness: 0.5 });
  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.1, 9.5, 14), planeMat);
  fuselage.position.set(-4.5, 2.6, -9);
  fuselage.rotation.z = 1.15; fuselage.rotation.y = 0.5;
  fuselage.castShadow = true;
  scene.add(fuselage);
  const wing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.22, 10.5), planeMat);
  wing.position.set(-3.8, 2.9, -8.6); wing.rotation.y = 0.5; wing.castShadow = true;
  scene.add(wing);
  const tailFin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.0, 1.4), planeMat);
  tailFin.position.set(-7.2, 4.2, -11.4); tailFin.castShadow = true;
  scene.add(tailFin);
  // One solid chunk of wreck = spawn cover.
  obstacles.push(new THREE.Box3(new THREE.Vector3(-7, 0, -11), new THREE.Vector3(-2, 4, -7)));
  coverPoints.push(new THREE.Vector3(-0.5, 0, -9), new THREE.Vector3(-4.5, 0, -5.5));
  box(1.3, 1.3, 1.3, 1.5, 7.5, 0x7a4a22, { cover: true });            // salvaged crate

  // --- LIVING ROOM furniture ---
  // Couch along the south wall — woven upholstery.
  const couchMat = new THREE.MeshStandardMaterial({ map: fabricTexture('#3e4a5c'), roughness: 0.95 });
  const couchPart = (w, h, d, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), couchMat);
    m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; scene.add(m);
    obstacles.push(new THREE.Box3(new THREE.Vector3(x - w/2, 0, z - d/2), new THREE.Vector3(x + w/2, y + h/2, z + d/2)));
  };
  couchPart(30, 4.5, 8, 26, 2.25, -41.5);
  couchPart(30, 10, 2.2, 26, 5, -44.6);
  couchPart(2.8, 7.2, 9, 10.9, 3.6, -41.5);
  couchPart(2.8, 7.2, 9, 41.1, 3.6, -41.5);
  // Coffee table over the rug: floating top (walk under it!), legs are cover.
  box(15, 0.8, 10.5, 28, 3, 0x2b1709, { y: 6.2, obstacle: false });
  for (const [lx, lz] of [[21.8, -1.3], [34.2, -1.3], [21.8, 7.3], [34.2, 7.3]])
    box(1.0, 5.8, 1.0, lx, lz, 0x2b1709, { cover: true });
  // Ottoman anchoring the right lane.
  box(8, 3.4, 6, 43, 27, 0x3e4a5c, { cover: true });
  // Toy blocks — bright plastic, man-high cover.
  const blockCols = [0x9a1812, 0x1a3a9a, 0x9a7612];
  [[11, -10, 1.5], [15, 6.5, 1.7], [19.5, -17, 1.4], [17.5, 21, 1.55], [34.5, -7, 1.6],
   [39, 9, 1.35], [42, -21, 1.8], [47, 18, 1.5], [51, -9, 1.45], [24.5, -29, 1.6],
   [54, 25, 1.4], [57, -24, 1.5]].forEach(([x, z, s], i) =>
    box(s, s, s, x, z, blockCols[i % 3], { cover: true, rough: 0.35 }));
  // Books: flat scatter (visual) + a stacked pair (hard cover) + the shelf row.
  box(3.2, 0.5, 2.2, 19, 14, 0x6e1c18, { obstacle: false });
  box(3.0, 0.45, 2.1, 36, -15, 0x1c5a2a, { obstacle: false });
  box(3.4, 1.1, 2.4, 47, -18, 0x1c5a2a, { cover: true });              // book stack
  box(1, 9.5, 12, 74.2, 0, 0x2b1709);                                  // bookshelf slab
  for (let b = 0; b < 5; b++)
    box(0.5, 3, 1.7, 72.5, -6 + b * 3, b % 2 ? 0x1c5a2a : 0x6e1c18, { cover: true });
  // Abandoned mid-field position.
  box(3.4, 0.85, 0.9, 44.5, -1.5, 0x8a7a4a, { cover: true });
  box(1.35, 1.35, 1.35, 43.5, 3.5, 0x7a4a22, { cover: true });
  // Tan emplacements before the hall door.
  box(0.9, 0.85, 3.4, 62.5, -13, 0x8a7a4a, { cover: true });
  box(0.9, 0.85, 3.4, 63, 0, 0x8a7a4a, { cover: true });
  box(0.9, 0.85, 3.4, 62.5, 13, 0x8a7a4a, { cover: true });
  box(1.35, 1.4, 1.35, 65, -6.5, 0x7a4a22, { cover: true });
  box(1.35, 1.4, 1.35, 65.2, 7, 0x7a4a22, { cover: true });

  // --- HALLWAY: console table + toy scatter ---
  box(1.8, 0.5, 7, 90.5, -5, 0x2b1709, { y: 5.0, obstacle: false });
  box(1, 5, 1, 90.5, -7.8, 0x2b1709, { cover: true });
  box(1, 5, 1, 90.5, -2.2, 0x2b1709, { cover: true });
  box(1.4, 1.4, 1.4, 81, -9, 0x9a1812, { cover: true, rough: 0.35 });
  box(1.5, 1.5, 1.5, 87.5, 6, 0x1a3a9a, { cover: true, rough: 0.35 });
  box(1.3, 1.3, 1.3, 82.5, 21, 0x9a7612, { cover: true, rough: 0.35 });
  box(3, 0.45, 2.1, 85.5, -25, 0x1c5a2a, { obstacle: false });

  // --- KITCHEN ---
  box(4, 14.5, 4.5, 149, -39, 0xcfc9bd);                               // fridge
  box(9, 0.7, 6, 120, -23, 0x2b1709, { y: 6.5, obstacle: false });     // table top
  for (const [lx, lz] of [[116.3, -25.2], [123.7, -25.2], [116.3, -20.8], [123.7, -20.8]])
    box(0.9, 6.4, 0.9, lx, lz, 0x2b1709, { cover: true });
  box(2.4, 3.8, 2.4, 106.5, -15, 0x2b1709, { cover: true });           // chair
  box(1.5, 1.5, 1.5, 115, -9, 0x1a3a9a, { cover: true, rough: 0.35 });
  box(1.6, 2.3, 1.6, 129, -8, 0x5a2018, { cover: true });              // pot/barrel
  box(1.3, 1.4, 1.3, 138, -33, 0x7a4a22, { cover: true });

  // --- STUDY ---
  box(10, 0.65, 5, 126, 23, 0x2b1709, { y: 6.2, obstacle: false });    // desk top
  for (const [lx, lz] of [[121.7, 21], [130.3, 21], [121.7, 25], [130.3, 25]])
    box(0.8, 6.2, 0.8, lx, lz, 0x2b1709, { cover: true });
  for (let b = 0; b < 3; b++)
    box(0.5, 3, 1.7, 112, 33 + b * 3, b % 2 ? 0x6e1c18 : 0x1c5a2a, { cover: true });
  box(2.8, 0.42, 2, 118, 15, 0x6e1c18, { obstacle: false });
  box(1.6, 1.6, 1.6, 136, 12, 0x9a7612, { cover: true, rough: 0.35 });
  box(1.3, 1.3, 1.3, 103, 26, 0x9a1812, { cover: true, rough: 0.35 });

  // --- SET DRESSING: the room has to feel LIVED IN ---
  // Floor lamp by the couch: pole, shade, and a warm pool of light.
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.4, 0.4, 16),
    new THREE.MeshStandardMaterial({ color: 0x3a2c1c, roughness: 0.5 }));
  lampBase.position.set(50, 0.2, -36); lampBase.castShadow = true; scene.add(lampBase);
  const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0x3a2c1c, roughness: 0.5 }));
  lampPole.position.set(50, 6.2, -36); lampPole.castShadow = true; scene.add(lampPole);
  const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.6, 3.2, 16, 1, true),
    new THREE.MeshStandardMaterial({ color: 0xf2dcae, roughness: 0.9, emissive: 0xffd9a0, emissiveIntensity: 0.55, side: THREE.DoubleSide }));
  lampShade.position.set(50, 12.2, -36); scene.add(lampShade);
  const lampLight = new THREE.PointLight(0xffc88a, 90, 46, 1.8);
  lampLight.position.set(50, 11, -36); scene.add(lampLight);
  obstacles.push(new THREE.Box3(new THREE.Vector3(48.9, 0, -37.1), new THREE.Vector3(51.1, 12, -34.9)));

  // A second lamp glow in the study so the far rooms aren't pitch black.
  const studyLight = new THREE.PointLight(0xffc88a, 36, 32, 1.8);
  studyLight.position.set(126, 9, 30); scene.add(studyLight);
  const kitchenLight = new THREE.PointLight(0xcfe0ff, 26, 30, 1.8);
  kitchenLight.position.set(122, 9, -24); scene.add(kitchenLight);

  // The WEST WINDOW the sunset pours through (the crash came through here too).
  const paneMat = new THREE.MeshBasicMaterial({ color: 0xffb469 });
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(11, 7), paneMat);
  pane.position.set(-6.9, 7, -9); pane.rotation.y = Math.PI / 2; scene.add(pane);
  for (const [w, h, y, z] of [[12, 0.7, 3.4, -9], [12, 0.7, 10.6, -9], [0.7, 8, 7, -14.6], [0.7, 8, 7, -3.4], [0.7, 8, 7, -9]]) {
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.6, h, w === 0.7 ? 0.7 : w),
      new THREE.MeshStandardMaterial({ color: 0x4a382c, roughness: 0.6 }));
    f.position.set(-6.8, y, z); scene.add(f);
  }

  // Picture frames on the south wall.
  for (const [x, art] of [[14, 0x35508a], [36, 0x8a6435], [58, 0x4a7a4a]]) {
    const fr = new THREE.Mesh(new THREE.BoxGeometry(5.4, 4.2, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x2b1a0c, roughness: 0.5 }));
    fr.position.set(x, 7.4, -45.3); scene.add(fr);
    const cv = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 3.2),
      new THREE.MeshStandardMaterial({ color: art, roughness: 0.9 }));
    cv.position.set(x, 7.4, -45.1); scene.add(cv);
  }

  // --- THE FRONT DOOR: glowing breach zone in the doorway ---
  const exit = { x: 84.5, z: 42.5, r: 4.5 };
  const glow = new THREE.Mesh(
    new THREE.CylinderGeometry(exit.r, exit.r, 0.12, 36),
    new THREE.MeshBasicMaterial({ color: 0x46ff6a, transparent: true, opacity: 0.3 })
  );
  glow.position.set(exit.x, 0.07, exit.z);
  scene.add(glow);
  // Cold night light spilling in through the open door.
  const night = new THREE.PointLight(0x6a86ff, 18, 30);
  night.position.set(84.5, 5, 45);
  scene.add(night);
  // The garrison's foyer emplacements (and the player's approach cover).
  box(1.4, 1.4, 1.4, 79, 37, 0x9a1812, { cover: true, rough: 0.35 });
  box(1.4, 1.4, 1.4, 90, 37, 0x1a3a9a, { cover: true, rough: 0.35 });
  box(3.2, 0.85, 0.9, 84.5, 37.5, 0x8a7a4a, { cover: true });

  // --- MISSION PROPS ---
  // Supply drops: the plane's cargo, scattered across the house. A green
  // crate over a soft glow ring (bobbed/pulsed by the mission runner).
  const supplyMat = new THREE.MeshStandardMaterial({ color: 0x2f6b2f, roughness: 0.4 });
  const supplies = [];
  for (const [sx, sz] of [[89.5, -8], [132, -36], [126, 13]]) {
    const crate = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.0, 1.1), supplyMat);
    crate.position.set(sx, 0.8, sz);
    crate.castShadow = true;
    scene.add(crate);
    const ring = new THREE.Mesh(
      new THREE.CylinderGeometry(1.7, 1.7, 0.1, 24),
      new THREE.MeshBasicMaterial({ color: 0x6aff8a, transparent: true, opacity: 0.3 })
    );
    ring.position.set(sx, 0.05, sz);
    scene.add(ring);
    supplies.push({ x: sx, z: sz, crate, ring, taken: false });
  }

  // The tan FIELD RADIO in the study — the house's alarm. Olive box, whip
  // antenna, a blinking call lamp. Shoot it (loud) or smash it (quiet).
  const radioGroup = new THREE.Group();
  const radioMat = new THREE.MeshStandardMaterial({ color: 0x5c5a3a, roughness: 0.5 });
  const radioBody = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.15, 0.95), radioMat);
  radioBody.position.y = 0.58;
  radioBody.castShadow = true;
  radioGroup.add(radioBody);
  const antenna = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.4, 0.06), radioMat);
  antenna.position.set(0.62, 2.2, 0);
  radioGroup.add(antenna);
  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xff4030 })
  );
  lamp.position.set(-0.55, 1.25, 0.3);
  radioGroup.add(lamp);
  radioGroup.position.set(136, 0, 28);
  scene.add(radioGroup);
  const radio = { pos: new THREE.Vector3(136, 0, 28), alive: true, hp: 30, group: radioGroup, lamp };

  // Bake the walkability grid AFTER all furniture is placed — every AI
  // routes around the house with this.
  const nav = new NavGrid(BOUNDS, obstacles);

  return { scene, obstacles, coverPoints, exit, exitGlow: glow, nav, supplies, radio };
}
