# Enemy Systems Guide — spawners, sentries, patrols

Three dynamic systems that make the campaign missions work and the levels feel alive.
All C++; you place/configure them in the editor.

| Class | Use it for |
|---|---|
| `AToyEnemySpawner` | Defend/Survive waves (M2), the finale's counterattacks (M7), alarm reinforcements (M5) |
| `UToyVisionComponent` | Sentries that detect the squad — the heart of the stealth mission (M5) |
| `UToyPatrolComponent` | Guards that walk a route until alerted — flavor + stealth everywhere |

---

## AToyEnemySpawner — waves of tan

Drop it in the level where enemies should appear from (under the door, behind cover).

**Key settings**
- `EnemyClass` — your `BP_Tan_*` soldier.
- `NumWaves`, `EnemiesPerWave`, `TimeBetweenWaves` — the cadence.
- `MaxAlive` — caps concurrent enemies so it stays fair/performant.
- `SpawnRadius` — enemies appear within this of the spawner (dropped to the floor).
- `SpawnOrder` — usually **Attack** so they advance on the squad.
- `bAutoStart` — on for M2/M7; **off** for alarm-triggered reinforcements (M5).

**API**
- `StartWaves()` — begin the timed sequence.
- `TriggerWave()` — spawn one wave right now (wire a sentry's alarm to this).
- `OnWavesComplete` — fires when the last wave spawns (e.g. flip a "survive" beat).

Every spawned enemy is auto-registered with the mission GameMode, so its death counts
toward Eliminate objectives — no extra wiring.

**M2 "Hold the Doormat":** one spawner outside the door, `bAutoStart=true`, several
waves; pair with a `Survive` objective (90s) and a `Defend` volume at the inner hall.

---

## UToyVisionComponent — sentries that see

Add it to a tan `BP_ToySoldier` to make it a sentry.

**Behavior:** each tick it sweeps a cone (`ViewDistance`, `ViewHalfAngleDeg`) for green
soldiers with a clear line of sight. Sight fills an **awareness meter** over
`TimeToDetect` seconds (so you get a beat to break contact). At full awareness it
**spots** you: the sentry switches to `Attack` and `OnTargetSpotted` fires. No contact
for `ForgetTime` seconds → it calms back to `Hold`.

**Wire the alarm (M5 "Lights Out"):** bind `OnTargetSpotted` → a spawner's
`TriggerWave()` so getting seen summons reinforcements. Use `Awareness` (0–1) to drive a
floating "?"→"!" indicator over the sentry.

> The Sniper's scope + one-shot is the intended counter: drop a lone sentry before its
> meter fills. A miss raises the alarm — that's the tension.

---

## UToyPatrolComponent — guards on a route

Add it to a tan soldier and fill `Waypoints` with empty actors / Target Points placed
in the level (in order).

**Behavior:** steers the soldier point-to-point using its existing `Move` order. When
the soldier becomes `Attack` (a sentry spotted you, or it took fire), patrolling
**pauses** for combat; when it calms down it **resumes** the route. `bLoop` cycles;
otherwise it ping-pongs.

**Combine:** a patrolling sentry = `UToyPatrolComponent` + `UToyVisionComponent` on the
same soldier. It walks its beat, and if it catches you in its cone, it stops, engages,
and rings the alarm.

---

## Putting it together per mission
- **M2 Hold the Doormat:** spawner(s) auto-start waves + `Survive` + `Defend`.
- **M5 Lights Out:** patrolling sentries with vision; `OnTargetSpotted` → a
  non-auto spawner's `TriggerWave`; optional "no-alarm" bonus fails if any sentry spots.
- **M7 Toybox Throne:** a boss target + spawners that `TriggerWave` on phase changes +
  a `Survive` beat before the timed `Extract`.

These hook into the mission framework with zero glue code — spawned enemies register
themselves, and sentries just flip orders the squad AI already understands.
