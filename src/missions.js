// missions.js — THE LONG WAY HOME, as data.
//
// The campaign: your squad's toy plane is shot down and crashes into a stranger's
// house. Fight room to room, escape to the street, and make it back to the toy
// store. Each mission is one environment; missions end by REACHING somewhere.
//
// A mission is a STRUCTURE, not a route (see docs/MISSION_DESIGN_M1.md):
//   scatter      — who got thrown where in the crash (regroup act)
//   stages       — the objective chain; a 'multi' stage runs parts in parallel
//   enemyLayout  — the occupation force (type: 'rifle' | 'scout' | 'gunner')
//   reserve      — who comes through the front door if the alarm is raised

import { WORLD_SCALE } from './world.js';

export const MISSIONS = [
  {
    id: 'crash-site',
    name: 'CRASH SITE',
    world: 'house',
    sector: 'THE HOUSE — GROUND FLOOR, DUSK',
    briefing:
      'You came to at the wreck, ALONE. The HEAVY is down a few steps away — ' +
      'a tan already stands over him. The tan DRAGGED the MEDIC across the ' +
      'house to a holding pen in the KITCHEN corner. The SNIPER went to ground ' +
      'somewhere in the STUDY and is waiting for friendly boots. Get your men ' +
      'back. Recover the supply drops. Their field radio is in the STUDY: ' +
      'while it lives, any tan who marks you will run to call the porch ' +
      'reserve down on your head. Cut it. A plastic TANK patrols the kitchen ' +
      '— bullets bounce off it. Blow it open with the Heavy’s bazooka or ' +
      'the Sniper’s mines. Then breach the front door.',
    winText: 'ESCAPED THE HOUSE — ONTO THE PORCH',
    // Who ended up where (member index in SQUAD_ORDER). pose: 'downed' (flat,
    // hold E to wake), 'prison' (flat, in the pen), 'hiding' (crouched
    // upright, joins fast and healthy). A hider's `zone` is where the beacon
    // points until you're close — finding HIM is the search.
    scatter: [
      { member: 1, x: 4, z: 6 },                          // HEAVY — by the wreck
      { member: 3, x: 142, z: -38, pose: 'prison' },      // MEDIC — kitchen pen
      { member: 2, x: 114, z: 36, pose: 'hiding', zone: { x: 122, z: 28 } },  // SNIPER — somewhere in the study
    ],
    stages: [
      { type: 'regroup', text: 'FIND YOUR SQUAD',
        toast: 'Your men are scattered ACROSS THE HOUSE — follow the beacon' },
      { type: 'multi', toast: 'RECOVER THE SUPPLIES — CUT THE RADIO — KILL THAT TANK',
        parts: [
          { type: 'collect', text: 'SUPPLIES',
            items: [{ x: 89.5, z: -8 }, { x: 132, z: -36 }, { x: 126, z: 13 }] },
          { type: 'destroy', text: 'CUT THE ALARM' },
          { type: 'tank', text: 'BLOW UP THE TANK' },
        ] },
      { type: 'escape', holdSeconds: 4,
        toast: 'BREACH THE FRONT DOOR — hold the doormat' },
    ],
    // The tan occupation, 18 men — ONE designed problem per pocket, with
    // space between fights. facing is radians (atan2(x, z) style).
    // (baseY puts a man ON something — the watchtower lookout.)
    enemyLayout: [
      // LIVING ROOM — the wreck-watcher (your first takedown), a book post,
      // a roaming scout, and the door guard.
      { x: 10, z: 2, facing: -0.98 },                                   // standing over the Heavy
      { x: 32.5, z: 9.5, facing: -1.29 },                               // table outpost (over the Medic)
      { x: 49, z: 20, facing: 2.68 },                                   // block post (over the Sniper)
      { x: 45.5, z: -16.5, facing: -1.8 },                              // book-stack post
      { x: 53, z: -27, facing: -Math.PI / 2, type: 'scout', patrol: { x: 23, z: -22 } },  // rug-lane scout
      { x: 69.5, z: 18, facing: -Math.PI / 2 },                         // hallway-door guard
      { x: 56, z: 18, facing: -2.2, type: 'lookout', baseY: 6.45 },     // THE WATCHTOWER
      // HALLWAY — a sentry + the corridor scout.
      { x: 85, z: -13, facing: -1.2 },
      { x: 84.5, z: 30, facing: Math.PI, type: 'scout', patrol: { x: 84.5, z: -36 } },
      // KITCHEN — gunner at the table + the POW-pen guard.
      { x: 123, z: -27, facing: -Math.PI / 2, type: 'gunner' },
      { x: 140.5, z: -34, facing: 2.78 },                               // pen guard

      // STUDY — the radio room: gunner guard + desk post + scout.
      { x: 131, z: 25, facing: -1.57, type: 'gunner' },                 // radio guard
      { x: 122, z: 26, facing: -Math.PI / 2 },
      { x: 118, z: 40, facing: -2.4, type: 'scout', patrol: { x: 98, z: 24 } },
      // FOYER GARRISON — the fight you can't skip, dug in at the front door.
      { x: 80, z: 39, facing: Math.PI, type: 'gunner' },
      { x: 89, z: 39.5, facing: Math.PI, type: 'gunner' },
      { x: 84.5, z: 43.5, facing: Math.PI },
      { x: 78, z: 43, facing: 2.6 },
    ],
    // THE TANK: armor patrolling the kitchen's open tile, between the door
    // and the POW pen. Bullets bounce off — it falls to the Heavy's bazooka,
    // the Sniper's mines in its lane, or (slowly) cooked frags.
    tank: { x: 112, z: -12, facing: Math.PI / 2, patrol: { x: 144, z: -12 } },
    // The porch reserve — exists only if a runner reaches the radio. They
    // spawn ON THE THRESHOLD of the front door and sweep in hunting, so the
    // alarm reads as men ARRIVING, not materializing.
    reserve: [
      { x: 81.5, z: 44.6, facing: Math.PI },
      { x: 83.8, z: 44.8, facing: Math.PI },
      { x: 86.2, z: 44.6, facing: Math.PI },
      { x: 88.2, z: 44.8, facing: 2.9 },
    ],
  },
  // The rest of the journey home (see docs/CAMPAIGN.md). Each unlocks when
  // its environment is built — one mission perfected at a time.
  {
    id: 'porch',
    name: 'OUT THE DOOR',
    world: 'porch',
    sector: 'THE PORCH & FRONT GARDEN — NIGHT',
    briefing: 'Coming soon.',
    comingSoon: true,
  },
  {
    id: 'street',
    name: 'THE STREET',
    world: 'street',
    sector: 'SIDEWALK & GUTTER — NIGHT',
    briefing: 'Coming soon.',
    comingSoon: true,
  },
  {
    id: 'storm-drain',
    name: 'THE STORM DRAIN',
    world: 'drain',
    sector: 'UNDER THE STREET — DARK',
    briefing: 'Coming soon.',
    comingSoon: true,
  },
  {
    id: 'backyard',
    name: 'THE BACKYARD WAR',
    world: 'backyard',
    sector: "THE NEIGHBOR'S YARD — DAWN",
    briefing: 'Coming soon.',
    comingSoon: true,
  },
  {
    id: 'toy-store',
    name: 'THE TOY STORE',
    world: 'store',
    sector: 'AISLE 7 — HOME',
    briefing: 'Coming soon.',
    comingSoon: true,
  },
];

