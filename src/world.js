// world.js — the static environment: scene, lights, ground, and some cover.
//
// In Three.js a "scene" is just a container holding everything you can see.
// The renderer draws the scene from the camera's point of view, 60x/second.

import * as THREE from 'three';

export const ARENA = 60; // half-width of the play area, in world units.

export function createWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9fd0ff);           // sky blue
  scene.fog = new THREE.Fog(0x9fd0ff, 60, 140);           // distance haze

  // --- Lighting ---
  // Ambient light fills shadows so nothing is pure black.
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  // A directional light acts like the sun and casts shadows.
  const sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(40, 60, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -ARENA; sun.shadow.camera.right = ARENA;
  sun.shadow.camera.top = ARENA;   sun.shadow.camera.bottom = -ARENA;
  sun.shadow.camera.far = 200;
  scene.add(sun);

  // --- Ground ---
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(ARENA * 2, ARENA * 2),
    new THREE.MeshStandardMaterial({ color: 0x6f9f4f, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;  // planes start vertical; lay it flat
  ground.receiveShadow = true;
  scene.add(ground);

  // --- Cover: a scatter of wooden crates you can hide behind ---
  // obstacles   = bounding boxes for movement/bullet/line-of-sight collision
  // coverPoints = standing spots beside each crate the enemy AI can fire from
  const obstacles = [];
  const coverPoints = [];
  const crateMat = new THREE.MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.9 });
  const cratePositions = [
    [12, 8], [-15, 14], [20, -10], [-22, -18], [4, 25], [-8, -28], [30, 18],
  ];
  for (const [x, z] of cratePositions) {
    const size = 3 + (Math.abs(x * z) % 3);   // deterministic, varied sizes
    const crate = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), crateMat);
    crate.position.set(x, size / 2, z);
    crate.castShadow = true;
    crate.receiveShadow = true;
    scene.add(crate);
    obstacles.push(new THREE.Box3().setFromObject(crate));

    // Four cover spots, one off each face, just outside the crate.
    const off = size / 2 + 1.6;
    coverPoints.push(
      new THREE.Vector3(x + off, 0, z),
      new THREE.Vector3(x - off, 0, z),
      new THREE.Vector3(x, 0, z + off),
      new THREE.Vector3(x, 0, z - off),
    );
  }

  return { scene, obstacles, coverPoints };
}
