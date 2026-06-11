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

### Act 1 — ALONE (regroup)                                ~5 min
You control the Leader, solo. The other three were thrown across the living
room and lie DOWNED where they landed:

| Who | Where he landed | What guards him |
|---|---|---|
| HEAVY | short of the couch, south wall | 2-man rifle post that found him first |
| MEDIC | mid-room, north of the rug lanes | the coffee-table outpost overlooks him |
| SNIPER | deep east, by the toy blocks | a scout patrol crosses his lane |

Walk to a downed man and stay beside him ~2s to get him on his feet (they're
stunned, not shot — no medic needed; this is the act that TEACHES the revive
verb). Each rescue is a designed encounter: sneak past the guards crouched, or
pick a fight one post at a time while you're still a one-man army.

Design intent: the player learns crouch/stealth/orders while weak, meets the
squad one at a time, and the room is too dangerous to rush — you have 1 body
and the medic isn't up yet.

### Act 2 — GEAR & THE ALARM (parallel objectives)          ~8 min
With the squad up, two objectives open AT ONCE (do them in any order):

**RECOVER THE SUPPLY DROPS (3).** The plane's cargo scattered on the way down:
one crate in the HALLWAY, one in the KITCHEN, one in the STUDY. Each refills
the squad's ammo reserves and patches everyone +20 hp. Each sits inside a
defended position — every room in the house now has a reason to be entered.

**CUT THE ALARM.** The tan field radio sits in the STUDY. While it lives,
every SCOUT who gets spooked bolts for it — five visible sprinters you can
chase, shoot, or beat to the room. If one reaches it, the porch reserve
(4 men) comes through the front door and sweeps the house. You can:
- **Smash it** (stand beside it ~1.5s) — silent.
- **Shoot it** — instant, but the shot is loud like any other.

Design intent: the radio turns every botched stealth encounter into a
cat-and-mouse — kill the runner before he rounds the corner, or pay with the
hardest fight in the mission. The supply crates make the ammo economy breathe:
fights drain mags, crates refill them, and the route order is the player's
plan.

### Act 3 — THE DOOR (breach)                               ~5 min
The front-door garrison is the fight you can't skip: 5 men including 2
GUNNERS dug in at the foyer emplacements. Reach the glowing doormat and hold
it 4 seconds, uncontested. If the alarm was raised earlier and the reserve is
still alive, they're part of this fight too.

### Act 4 — OUT (the beat)
Win text, campaign card, M2 tease. (M2 unlock already wired.)

## The enemy roster

One brain (sentry → investigate → fight → stand down), three bodies:

| Type | HP | Speed | Damage | Style | Read |
|---|---|---|---|---|---|
| **RIFLEMAN** | 40 | 5.0 | 13 | holds posts, fights from cover | the baseline tan |
| **SCOUT** | 25 | 7.5 | 8 | patrols; on alert RUNS for the radio, fights only if cornered | small, short rifle, fast |
| **GUNNER** | 70 | 3.6 | 9/round | walks fire in 4-round bursts, suppressive | bulky, long gun |

~26 on the field: living room 10 (three guard posts around the downed
squadmates + table/ottoman/book posts + a scout), hallway 3 (sentry + scout
patrol + console post), kitchen 3 (incl. gunner), study 4 (radio guard incl.
gunner), foyer garrison 5 (incl. 2 gunners), +1 long-route scout. Porch
reserve: 4 riflemen, exist only if called.

## The ammo economy

| Class | Mag | Reserve | Note |
|---|---|---|---|
| LEADER | 24 | 96 | rifle |
| HEAVY | 50 | 150 | belt — suppress eats it fast |
| SNIPER | 5 | 25 | every round a decision |
| MEDIC | 20 | 80 | carbine |

R or empty mag = reload (~1.6s, loud-ish click). Dry = click. Supply crates
refill +50% of starting reserve, all living members. AI squadmates manage
their own ammo off-book (their fire is already cadence-limited); the economy
is the PLAYER's problem, by design.

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
- pressure systems (alarm runners, ammo) that punish rushing and reward planning
- failure costs minutes, not the mission: lost squadmates need the medic;
  a raised alarm means 4 more rifles at the door

## Tuning knobs (all single-line constants)

enemy damage / type stats (`enemies.js` TYPES), AI squad cadence
(`soldier.js` AI_FIRE_SLOW), medic heal (`squad.js`), mag sizes
(`classes.js`), alarm runner threshold + reserve size (`enemies.js`),
crate refill % (`mission.js`).
