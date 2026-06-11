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
      'We came down hard through the window and the squad got thrown across the ' +
      'room. You are ALONE at the wreck — Heavy, Sniper and Medic are lying out ' +
      'there between the furniture, and the tan found the crash before you woke ' +
      'up. Get your men on their feet. Recover the supply drops. Their field ' +
      'radio is in the STUDY: while it lives, any tan who marks you will run to ' +
      'call the porch reserve down on your head. Cut it. Then breach the front ' +
      'door and get out.',
    winText: 'ESCAPED THE HOUSE — ONTO THE PORCH',
    // Who the crash scattered where (member index in SQUAD_ORDER).
    scatter: [
      { member: 1, x: 16, z: -32 },   // HEAVY — short of the couch
      { member: 3, x: 24, z: 12 },    // MEDIC — mid-room, under the table's guns
      { member: 2, x: 52, z: 14 },    // SNIPER — deep east, in the toy blocks
    ],
    stages: [
      { type: 'regroup', text: 'FIND YOUR SQUAD',
        toast: 'YOUR SQUAD IS OUT THERE — get them on their feet' },
      { type: 'multi', toast: 'RECOVER THE SUPPLY DROPS — and CUT THAT RADIO',
        parts: [
          { type: 'collect', text: 'SUPPLIES',
            items: [{ x: 89.5, z: -8 }, { x: 132, z: -36 }, { x: 126, z: 13 }] },
          { type: 'destroy', text: 'CUT THE ALARM' },
        ] },
      { type: 'escape', holdSeconds: 4,
        toast: 'BREACH THE FRONT DOOR — hold the doormat' },
    ],
    // The tan occupation, 17 men — ONE designed problem per pocket, with
    // space between fights. facing is radians (atan2(x, z) style).
    enemyLayout: [
      // LIVING ROOM — a guard at each downed squadmate, a book-stack post,
      // a roaming scout, and the door guard.
      { x: 12, z: -26, facing: 2.55 },                                  // couch guard (over the Heavy)
      { x: 32.5, z: 9.5, facing: -1.29 },                               // table outpost (over the Medic)
      { x: 49, z: 20, facing: 2.68 },                                   // block post (over the Sniper)
      { x: 45.5, z: -16.5, facing: -1.8 },                              // book-stack post
      { x: 53, z: -27, facing: -Math.PI / 2, type: 'scout', patrol: { x: 23, z: -22 } },  // rug-lane scout
      { x: 69.5, z: 18, facing: -Math.PI / 2 },                         // hallway-door guard
      // HALLWAY — a sentry + the corridor scout.
      { x: 85, z: -13, facing: -1.2 },
      { x: 84.5, z: 30, facing: Math.PI, type: 'scout', patrol: { x: 84.5, z: -36 } },
      // KITCHEN — gunner at the table + a rifle over the supply drop.
      { x: 123, z: -27, facing: -Math.PI / 2, type: 'gunner' },
      { x: 136, z: -30, facing: -2.55 },
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
    // The porch reserve — exists only if a runner reaches the radio.
    reserve: [
      { x: 82, z: 44, facing: Math.PI },
      { x: 87, z: 44, facing: Math.PI },
      { x: 84.5, z: 42, facing: Math.PI },
      { x: 80.5, z: 42.5, facing: 2.8 },
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
  if (def.scatter) for (const s of def.scatter) { s.x *= WORLD_SCALE; s.z *= WORLD_SCALE; }
  if (def.enemyLayout) for (const e of def.enemyLayout) {
    e.x *= WORLD_SCALE; e.z *= WORLD_SCALE;
    if (e.patrol) { e.patrol.x *= WORLD_SCALE; e.patrol.z *= WORLD_SCALE; }
  }
  if (def.reserve) for (const r of def.reserve) { r.x *= WORLD_SCALE; r.z *= WORLD_SCALE; }
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
