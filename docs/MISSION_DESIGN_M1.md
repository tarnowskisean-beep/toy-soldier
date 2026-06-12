# Mission 1 — CRASH SITE (full design)

> The template for every mission in THE LONG WAY HOME. A mission is not a route —
> it's a STRUCTURE: acts that change what the player is doing, systems that
> create pressure, and reasons to touch every room. Target: **20+ minutes** of
> first-play time, earned with content, never with waves or timers.

## The fantasy

Your toy plane was shot down over enemy territory and crashed through the
living-room window at dusk. The squad was thrown from the wreck. You wake up
alone at the nose of the plane, the house is crawling with tan, and every one
of your men is lying somewhere out there in the dark between the furniture.

Get your squad back. Get your gear back. Kill their radio. Get out.

## The four acts

### Act 1 — ALONE (regroup)                                ~6 min
You control the Leader, solo — and your men are scattered ACROSS THE HOUSE,
each rescue its own scene (the beacon leads to the nearest):

| Who | Where | The scene |
|---|---|---|
| HEAVY | steps from the wreck | a tan stands over him — your first takedown, the tutorial beat |
| MEDIC | a sandbag POW PEN in the far kitchen corner | captured; pen guard + the kitchen gunner — a real raid |
| SNIPER | gone to ground in the study book rows | hiding upright; joins fast and healthy ('Thought you would never come.') |

HOLD E beside a man to get him up — one interaction for every downed body
in the game, only the timer changes (the hider joins almost instantly at
85%; the others wake slower at 60%). The sniper is a real SEARCH: the
beacon marks his ROOM, not his pixel, until you're close — then he breaks
cover and waves you in. Three rescues, three verbs: a takedown, an assault
or sneak on a held position, a search.

Design intent: Act 1 alone walks you across the entire map while weak —
you learn crouch/stealth/cover en route, and the house's geography (which
Act 2 reuses) is learned by NEED, not by wandering.

### Act 2 — GEAR & THE ALARM (parallel objectives)          ~8 min
With the squad up, two objectives open AT ONCE (do them in any order).
**The world is LIVE in every act** — a crate grabbed or a radio killed
during Act 1 already counts; stages observe the world, they never gate it.

**RECOVER THE SUPPLY DROPS (3).** The plane's cargo scattered on the way down:
one crate in the HALLWAY, one in the KITCHEN, one in the STUDY. Each refills
the squad's ammo reserves, patches everyone +20 hp, and puts a frag back in
the Leader's pouch. Each sits inside a defended position — every room in the
house now has a reason to be entered.

**CUT THE ALARM.** The tan field radio sits in the STUDY. While it lives,
every SCOUT who gets spooked bolts for it — visible sprinters you can
chase, shoot, or beat to the room. The run is fully TELEGRAPHED: the scout
barks "CALLING IT IN!", wears a pulsing **!**, and the objective line burns
red (⚠ RUNNER → RADIO). Reaching the radio starts a **4-second call** —
handset beeps climb in pitch as it gets through — before the porch reserve
(4 men) arrives at the front-door threshold and sweeps in. You can:
- **Smash it** (stand beside it ~1.5s) — silent.
- **Shoot it** — instant, but the shot is loud like any other.

Design intent: the radio turns every botched stealth encounter into a
cat-and-mouse — kill the runner before he rounds the corner, beat him to the
handset, or pay with the hardest fight in the mission. The supply crates make
the ammo economy breathe: fights drain mags, crates refill them, and the
route order is the player's plan.

### Act 3 — THE DOOR (breach)                               ~5 min
The front-door garrison is the fight you can't skip: 4 men including 2
GUNNERS dug in at the foyer emplacements. Reach the glowing doormat and hold
it 4 seconds, uncontested. If the alarm was raised earlier and the reserve is
still alive, they're part of this fight too. **The crescendo:** the moment
any green closes on the door, every tan still standing is told where this
ends and falls back to stop you — the breach is a finale, not a formality.

### Act 4 — OUT (the beat)
Win text, campaign card, M2 tease. (M2 unlock already wired.)

## The enemy roster

One brain (sentry → investigate → fight → stand down), four bodies:

| Type | HP | Speed | Damage | Style | Read |
|---|---|---|---|---|---|
| **RIFLEMAN** | 40 | 5.8 | 13 | holds posts, fights from cover | the baseline tan |
| **SCOUT** | 25 | 8.6 | 8 | patrols; on alert RUNS for the radio, fights only if cornered | small, short rifle, fast |
| **GUNNER** | 70 | 4.2 | 9/round | walks fire in 4-round bursts, suppressive | bulky, long gun |
| **LOOKOUT** | 30 | 0 | 12 | planted on the watchtower; sees far and wide, blind beneath his own parapet | long gun, up high |

18 on the field: living room 7 (the wreck-watcher + table/block/book posts,
a roaming scout, the hallway-door guard, and the WATCHTOWER lookout),
hallway 2 (sentry + corridor scout), kitchen 2 (table gunner + the pen
guard), study 3 (radio-guard gunner + desk post + scout), foyer garrison 4
(incl. 2 gunners). Porch reserve: 4 riflemen — exist only if called, spawn
on the door threshold and sweep in hunting.