// Mission coordinates are authored in the house's original design units;
// stretch them once to match the world scale.
for (const def of MISSIONS) {
  if (def.scatter) for (const s of def.scatter) {
    s.x *= WORLD_SCALE; s.z *= WORLD_SCALE;
    if (s.zone) { s.zone.x *= WORLD_SCALE; s.zone.z *= WORLD_SCALE; }
  }
  if (def.enemyLayout) for (const e of def.enemyLayout) {
    e.x *= WORLD_SCALE; e.z *= WORLD_SCALE;
    if (e.patrol) { e.patrol.x *= WORLD_SCALE; e.patrol.z *= WORLD_SCALE; }
  }
  if (def.reserve) for (const r of def.reserve) { r.x *= WORLD_SCALE; r.z *= WORLD_SCALE; }
  if (def.tank) {
    def.tank.x *= WORLD_SCALE; def.tank.z *= WORLD_SCALE;
    if (def.tank.patrol) { def.tank.patrol.x *= WORLD_SCALE; def.tank.patrol.z *= WORLD_SCALE; }
  }
  if (def.stages) for (const st of def.stages) {
    if (!st.parts) continue;
    for (const p of st.parts) {
      if (p.items) for (const it of p.items) { it.x *= WORLD_SCALE; it.z *= WORLD_SCALE; }
      if (p.at) { p.at.x *= WORLD_SCALE; p.at.z *= WORLD_SCALE; }
    }
  }
}

export function missionById(id) {
  return MISSIONS.find((m) => m.id === id) || null;
}
