// missions.js — the single-player campaign, as data.
//
// Each mission is a small config the MissionRunner interprets. Three objective
// verbs cover a lot of ground: eliminate (clear them out), survive (hold against
// waves), and secure (stand on a marker until it's yours).

export const MISSIONS = [
  {
    id: 'beachhead',
    name: 'BEACHHEAD',
    sector: 'SECTOR — LIVING ROOM FLOOR',
    briefing:
      'Tan forces hold the floor. Move up with your fireteam and wipe out the ' +
      'patrol. Use cover — they shoot back.',
    objective: { type: 'eliminate', count: 8 },
    enemies: { initial: 8 },
  },
  {
    id: 'doormat',
    name: 'HOLD THE DOORMAT',
    sector: 'SECTOR — FRONT HALL',
    briefing:
      'The tan are counterattacking through the doorway. Dig in and HOLD for ' +
      '60 seconds. Put the Heavy on suppress and keep the Medic close.',
    objective: { type: 'survive', seconds: 60 },
    enemies: { waves: { interval: 6, perWave: 3, max: 10 }, initial: 4 },
  },
  {
    id: 'outpost',
    name: 'SECURE THE OUTPOST',
    sector: 'SECTOR — THE COFFEE TABLE',
    briefing:
      'Push to the marker and hold the ground. Stay in the zone for 12 seconds ' +
      'to secure it — but the tan will contest you the whole way.',
    objective: { type: 'secure', seconds: 12, zone: { x: 26, z: 0, r: 6 } },
    enemies: { initial: 7 },
  },
];

export function missionById(id) {
  return MISSIONS.find((m) => m.id === id) || null;
}
