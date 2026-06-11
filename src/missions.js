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

export const MISSIONS = [
  {
    id: 'crash-site',
    name: 'CRASH SITE',
    sector: 'THE HOUSE — LIVING ROOM, DUSK',
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
    // The tan occupation, ~26 men. facing is radians (atan2(x, z) style).
    enemyLayout: [
      // LIVING ROOM — posts guarding the downed squadmates + the old furniture line.
      { x: 12, z: -26, facing: 2.55 },                                  // couch post A (over the Heavy)
      { x: 21, z: -29, facing: -2.11 },                                 // couch post B
      { x: 24.5, z: -4, facing: 0.05 },                                 // table outpost A (over the Medic)
      { x: 32.5, z: 9.5, facing: -1.29 },                               // table outpost B
      { x: 49, z: 20, facing: 2.68 },                                   // block post (over the Sniper)
      { x: 38, z: 22, facing: -2.3 },                                   // ottoman watch
      { x: 45.5, z: -16.5, facing: -1.8 },                              // book-stack post
      { x: 69.5, z: 18, facing: -Math.PI / 2 },                         // hallway-door guard
      { x: 53, z: -27, facing: -Math.PI / 2, type: 'scout', patrol: { x: 23, z: -22 } },  // rug-lane scout
      { x: 60, z: 6, facing: 2.0, type: 'scout', patrol: { x: 46, z: 26 } },              // block-lane scout
      { x: 33, z: -36, facing: 1.6, type: 'scout', patrol: { x: 62, z: -33 } },           // couch-front scout
      // HALLWAY — sentry + corridor scout + console post.
      { x: 85, z: -13, facing: -1.2 },
      { x: 84.5, z: 30, facing: Math.PI, type: 'scout', patrol: { x: 84.5, z: -36 } },
      { x: 90, z: -2, facing: 3.1 },                                    // console post (over the supply drop)
      // KITCHEN — gunner at the table + two rifles.
      { x: 123, z: -27, facing: -Math.PI / 2, type: 'gunner' },
      { x: 108, z: -35, facing: -1.0 },
      { x: 136, z: -30, facing: -2.55 },                                // deep post (over the supply drop)
      // STUDY — the radio room: gunner guard + desk post + door watch + scout.
      { x: 131, z: 25, facing: -1.57, type: 'gunner' },                 // radio guard
      { x: 122, z: 26, facing: -Math.PI / 2 },
      { x: 105, z: 38, facing: 2.6 },
      { x: 118, z: 40, facing: -2.4, type: 'scout', patrol: { x: 98, z: 24 } },
      // FOYER GARRISON — the fight you can't skip, dug in at the front door.
      { x: 80, z: 39, facing: Math.PI, type: 'gunner' },
      { x: 89, z: 39.5, facing: Math.PI, type: 'gunner' },
      { x: 84.5, z: 43.5, facing: Math.PI },
      { x: 78, z: 43, facing: 2.6 },
      { x: 91, z: 43, facing: -2.6 },
    ],
    // The porch reserve — exists only if a runner reaches the radio.
    reserve: [
      { x: 82, z: 44, facing: Math.PI },
      { x: 87, z: 44, facing: Math.PI },
      { x: 84.5, z: 42, facing: Math.PI },
      { x: 80.5, z: 42.5, facing: 2.8 },
    ],
  },
  {
    id: 'hallway',
    name: 'OUT THE DOOR',
    sector: 'THE PORCH — NIGHT',
    briefing: 'Coming soon.',
    comingSoon: true,
  },
  {
    id: 'street',
    name: 'THE STREET',
    sector: 'OUTSIDE — NIGHT',
    briefing: 'Coming soon.',
    comingSoon: true,
  },
];

export function missionById(id) {
  return MISSIONS.find((m) => m.id === id) || null;
}
