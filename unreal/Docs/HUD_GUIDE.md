# HUD Guide — building the tactical interface in UMG

This recreates the reference HUD (objective banner, compass minimap, squad-integrity
panel, weapon/ammo readout, incoming-fire warning, and the radial command wheel),
customized to our gameplay: 4 toy classes, squad orders, class abilities, plastic
integrity.

The C++ classes (`UToyHUDWidget`, `UToyCommandWheelWidget`) own the *behavior*. You
build the *look* in Widget Blueprints (WBP) that reparent to those classes. C++ can't
ship UMG assets, so this is the in-editor half.

---

## Shared style (do this once for the "AAA tactical" feel)

- **Font:** a condensed/monospace military face (e.g. *Saira Condensed*, *Oswald*,
  or UE's *Roboto Mono*). Import as a Font asset.
- **Panels:** dark translucent background — color `(0.04, 0.08, 0.04)` alpha `0.62`.
  Add **bracket corners** with 4 small Image marks (the `⌐ ¬ L ⌐` corner ticks in the
  refs) for that readout-frame look.
- **Text colors:** friendly green `#B8FFB8`, neutral white `#EAF2EA`, warnings red
  `#FF3B30`, integrity bar green→amber→red by value.
- Turn on a global **Post Process Volume** with mild **Bloom** so emissive HUD text and
  the green dot-sight glow.

---

## 1. WBP_ToyHUD (reparented to `UToyHUDWidget`)

Create *Widget Blueprint → pick parent class `ToyHUDWidget`*. Root = **Canvas Panel**.
Add these, anchored to the corners (names in **bold** MUST match the C++ `BindWidget`s):

| Element | Anchor | Contents |
|---|---|---|
| Objective frame | top-left | Text `OBJECTIVE:` + **`ObjectiveText`** (TextBlock) |
| Minimap frame | top-right | `WBP_Minimap` (below) + label "MINI-MAP: SECTOR …" |
| Squad frame | bottom-left | a Vertical Box `SquadList` that holds squad cards |
| Weapon frame | bottom-right | **`WeaponText`** + **`AmmoText`** + a class icon |
| Warning banner | top-center | a Border **`WarningRoot`** containing **`WarningText`** |
| Crosshair | center | the green reticle image (and your dot-sight when ADS) |

> `WarningText`/`WarningRoot` are `BindWidgetOptional` — the HUD still works if you skip
> them, but add them for the "INCOMING FIRE" banner. Keep `WarningRoot` hidden by
> default; `SetWarning(text, true/false)` toggles it.

### Squad cards (the [ABLE 1] / [ABLE 2] panel)
1. Make **WBP_SquadCard** with: callsign text, class name, an integrity **ProgressBar**,
   integrity %, an ammo text, and a status/order text. Style the "player" card with a
   bright border; gray out a `bDowned` card.
2. In **WBP_ToyHUD**, implement the `Event Update Squad(Members)` (it's the C++
   `BlueprintImplementableEvent`):
   - Clear `SquadList` children.
   - For each `FSquadMemberView` in `Members`: Create Widget `WBP_SquadCard`, push the
     struct's fields into it (Callsign, IntegrityPct → bar + "%d%%", Ammo/Reserve,
     Order → text, `bPlayerControlled` → "PLAYER"/"YOU" style, `FractureWarning` →
     show "FRACTURE WARNING: LEFT ARM" line when non-empty), Add Child to `SquadList`.

### Minimap (WBP_Minimap)
1. A circular radar Image + a compass "N" + a translucent **view cone** triangle at
   center pointing up, and a `Canvas Panel` **`BlipLayer`** for dots.
2. Implement `Event Update Minimap(Blips)`:
   - Clear `BlipLayer`. For each `FMinimapBlip`, add an Image (green if `bPlayer`,
     bright green for squad, red/tan if `bEnemy`), and set its position to
     `Local * Radius` (Local is already in [-1,1]; multiply by the radar's pixel radius,
     remember screen +Y is down so negate Y).
3. Build the `Blips` array in your controller using the C++ helper
   **`ProjectToMinimap(TargetLoc - PlayerLoc, CameraYaw, RangeUU)`** — it returns the
   Local position with the player's facing pointing up.

---

## 2. WBP_CommandWheel (reparented to `UToyCommandWheelWidget`)

The radial order/ability menu — "[ABLE 2] → SUPPRESSIVE FIRE" in the ref.

1. Reparent a new WBP to `ToyCommandWheelWidget`. Build a ring of **5 segment images**
   (Move / Attack / Hold / Regroup / Ability) with an icon + label each, arranged
   clockwise from the top. Put a label in the center for the highlighted command.
2. The C++ default `Segments` array already lists those 5 in order; the *visual* order
   must match (top = index 0, clockwise). Tweak `Segments`/`DeadZone`/`MouseSensitivity`
   in the WBP defaults if desired.
3. Implement the three events:
   - `On Wheel Opened` → play an open animation, reset highlights.
   - `On Highlight Changed(Index, Command)` → glow segment `Index` (or none if `-1`),
     set the center label to the Command's display name.
   - `On Wheel Closed(Picked)` → play a close animation.

The selection math (mouse/stick → highlighted segment) is done for you in C++; the WBP
just reacts to `OnHighlightChanged`.

---

## 3. Wiring it up (PlayerController)

In your PlayerController (BP or C++):

**BeginPlay**
- `Create Widget` WBP_ToyHUD → `Add to Viewport`, store as `HUD`.
- `Create Widget` WBP_CommandWheel → `Add to Viewport`, store as `Wheel`
  (it starts Collapsed via `NativeConstruct`).

**Every Tick (or a 0.1s timer)** — push live data:
- Build a `TArray<FSquadMemberView>` from your squad (callsign, integrity from the
  `PlasticHealthComponent.GetIntegrity()`, ammo, order, who's possessed) → `HUD->UpdateSquad`.
- `HUD->UpdateWeapon("M4A1 PLASTIC OVERMOLD (SUPPRESSED)", Ammo, Reserve)`.
- `HUD->UpdateObjective(...)` when the mission objective changes.
- `HUD->SetWarning("WARNING: INCOMING FIRE // CRITICAL INTEGRITY", bUnderFireOrLowHP)`.
- Build minimap `Blips` with `ProjectToMinimap(...)` for each squadmate + known enemy
  → `HUD->UpdateMinimap`.

**Command wheel input**
- On a *hold* action (e.g. `MiddleMouse` or `LB`): `Wheel->OpenWheel()`. While held,
  each frame feed mouse delta: `Wheel->AddSelectionInput(MouseDelta)` (or
  `SetSelectionVector(RightStick)` for gamepad).
- On release: `EToyCommand Cmd = Wheel->CloseAndPick();` then route it to your squad:
  - `Move`   → order squad to the aim-trace ground point
  - `Attack` → order squad onto the enemy under the crosshair
  - `Hold`   → squad holds position
  - `Regroup`→ squad follows the player
  - `Ability`→ trigger the active soldier's class ability (grenade/suppress/scope/revive)

That command routing is the direct port of `squad.js`'s `orderMove/orderAttack/
orderHold/orderFollow` and the ability handling in `main.js` from the prototype.

---

## Build order

1. WBP_ToyHUD with static text first (hardcode objective/ammo) — see it on screen.
2. Wire `UpdateWeapon`/`UpdateObjective`/`SetWarning` from the controller.
3. Squad cards + `UpdateSquad`.
4. Minimap + `ProjectToMinimap` + `UpdateMinimap`.
5. Command wheel last (needs the squad-order routing to do anything).
