# Squad & AI Guide — wiring the gameplay backbone

This covers the actors/components that make the HUD and command wheel *do* something:
the possessable `AToySoldier`, the `UToySquadComponent` command layer, and the
`AToyPlayerController`. It ports the prototype's `soldier.js` + `squad.js` + `main.js`.

> **Design choice — AI lives in the soldier's Tick (not a Behavior Tree, yet).**
> Because we already have *verified* AI logic from the prototype, I ported it straight
> into `AToySoldier::RunAIStep` (find target → move per order → fire with line-of-sight).
> It works without NavMesh setup and is easy to read. A Behavior Tree is the more
> scalable UE-native path; see "Upgrading to a Behavior Tree" at the bottom for when you
> outgrow this.

---

## 1. Class data assets (port of classes.js)

Content Browser → *Miscellaneous → Data Asset → `ToyClassData`*. Make four:

| Asset | Class | MoveSpeed | FireInterval | Damage | EngageRange | Spread° | Ability |
|---|---|---|---|---|---|---|---|
| `DA_Leader` | Leader | 400 | 0.14 | 16 | 4000 | 2.0 | Grenade |
| `DA_Heavy`  | Heavy  | 280 | 0.07 | 11 | 3200 | 5.0 | Suppress |
| `DA_Sniper` | Sniper | 360 | 1.0  | 90 | 9000 | 0.2 | Scope |
| `DA_Medic`  | Medic  | 420 | 0.18 | 13 | 3000 | 3.0 | Revive |

(These mirror the prototype's `classes.js`, scaled to UE centimeters.)

---

## 2. The soldier Blueprint

1. Make **BP_ToySoldier** from `AToySoldier`. Assign a skeletal mesh (a Third Person
   mannequin is fine to start; swap to a plastic-soldier model later) + an AnimBP.
2. The class already adds SpringArm + CineCamera + MacroLens + PlasticHealth in C++ —
   you don't re-add them.
3. Make 4 child BPs (or instances) and set **ClassData** to each `DA_*`, **Team = Green**.
4. Add a **Physical Material** on the foot/capsule if you also use the Baseplate Shuffle
   component (Script 2) — add `UBaseplateMovementComponent` here too if desired.
5. Implement the `OnAbilityActivated(AbilityType, AimPoint)` event for VFX/spawns
   (grenade actor, suppress state, scope handled by the camera, etc.). Revive is handled
   by the squad component automatically — see below.

### Enemies
Same `BP_ToySoldier` with **Team = Tan**, placed in the level. With `Order = Hold`
they'll shoot any Green in range/LOS; set `Order = Attack` (via a spawner or trigger)
to make them advance and hunt — the AI auto-acquires the nearest Green.

---

## 3. The player controller + squad

1. Make **BP_ToyPlayerController** from `AToyPlayerController`. Set it as the
   PlayerController in your **GameMode** (also set Default Pawn = None; the squad
   possesses a soldier itself).
2. Put your 4 green `BP_ToySoldier`s in the level. On the controller, fill
   **Squad → Members** with them in 1–4 order (or write a small spawn routine in
   BeginPlay that fills the array, then calls `InitializeSquad`).
3. Assign **HUDWidgetClass = WBP_ToyHUD** and **WheelWidgetClass = WBP_CommandWheel**
   (from the HUD guide).

---

## 4. Enhanced Input setup

Create these Input Actions (Content Browser → *Input → Input Action*) and an
**IMC_ToySoldier** mapping context:

| Action | Value type | Suggested keys |
|---|---|---|
| `IA_Move` | Axis2D | W/A/S/D (2D composite) |
| `IA_Look` | Axis2D | Mouse XY |
| `IA_Fire` | Digital | Left Mouse (set trigger so it fires while held) |
| `IA_Ability` | Digital | Space |
| `IA_Wheel` | Digital | Middle Mouse or `Q` (Hold) |
| `IA_Cycle` | Digital | Tab |
| `IA_Select` ×4 | Digital | 1, 2, 3, 4 |

Assign all of them + `MappingContext` on **BP_ToyPlayerController**. The C++ binds them
in `SetupInputComponent`; the mapping context is added in `BeginPlay`.

---

## 5. What each input does (already coded)

- **Move/Look** → standard third-person control of the possessed soldier.
- **Fire** → `AToySoldier::TryFire` at the crosshair (hitscan + `ApplyPointDamage`,
  which feeds the target's `PlasticHealthComponent`).
- **1–4 / Tab** → `SetActive` / `CycleNext` — possess that soldier; the one you leave
  reverts to AI on its standing order.
- **Wheel (hold)** → opens the radial; release issues the highlighted command via
  `IssueCommand` (Move/Attack to the crosshair, Hold, Regroup, or the active **Ability**).
- The squad component each tick: keeps the AI members in **formation** behind you, runs
  the **medic heal**, and **auto-switches** you to a survivor if your soldier goes down.

---

## 6. NavMesh (optional but recommended)

The ported AI steers with `AddMovementInput`, so it works without a NavMesh but won't
path around furniture. To get proper avoidance:
- Drop a **NavMeshBoundsVolume** over the play area; press **P** to visualize.
- Later, swap the movement in `RunAIStep` for an AIController `MoveToLocation` call (or
  move to the Behavior Tree below).

---

## Upgrading to a Behavior Tree (when you're ready)

The clean UE-native version, for when the squad grows or AI gets complex:

- **Blackboard keys:** `Order` (Enum), `MoveGoal` (Vector), `AttackTarget` (Object),
  `FormationSlot` (Vector), `EngageTarget` (Object).
- **Service `BTS_Engage`** (ticks on the root): find nearest enemy in range with LOS →
  set `EngageTarget`; copy the soldier's `Order`/`MoveGoal`/`FormationSlot` onto the
  blackboard.
- **Tree (Selector by Order):**
  - *Attack* → MoveTo `AttackTarget` (accept radius = engage range × 0.6) ∥ `BTT_FireAt`.
  - *Move* → MoveTo `MoveGoal`; on success set `Order = Hold`.
  - *Follow* → MoveTo `FormationSlot`; ∥ fire at `EngageTarget` if set.
  - *Hold* → Wait; ∥ fire at `EngageTarget` if set.
- **Task `BTT_FireAt`:** face `EngageTarget`, and if LOS + off-cooldown call the
  soldier's fire (factor the body of `FireBulletAt` into a `BlueprintCallable`).

Keep `AToyAIController` (a thin `AAIController` that `RunBehaviorTree` on possess) and
move the per-frame logic out of `RunAIStep`. The combat math (LOS, fire, find-enemy) is
already reusable — the tree just decides *when* to call it.
