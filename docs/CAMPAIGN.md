# THE LONG WAY HOME — Campaign (v3, the build of record)

> Supersedes `unreal/Docs/CAMPAIGN_THE_LONG_WAY_HOME.md` (v2). The journey is
> the same; the mission map is re-cut to match what Mission 1 actually became:
> the WHOLE ground floor (living room, hallway, kitchen, study) is one mission,
> so the old "Hallway" and "Kitchen" missions are absorbed and the journey
> continues outdoors. The WEB build (`src/`) is the build of record; the UE5
> track under `unreal/` is parked as a future native/visual target.

## The premise

A squad of green toy soldiers is flying their toy plane home to the toy store
when they're shot down — they crash through a window into a stranger's house.
The house and the world beyond it are held by the tan army. The whole campaign
is one long fighting retreat HOME: escape the house, cross the street, survive
the detour, reach the store.

Tone: Army Men — big furniture, toy-scale drama, played straight.

## The structural rules

1. **No wave-defense filler.** Missions are exploration: you move through a
   real place and ENCOUNTER the enemy where it lives. Fights happen at posts,
   patrols, and garrisons — never at a spawner.
2. **Missions end by REACHING somewhere** — a door, a drain, a fence gap, a
   shelf — never by surviving a timer.
3. **One mission perfected before the next** (Sean's rule).
4. **A mission is a structure, not a route** — multiple acts, parallel
   objectives, a pressure system, and a reason to enter every zone
   (`docs/MISSION_DESIGN_M1.md` is the template).

## The journey (each environment = one mission, one world builder)

| # | Mission | World id | Environment | Core structure | Story beat |
|---|---------|----------|-------------|----------------|------------|
| 1 | **CRASH SITE** ✅ built | `house` | Ground floor, dusk | Regroup scattered squad → supplies + cut the alarm radio (scout-runner pressure) → breach the front door | The crash. Alone, then a squad again. |
| 2 | **OUT THE DOOR** | `porch` | Porch + front garden, night | Fight DOWN (steps, flowerpots) → cross open garden under a porch-light "searchlight" cycle → reach the gate | **THE LOSS: a squadmate is taken covering the gate.** The squad swears the detour. |
| 3 | **THE STREET** | `street` | Sidewalk, gutter, parked car, night | Recon/stealth: tail a tan convoy, recover intel on where their friend was taken; traffic = periodic lethal crossings | Grief turns to purpose. |
| 4 | **THE STORM DRAIN** | `drain` | Under the street, dark | The detour: tight tunnels, blind corners, sound matters double; sabotage the tan supply cache | The squad at its lowest, literally. |
| 5 | **THE BACKYARD WAR** | `backyard` | Neighbor's backyard, dawn | Combined-arms assault on the tan staging ground; **rescue the lost squadmate** | The reunion — or the goodbye. |
| 6 | **THE TOY STORE** | `store` | Aisles, home | Boss + final extract to the home shelf | Home. The plane on the shelf is the last shot. |

## What carries between missions

- The same four soldiers (Leader / Heavy / Sniper / Medic). The loss in M2 is
  scripted to the story, not to attrition.
- The systems: stealth (sight/sound/search), silent takedowns, the noise rules,
  ammo economy, squad orders. Each mission adds ONE new pressure mechanic
  (M1: the alarm radio. M2: the light cycle. M3: traffic. M4: darkness/sound.
  M5: combined arms. M6: the boss).
- The wrecked plane is the visual motif: fresh wreck in M1, the shelf plane in M6.

## Engine reality

- `src/world.js` — `WORLDS` registry: one builder per environment, returning
  `{ scene, obstacles, coverPoints, bounds, nav, exit, map, ...props }`.
  Missions name their world by id; nothing about "the house" is global.
- `src/missions.js` — defs with `world`, `scatter`, `stages` (regroup / multi
  parts / escape so far — new stage types land as the journey needs them).
- `?smoke=1` — regression harness; run it after any systems change.

## Status

M1 CRASH SITE: built, deployed, in Sean's playtest loop (pacing/feel tuning).
M2 OUT THE DOOR: next up after M1 sign-off — needs the `porch` world builder,
the light-cycle mechanic, and the loss script (a scripted capture beat at the
gate, not a death roll).
