# Campaign Guide — building missions with the framework

How the mission/campaign system fits together, and the steps to author a mission. The
seven designed missions are in CAMPAIGN_MISSIONS.md.

## The pieces

| Class | Role |
|---|---|
| `UToyMissionData` | One mission as data: title, briefing, ordered objectives, level |
| `UToyCampaignData` | The ordered list of missions = the campaign |
| `UToyMissionComponent` | Runtime objective tracker (lives on the GameMode) |
| `AToyMissionGameMode` | Loads the mission, wires kills/squad-wipe, reports the result |
| `AToyObjectiveVolume` | A box for Reach / Secure / Defend / Collect / Rescue / Extract |
| `AToyObjectiveTarget` | A destructible Destroy target (uses plastic health) |
| `UToyCampaignSubsystem` | Progression: current mission, unlocks, save/load |
| `UToyCampaignSave` | The persisted save data |

**Flow:** Campaign subsystem knows the current mission → opens its level → the level's
`AToyMissionGameMode` reads that mission and `BeginMission` → objective actors in the
level report progress to the mission component → on all-required-complete it ends the
mission → the GameMode tells the campaign to unlock the next + save → end screen.

## How objectives unlock
The mission's objective array is the **main line**: only one non-optional objective is
`Active` at a time; completing it activates the next. `bOptional` objectives are
`Active` from the start and never block completion. The mission is **won** when every
non-optional objective is `Completed`, and **lost** when the whole squad is down (or a
`Defend` zone is breached).

## Authoring one mission

1. **Create the level** (a household scene). Add a `NavMeshBoundsVolume` for AI paths.
2. **Place soldiers:** 4 Green `BP_ToySoldier` (your squad) + Tan ones (enemies). Fill
   the player controller's `Squad → Members` with the greens.
3. **Place objective actors**, each with an `ObjectiveId`:
   - `AToyObjectiveVolume` — set `Mode` (ReachZone/Secure/Defend/Collect/Rescue/Extract).
   - `AToyObjectiveTarget` — for Destroy targets; give it a mesh (battery, stapler…).
4. **Create the mission asset:** *Data Asset → ToyMissionData*. Fill Title/Subtitle/
   Briefing, set `Level` to this map, and add `Objectives` whose `ObjectiveId`s match the
   actors you placed. Order them as the main line; mark side ones `bOptional`.
   - For Eliminate, leave `Required = 0` to auto-count the tan soldiers present.
   - For Survive/Secure, `Required` is in **seconds**.
5. **Set the GameMode:** in World Settings, GameMode = `BP_ToyMissionGameMode` (child of
   `AToyMissionGameMode`), Default Pawn = None. Set its `DefaultMission` to this asset so
   the level is playable on its own (the campaign overrides it when launched in sequence).
6. **Wave spawners (optional):** any BP that spawns tan soldiers should call
   `GameMode->RegisterEnemy(NewSoldier)` so their deaths count toward Eliminate.

## Wiring the campaign

1. Create a `UToyCampaignData` asset and add the 7 mission assets in order.
2. On a **GameInstance** (Project Settings → Maps & Modes → set a `BP_ToyGameInstance`),
   on Init get the `ToyCampaignSubsystem` and call `SetCampaign(YourCampaignData)`.
   (`SetCampaign` also loads saved progress.)
3. **Level select / main menu** (a UMG menu): list missions, gray out locked ones
   (`IsUnlocked(i)`), and on click call `StartMission(i)` — it opens that mission's level.
4. **End screen:** implement `AToyMissionGameMode::OnMissionResult(bSuccess)` (a BP event)
   to show win/lose UI. On win, the next mission is already unlocked + saved; offer
   "Next Mission" → `Campaign->StartMission(CurrentIndex + 1)`.

## HUD hookup
The player controller already pushes objectives to the HUD every frame
(`UpdateObjectives` + `UpdateMissionHeader`). In `WBP_ToyHUD`, implement
`UpdateObjectives(Objectives)` to draw a checklist: one line per `FObjectiveView` with a
check mark when `State == Completed`, an "✗" when `Failed`, a dimmer style for optional,
and `Progress / Required` for counted ones (e.g. "ELIMINATE 4/6"). Implement
`ShowMissionResult(bSuccess)` for the end card.

## Build order
1. Get M1 ("Beachhead") fully playable: level + squad + 6 tan + a Secure volume + the
   mission asset. Verify win (secure held) and lose (squad wiped).
2. Add the campaign data + subsystem + a 2-button menu (Play / Continue).
3. Author M2…M7 from CAMPAIGN_MISSIONS.md, reusing the same actors.
