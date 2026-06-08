# Toy Soldier — Unreal Engine 5 build

This folder is the **Unreal Engine 5** version of the game. We pivoted here from the
browser/Three.js prototype (kept in the repo root as `src/`) to chase a
photorealistic look — tiny molded-plastic green-vs-tan soldiers fighting across a
macro-scaled real-world household, with SOCOM / Conflict: Desert Storm tactics.

The Three.js prototype is **not thrown away** — it validated the gameplay rules we'll
rebuild here (squad orders, 4 classes, line-of-sight cover, suppression, abilities).
Treat it as the design spec.

---

## What's here

```
unreal/
  README.md                         ← you are here
  Docs/
    IMPLEMENTATION_GUIDE.md          ← the three core scripts: Blueprint steps + setup
    HUD_GUIDE.md                     ← building the tactical HUD in UMG + wiring
    SQUAD_AI_GUIDE.md                ← squad backbone: soldier/controller/AI setup
    CAMPAIGN_GUIDE.md                ← mission/campaign framework + authoring steps
    CAMPAIGN_MISSIONS.md             ← the 7 designed missions ("Operation Plastic Storm")
    MISSION1_BRINGUP.md              ← step-by-step checklist: code → playable M1
    ENEMY_SYSTEMS_GUIDE.md           ← spawners, sentry vision, patrols (per-mission use)
  Source/ToySoldier/
    ToySoldier.Build.cs              ← module dependencies
    Public/  ToyMacroCameraComponent.h     · ToyHUDTypes.h
             BaseplateMovementComponent.h  · ToyHUDWidget.h
             PlasticHealthComponent.h      · ToyCommandWheelWidget.h
             ToyClassData.h          ← per-class stats data asset (classes.js port)
             ToySoldier.h            ← possessable ACharacter + ported AI
             ToySquadComponent.h     ← switching, orders, formation, heal (squad.js)
             ToyPlayerController.h    ← input, wheel routing, HUD feed (main.js)
    Private/ (matching .cpp for every header above)
```

### Gameplay layer (the backbone)
- **`AToySoldier`** — a possessable `ACharacter` carrying the camera + macro lens +
  plastic health. Player-driven when active, AI-driven (ported `soldier.js`) otherwise:
  follows its order, finds enemies, fires only with line-of-sight, goes *downed*
  (revivable) instead of shattering.
- **`UToySquadComponent`** (on the controller) — the command layer: switch control
  (1–4 / Tab → possess), route wheel commands to orders, hold formation, medic heal,
  auto-switch on a man down, build HUD views.
- **`AToyPlayerController`** — Enhanced Input, the command-wheel routing, and the
  per-frame HUD/minimap feed.

See `Docs/SQUAD_AI_GUIDE.md` for the full editor setup (class data assets, input
actions, level wiring, and the optional Behavior Tree upgrade).

### Campaign layer (single-player missions)
- **`UToyMissionData` / `UToyCampaignData`** — a mission (objectives + level + briefing)
  and the ordered campaign, as editor Data Assets.
- **`UToyMissionComponent`** (on the GameMode) — tracks objective progress, unlocks the
  next objective in sequence, decides win/lose.
- **`AToyMissionGameMode`** — loads the mission, counts enemy eliminations + squad
  wipes, reports the result to the campaign.
- **`AToyObjectiveVolume`** — one box actor covering Reach / Secure / Defend / Collect /
  Rescue / Extract. **`AToyObjectiveTarget`** — a destructible Destroy target.
- **`UToyCampaignSubsystem` / `UToyCampaignSave`** — progression, unlocks, and save/load.

The campaign — **"Operation Plastic Storm," 7 unique missions** (assault, defend,
rescue, sabotage, stealth, combined-arms, boss/extract) across rooms of the house — is
designed in `Docs/CAMPAIGN_MISSIONS.md`; the authoring steps are in
`Docs/CAMPAIGN_GUIDE.md`.

The three C++ components implement, respectively:
1. **Dynamic Macro Lens Camera** — tilt-shift / shallow depth-of-field that tracks focus.
2. **Baseplate Shuffle** — surface-dependent movement penalties (hardwood vs carpet).
3. **Plastic Fracture Health** — procedural stress-crack decals + shatter-on-death.

Everything in C++ has an equivalent **Blueprint** recipe in `Docs/IMPLEMENTATION_GUIDE.md`,
so you can build it visually first and switch to C++ when you're ready.

---

## Prerequisites

- **Unreal Engine 5.3+** (5.4/5.5 fine). Install via the Epic Games Launcher.
- A **C++ project** (only if you want the C++ components):
  - In UE: *New Project → Games → Third Person → C++ → "ToySoldier"*.
  - This generates `ToySoldier.uproject` + a `Source/ToySoldier/` module. Copy the
    `Public/` and `Private/` files from here into that module, and merge the
    `Build.cs` dependencies.
  - Right-click the `.uproject` → *Generate Visual Studio / Xcode project files*,
    then build from the IDE (or let the editor compile on open).
- **Blueprint-only** is totally fine too — skip the C++ entirely and follow the
  guide's node steps. The Third Person template already gives you a controllable
  character to attach these systems to.

> First-timer tip: start in **Blueprints**. Get the camera and movement feeling right
> with live tweaking, then graduate the reusable bits (especially the health/fracture
> component) to C++ for performance and cleanliness.

---

## Build.cs dependencies these scripts need

```csharp
PublicDependencyModuleNames.AddRange(new string[] {
    "Core", "CoreUObject", "Engine", "InputCore",
    "CinematicCamera",   // UCineCameraComponent (macro lens)
    "Niagara"            // shatter VFX
});
```

---

## From the Three.js prototype → UE5 (what maps to what)

| Prototype (`src/`)            | UE5 home                                              |
|-------------------------------|-------------------------------------------------------|
| `soldier.js` player/AI unit   | `ACharacter` + AI Controller / Behavior Tree          |
| `squad.js` order system       | A `SquadComponent` + AI Blackboard ("Order" enum)     |
| `physics.js` line-of-sight    | `LineTraceByChannel` (Visibility) — engine built-in   |
| `bullets.js`                  | Projectile actor or hitscan + `ApplyPointDamage`      |
| `classes.js` class stats      | A `DataTable` of class rows (DataAsset)               |
| HUD (`hud.js`, `index.html`)  | **UMG** widgets (objective, minimap, squad, ability wheel) |
| `world.js` arena              | A built UE **Level** (living-room floor + props)      |

The three scripts below are the *new* toy-specific systems that make UE worth it —
they lean into the photoreal-plastic-at-toy-scale fantasy.
