# Mission 1 Bring-Up — from code to playable

A precise, ordered checklist to get **M1 "Beachhead"** running. Do these in order; each
step builds on the last. Goal: a living-room level where you command 4 green soldiers,
clear ~6 tan, secure the coffee table, and see win/lose.

Check off as you go. ☐

---

## A. Project + compile
1. ☐ Epic Launcher → install **UE 5.3+**.
2. ☐ New Project → **Games → Third Person → C++**, name it **ToySoldier**.
3. ☐ Close the editor. Copy this repo's `unreal/Source/ToySoldier/Public/*` and
   `Private/*` into the project's `Source/ToySoldier/` (`Public/` + `Private/`).
4. ☐ Merge `unreal/Source/ToySoldier/ToySoldier.Build.cs` dependencies into the
   project's generated `ToySoldier.Build.cs`.
5. ☐ Right-click `ToySoldier.uproject` → **Generate project files** → open in IDE →
   **Build**. Fix any include/typo the compiler flags (expected on first build of
   hand-written code), then launch the editor.

> If the editor opens and the new classes appear under *All Classes* (search
> "ToySoldier", "PlasticHealth", "ToyMissionGameMode"), the module compiled. ✅

## B. Class data (the 4 soldiers' stats)
6. ☐ Content Browser → make 4 **ToyClassData** assets: `DA_Leader`, `DA_Heavy`,
   `DA_Sniper`, `DA_Medic`. Fill from the table in `SQUAD_AI_GUIDE.md §1`
   (set ClassType + Ability: Leader=Grenade, Heavy=Suppress, Sniper=Scope, Medic=Revive).

## C. The soldier blueprint
7. ☐ Make **BP_ToySoldier** from `AToySoldier`. Assign the Third Person mannequin mesh +
   its AnimBP to the inherited `Mesh` (skeletal mesh) so it's visible.
8. ☐ Make **BP_ToyGrenade** from `AToyGrenade` (assign any small sphere mesh). On
   `DA_Leader`'s soldier, set **GrenadeClass = BP_ToyGrenade** (set it on the green
   leader instance, or make a `BP_Leader` child with ClassData=DA_Leader + GrenadeClass).
9. ☐ Quickest path: make 4 child BPs `BP_Green_Leader/Heavy/Sniper/Medic`, each with
   **ClassData** set and **Team = Green**. Make `BP_Tan_Rifleman` with ClassData
   (reuse DA_Leader or a weaker `DA_TanRifleman`) and **Team = Tan**.

## D. Input (Enhanced Input)
10. ☐ Create Input Actions + **IMC_ToySoldier** per `SQUAD_AI_GUIDE.md §4`:
    `IA_Move, IA_Look, IA_Fire, IA_Ability, IA_Aim, IA_Wheel, IA_Cycle, IA_Select×4`.
    - `IA_Aim` = Right Mouse (Heavy suppress / Sniper scope).
    - `IA_Wheel` = Middle Mouse or Q (command wheel).

## E. HUD widgets
11. ☐ Build **WBP_ToyHUD** (reparent to `ToyHUDWidget`) and **WBP_CommandWheel**
    (reparent to `ToyCommandWheelWidget`) per `HUD_GUIDE.md`. To start, you only need:
    `MissionTitleText`, `MissionSubtitleText`, `WeaponText`, `AmmoText`, a crosshair,
    and the `UpdateObjectives` event drawing a simple text list. Add the squad/minimap
    panels after the loop works.

## F. Player controller + GameMode
12. ☐ Make **BP_ToyPlayerController** (from `AToyPlayerController`). Assign all Input
    Actions + `IMC_ToySoldier`, and `HUDWidgetClass=WBP_ToyHUD`,
    `WheelWidgetClass=WBP_CommandWheel`.
13. ☐ Make **BP_ToyMissionGameMode** (from `AToyMissionGameMode`). Set PlayerController =
    BP_ToyPlayerController, **Default Pawn = None**.

## G. The level
14. ☐ New Level "L_M1_LivingRoom". Add a floor, a `NavMeshBoundsVolume` (press **P** to
    confirm green nav coverage), a "coffee table" block, and a few crate covers.
15. ☐ Place the 4 green soldiers + ~6 tan (`BP_Tan_Rifleman`, Order=Hold) around the map.
16. ☐ Select BP_ToyPlayerController defaults won't hold level refs, so add a small
    **Level Blueprint** step OR set the squad on a placed controller: easiest is a
    `BeginPlay` in the Level BP that gets the player controller, casts to
    `BP_ToyPlayerController`, and sets `Squad → Members = [the 4 greens]`, then calls
    `Squad → InitializeSquad`. (Or fill `Members` on a placed controller actor.)
17. ☐ Place one **AToyObjectiveVolume** under the coffee table: `ObjectiveId = "secure"`,
    `Mode = Secure`.

## H. The mission asset
18. ☐ Make **DA_M1_Beachhead** (ToyMissionData): Title "BEACHHEAD", Subtitle
    "SECTOR: LIVING ROOM FLOOR", Level = L_M1_LivingRoom. Objectives:
    1. `eliminate` / Eliminate / Required **0** (auto-counts the tan) / "ELIMINATE THE TAN PATROL".
    2. `secure` / Secure / Required **15** / "SECURE THE ARTILLERY OUTPOST".
19. ☐ On **BP_ToyMissionGameMode**, set **DefaultMission = DA_M1_Beachhead**.
20. ☐ World Settings → **GameMode Override = BP_ToyMissionGameMode**.

## I. Play test
21. ☐ Press Play. Verify, in order:
    - You possess a green soldier; WASD/mouse move + look; **1–4 / Tab** switch soldiers.
    - **LMB** fires; tan soldiers crack and go down; the Eliminate count rises.
    - Switch to the Heavy, hold **RMB** → suppress; Sniper hold **RMB** → scope zoom;
      Leader **Space** → grenade arc; Medic **Space** near a downed mate → revive.
    - Hold **wheel key**, flick toward a segment, release → squad obeys (Move/Attack/Hold).
    - Stand the squad on the coffee table 15s → **mission complete**.
    - Let the squad get wiped → **mission failed**.

## J. Then: campaign
22. ☐ Make `DA_Campaign` (ToyCampaignData) with `[DA_M1_Beachhead]`; on a
    `BP_ToyGameInstance`, call `ToyCampaignSubsystem → SetCampaign(DA_Campaign)`.
23. ☐ Build a 2-button menu (Play → `StartMission(0)`). Now you have a shippable loop to
    hang M2–M7 on (`CAMPAIGN_MISSIONS.md`).

---

### Most likely first-compile fixes
- A missing `#include` for a component type → add it to the .cpp.
- `Tick` not firing on an actor → confirm `PrimaryActorTick.bCanEverTick = true`.
- Soldiers not moving as AI → place a `NavMeshBoundsVolume` (or they still steer via
  `AddMovementInput`, but won't avoid obstacles).
- Point damage not cracking → shooters must use `ApplyPointDamage` (the soldier already
  does); confirm the target has a `PlasticHealthComponent`.
