// world.js — THE HOUSE. Mission 1 of THE LONG WAY HOME: your toy plane has
// crashed into a stranger's living room. The house is a floor plan, not an
// arena: LIVING ROOM → HALLWAY → KITCHEN + STUDY off it → the FRONT DOOR.
//
// Everything here is data the rest of the game consumes: meshes for the eyes,
// `obstacles` (Box3) for movement/bullets/line-of-sight, `coverPoints` for the
// AI, `BOUNDS` for the walkable rect, and `exit` for the breach objective.

import * as THREE from 'three';

// Walkable interior (just inside the outer walls).
export const BOUNDS = { minX: -6.5, maxX: 153.5, minZ: -45, maxZ: 45 };

export function createWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x232c40);            // dusk through the windows
  scene.fog = new THREE.Fog(0x232c40, 130, 340);

  // --- Lighting: warm indoor key + soft fill ---
  scene.add(new THREE.AmbientLight(0xfff2e0, 0.52));
  const sun = new THREE.DirectionalLight(0xffe8c8, 1.05);
  sun.position.set(50, 70, 25);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -30; sun.shadow.camera.right = 110;
  sun.shadow.camera.top = 60;   sun.shadow.camera.bottom = -60;
  sun.shadow.camera.far = 250;
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
    new THREE.MeshStandardMaterial({ color: 0x7d5230, roughness: 0.9 })   // hardwood
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(73.5, 0, 0);
  floor.receiveShadow = true;
  scene.add(floor);

  // The area rug — the living room's centerpiece battlefield.
  const rug = new THREE.Mesh(
    new THREE.CircleGeometry(11, 40),
    new THREE.MeshStandardMaterial({ color: 0x6e1c18, roughness: 1 })
  );
  rug.rotation.x = -Math.PI / 2; rug.position.set(28, 0.02, 0); rug.scale.x = 1.4;
  rug.receiveShadow = true;
  scene.add(rug);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(6.5, 7.4, 40),
    new THREE.MeshStandardMaterial({ color: 0xb9912f, roughness: 1 })
  );
  ring.rotation.x = -Math.PI / 2; ring.position.set(28, 0.03, 0); ring.scale.x = 1.4;
  scene.add(ring);

  // Kitchen tile patch.
  const tile = new THREE.Mesh(
    new THREE.PlaneGeometry(61, 45),
    new THREE.MeshStandardMaterial({ color: 0xa9a499, roughness: 0.7 })
  );
  tile.rotation.x = -Math.PI / 2; tile.position.set(123.5, 0.015, -23);
  tile.receiveShadow = true;
  scene.add(tile);

  // --- Walls (height 12). The floor plan. ---
  const WALL = 0xcdc4b2;
  const wall = (w, d, x, z) => box(w, 12, d, x, z, WALL, { cover: false, rough: 0.95 });
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
  // Couch along the south wall.
  box(30, 4.5, 8, 26, -41.5, 0x3e4a5c);
  box(30, 10, 2.2, 26, -44.6, 0x3e4a5c);
  box(2.8, 7.2, 9, 10.9, -41.5, 0x3e4a5c);
  box(2.8, 7.2, 9, 41.1, -41.5, 0x3e4a5c);
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

  return { scene, obstacles, coverPoints, exit, exitGlow: glow };
}
