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
//   spread       — BASE aim error in radians; live spread blooms with
//                  sustained fire and incoming near-misses (soldier.js)
//   recoil       — per-shot muzzle kick in radians (the sight climbs)
//   bloom        — per-shot bloom added to the cone (decays when you pause)
//   rifleLength  — visual gun length (also moves the muzzle)
//   bulky        — wider body (the Heavy)
//   marking      — figure decoration: 'leader' | 'cross' | 'none'
//   ringColor    — the squad color used for the selection ring + HUD card

export const CLASSES = {
  // `ability`: each class's special. input 'hold' = right-mouse held;
  // input 'press' = Space (one-shot, with a cooldown in seconds).
  // `mag`/`reserve`/`reload`: the ammo economy — the PLAYER's resource to
  // manage (AI squadmates run theirs off-book). Supply drops refill reserves.
  leader: {
    key: 'leader', name: 'LEADER', hp: 100, speed: 10.4, fireInterval: 0.14,
    damage: 16, range: 60, spread: 0.035, recoil: 0.016, bloom: 0.14,
    rifleLength: 0.9, bulky: false,
    mag: 24, reserve: 96, reload: 1.6,
    marking: 'leader', ringColor: 0x7dff7d,
    // Frags are a POUCH, not a cooldown: `uses` to start, +1 per supply
    // drop (cap `max`). Infinite grenades solve every designed fight from
    // around a corner — counted ones are a decision.
    ability: { key: 'grenade', name: 'FRAG OUT', input: 'press', cooldown: 3.5, uses: 2, max: 4 },
  },
  heavy: {
    key: 'heavy', name: 'HEAVY', hp: 150, speed: 7.5, fireInterval: 0.07,
    damage: 11, range: 48, spread: 0.085, recoil: 0.009, bloom: 0.07,
    rifleLength: 1.15, bulky: true,
    mag: 50, reserve: 150, reload: 2.4,
    marking: 'none', ringColor: 0xffce54,
    // Toggle: plant the gun — half fire interval, wide spread, slow feet,
    // and a cone of suppression that pins tan heads down.
    ability: { key: 'suppress', name: 'DIG IN', input: 'toggle' },
  },
  sniper: {
    key: 'sniper', name: 'SNIPER', hp: 75, speed: 9.2, fireInterval: 1.0,
    damage: 90, range: 125, spread: 0.004, recoil: 0.05, bloom: 0.55,
    rifleLength: 1.6, bulky: false,
    mag: 5, reserve: 25, reload: 2.2,
    marking: 'none', ringColor: 0x6fd0ff,
    // The sniper's aim (RMB) IS the scope — everyone shoulders, he magnifies.
    ability: { key: 'scope', name: 'SCOPE', input: 'aim' },
  },
  medic: {
    key: 'medic', name: 'MEDIC', hp: 90, speed: 11, fireInterval: 0.18,
    damage: 13, range: 43, spread: 0.045, recoil: 0.014, bloom: 0.13,
    rifleLength: 0.7, bulky: false,
    mag: 20, reserve: 80, reload: 1.5,
    marking: 'cross', ringColor: 0xff8a8a,
    ability: { key: 'revive', name: 'REVIVE', input: 'press', cooldown: 0.4 },
  },
};

// The order the squad is built in (also the 1-2-3-4 key order).
export const SQUAD_ORDER = ['leader', 'heavy', 'sniper', 'medic'];