## The ammo economy

| Class | Mag | Reserve | Note |
|---|---|---|---|
| LEADER | 24 | 96 | rifle — and a FRAG POUCH: 2 to start, +1 per crate, cap 4 |
| HEAVY | 50 | 150 | belt — suppress eats it fast |
| SNIPER | 5 | 25 | every round a decision |
| MEDIC | 20 | 80 | carbine |

R or empty mag = reload (~1.6s, loud-ish click). Dry = click. Supply crates
refill +50% of starting reserve, all living members. AI squadmates manage
their own ammo off-book (their fire is already cadence-limited); the economy
is the PLAYER's problem, by design. Grenades are part of it: a counted pouch,
never a cooldown — infinite frags would solve every designed fight from
around a corner.

## Pacing map (intended first-play rhythm)

```
wreck → couch rescue (sneak) → medic rescue (first real fight) → sniper rescue
(scout cat-and-mouse, likely first alarm scare) → hallway crate (post fight)
→ kitchen crate (gunner lesson) → study: radio + crate (the set-piece room)
→ regroup, top off → foyer garrison (the big fight) → doormat hold → OUT
```

Quiet-loud-quiet: every fight is followed by an investigate/search cooldown
where the house re-settles, and the player breathes, loots, and plans.

## Why this fills 20 minutes honestly

- 4 acts that change the verb (sneak-solo → explore/fight → set-piece → assault)
- 7+ designed encounters, every room load-bearing, no dead space
- pressure systems (alarm runners, ammo, the frag pouch) that punish rushing
  and reward planning
- failure costs minutes, not the mission: lost squadmates need the medic; a
  raised alarm means 4 more rifles at the door; **dying rewinds to the last
  ACT CHECKPOINT in place** — no reload, no replaying acts already won

## The gunplay (why a firefight has a RHYTHM)

- **Recoil + bloom** — the sight climbs per shot (by class) and the cone
  blooms while the trigger works, settling fast when it rests. The crosshair
  breathes with it. Full-auto is a choice, not a default.
- **Headshots** — a clean hit above the shoulders CRACKS for double.
- **Suppression goes both ways** — rounds snapping past a man (green OR his
  whole squad) rattle his cone wide until his nerves settle. Cover isn't
  just for blocking hits; it's for keeping your aim.
- **Settling enemy aim** — a tan's first shots at a fresh target go wide
  (you hear them snap past) and tighten over ~2.5s of eyes-on. Ducking
  resets him; hitting him rattles him. The duel: pop, trade, get down.
- **They reposition** — a man trading fire from one spot too long shifts to
  different cover. Fights drift; shooting galleries don't.
- **Scope sway** — the sniper's glass drifts with his pulse; SHIFT holds
  breath for a few steady seconds.

## The supporting systems (how the mission talks)

- **Checkpoints** — saved at mission start and every stage boundary
  (`mission.js` saveCheckpoint). RETRY restores squad, surviving tans (calm,
  at their snapshotted posts), props, and counters without a page reload.
- **Stealth is played by EAR** — a suspicion blip when a "?" crosses the
  line, a sharp sting on "!", climbing handset beeps during the radio call,
  near-miss cracks when rounds snap past your head (`audio.js`).
- **The score follows the fight** — calm room tone → a low drone while
  they hunt → a chugging pulse in contact (`audio.js` setMusic, driven by
  `enemies.musicState`).
- **Sound goes both ways** — sprinting is heard (`FOOTSTEP_HEAR`), not just
  seen: sentries turn toward running boots. Sneak the last stretch.
- **The squad shares your stance** — crouch and the AI mates crouch
  (`soldier.js` ctx.leaderCrouched); X holds their fire. Squad stealth is a
  real verb, not a solo exception.
- **One-time contextual tips** (`main.js` tip/updateTips) teach cover, the
  takedown noise rule, suspicion, runners, and lamps at the moment of need —
  the briefing wall is reference, not the lesson.
- **The debrief** — time, kills (silent counted), alarm status, GHOST, and
  who walked out. The win screen is a scoreboard worth replaying against.
- **Both lamps are targets** — any fixture with a bulb plays by the same
  rule: kill the bulb, darken the corner, pay with the noise.

## Tuning knobs (all single-line constants)

enemy damage / type stats (`enemies.js` TYPES), AI squad cadence
(`soldier.js` AI_FIRE_SLOW), medic heal (`squad.js`), mag sizes + frag pouch
(`classes.js` ability.uses/max), recoil/bloom per class (`classes.js`),
bloom & suppression decay (`soldier.js` update), enemy settle window + stale
repost (`enemies.js` _fight: 2.5s settle, 4.5s postT), headshot radius/multi
(`enemies.js` bullet loop), scope sway (`main.js` placeCamera), alarm call
window (`enemies.js` CALL_TIME), sprint hearing (`enemies.js`
FOOTSTEP_HEAR), reserve size (`missions.js`), crate refill % (`mission.js`),
hider beacon snap (`mission.js` ZONE_SNAP), music levels (`audio.js`
setMusic).
