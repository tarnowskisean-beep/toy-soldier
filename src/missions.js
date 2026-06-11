// missions.js — THE LONG WAY HOME, as data.
//
// The campaign: your squad's toy plane is shot down and crashes into a stranger's
// house. Fight room to room, escape to the street, and make it back to the toy
// store. Each mission is one environment; missions end by REACHING somewhere.

export const MISSIONS = [
  {
    id: 'crash-site',
    name: 'CRASH SITE',
    sector: 'THE HOUSE — LIVING ROOM, DUSK',
    briefing:
      'We came down hard through the window. The house is crawling with tan — ' +
      'outposts at the furniture, patrols in the halls, a garrison on the front ' +
      'door. They have not found the wreck yet: you are UNDETECTED. Sneak or ' +
      'shoot — but get the squad to the FRONT DOOR and breach it.',
    objective: { type: 'escape', holdSeconds: 3 },
    winText: 'ESCAPED THE HOUSE — ONTO THE PORCH',
    // The tan occupation. facing is radians (atan2(x, z) style).
    enemyLayout: [
      // LIVING ROOM — coffee-table outpost, ottoman watch, book-stack post, door guard.
      { x: 24.5, z: -4, facing: -Math.PI / 2 },
      { x: 32.5, z: 9.5, facing: -Math.PI / 2 },
      { x: 38, z: 22, facing: -2.3 },
      { x: 45.5, z: -16.5, facing: -1.8 },
      { x: 69.5, z: 18, facing: -Math.PI / 2 },
      // ...and one roamer crossing the rug lanes.
      { x: 53, z: -27, facing: -Math.PI / 2, patrol: { x: 23, z: -22 } },
      // HALLWAY — a sentry watching the living-room door + a corridor patrol.
      { x: 85, z: -13, facing: -1.2 },
      { x: 84.5, z: 30, facing: Math.PI, patrol: { x: 84.5, z: -36 } },
      // KITCHEN — two-man post (they'll hear a hallway fight through the door).
      { x: 123, z: -27, facing: -Math.PI / 2 },
      { x: 108, z: -35, facing: -1.0 },
      // STUDY — two-man post.
      { x: 122, z: 26, facing: -Math.PI / 2 },
      { x: 105, z: 38, facing: 2.6 },
      // FOYER GARRISON — the fight you can't skip, guarding the front door.
      { x: 80, z: 39, facing: Math.PI },
      { x: 89, z: 39.5, facing: Math.PI },
      { x: 84.5, z: 43.5, facing: Math.PI },
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
