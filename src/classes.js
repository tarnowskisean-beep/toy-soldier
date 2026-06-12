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
  // `ability`: each class's special, fired with Space (one-shot, with a
  // cooldown in seconds). `charges` makes it LIMITED — the bazooka and the
  // mines carry their own tiny ammo pool that supply drops do NOT refill;
  // spend them on the right problem. No `charges` = unlimited (cooldown only).
  // `mag`/`reserve`/`reload`: the ammo economy — the PLAYER's resource to
  // manage (AI squadmates run theirs off-book). Supply drops refill reserves.
  leader: {
    key: 'leader', name: 'LEADER', hp: 100, speed: 10.4, fireInterval: 0.14,
    damage: 16, range: 60, spread: 0.04, rifleLength: 0.9, bulky: false,
    mag: 24, reserve: 96, reload: 1.6,
    marking: 'leader', ringColor: 0x7dff7d,
    ability: { key: 'grenade', name: 'FRAG OUT', input: 'press', cooldown: 3.5 },
  },
  heavy: {
    key: 'heavy', name: 'HEAVY', hp: 150, speed: 7.5, fireInterval: 0.07,
    damage: 11, range: 48, spread: 0.10, rifleLength: 1.15, bulky: true,
    mag: 50, reserve: 150, reload: 2.4,
    marking: 'none', ringColor: 0xffce54,
    // Two rockets on his back: the squad's only answer to ARMOR (and a
    // one-button way to delete a dug-in post). Fires at the crosshair.
    ability: { key: 'rocket', name: 'BAZOOKA', input: 'press', cooldown: 1.5, charges: 2 },
  },
  sniper: {
    key: 'sniper', name: 'SNIPER', hp: 75, speed: 9.2, fireInterval: 1.0,
    damage: 90, range: 125, spread: 0.004, rifleLength: 1.6, bulky: false,
    mag: 5, reserve: 25, reload: 2.2,
    marking: 'none', ringColor: 0x6fd0ff,
    scoped: true,   // his aim (RMB/Z) IS the scope — everyone shoulders, he magnifies
    // Two anti-tank mines: plant one in the tank's lane (or a doorway) and
    // it goes off under the first thing that rolls or walks over it.
    ability: { key: 'mine', name: 'AT MINE', input: 'press', cooldown: 1.0, charges: 2 },
  },
  medic: {
    key: 'medic', name: 'MEDIC', hp: 90, speed: 11, fireInterval: 0.18,
    damage: 13, range: 43, spread: 0.05, rifleLength: 0.7, bulky: false,
    mag: 20, reserve: 80, reload: 1.5,
    marking: 'cross', ringColor: 0xff8a8a,
    ability: { key: 'revive', name: 'REVIVE', input: 'press', cooldown: 0.4 },
  },
};

// The order the squad is built in (also the 1-2-3-4 key order).
export const SQUAD_ORDER = ['leader', 'heavy', 'sniper', 'medic'];
