// classes.js — the four squad roles, as plain data.
//
// Keeping stats as data (not code) makes balancing easy: tweak a number here and
// the whole game updates. Every soldier reads its behavior from one of these.
//
//   hp           — health pool
//   speed        — movement units/second
//   fireInterval — seconds between shots (smaller = faster fire)
//   damage       — damage per bullet
//   range        — how far the AI will engage / how far the class is effective
//   spread       — random aim error in radians (bigger = less accurate)
//   rifleLength  — visual gun length (also moves the muzzle)
//   bulky        — wider body (the Heavy)
//   marking      — figure decoration: 'leader' | 'cross' | 'none'
//   ringColor    — the squad color used for the selection ring + HUD card

export const CLASSES = {
  // `ability`: each class's special. input 'hold' = right-mouse held;
  // input 'press' = Space (one-shot, with a cooldown in seconds).
  leader: {
    key: 'leader', name: 'LEADER', hp: 100, speed: 9, fireInterval: 0.14,
    damage: 16, range: 48, spread: 0.04, rifleLength: 0.9, bulky: false,
    marking: 'leader', ringColor: 0x7dff7d,
    ability: { key: 'grenade', name: 'FRAG OUT', input: 'press', cooldown: 3.5 },
  },
  heavy: {
    key: 'heavy', name: 'HEAVY', hp: 150, speed: 6.5, fireInterval: 0.07,
    damage: 11, range: 38, spread: 0.10, rifleLength: 1.15, bulky: true,
    marking: 'none', ringColor: 0xffce54,
    ability: { key: 'suppress', name: 'SUPPRESS', input: 'hold' },
  },
  sniper: {
    key: 'sniper', name: 'SNIPER', hp: 75, speed: 8, fireInterval: 1.0,
    damage: 90, range: 100, spread: 0.004, rifleLength: 1.6, bulky: false,
    marking: 'none', ringColor: 0x6fd0ff,
    ability: { key: 'scope', name: 'SCOPE', input: 'hold' },
  },
  medic: {
    key: 'medic', name: 'MEDIC', hp: 90, speed: 9.5, fireInterval: 0.18,
    damage: 13, range: 34, spread: 0.05, rifleLength: 0.7, bulky: false,
    marking: 'cross', ringColor: 0xff8a8a,
    ability: { key: 'revive', name: 'REVIVE', input: 'press', cooldown: 0.4 },
  },
};

// The order the squad is built in (also the 1-2-3-4 key order).
export const SQUAD_ORDER = ['leader', 'heavy', 'sniper', 'medic'];
