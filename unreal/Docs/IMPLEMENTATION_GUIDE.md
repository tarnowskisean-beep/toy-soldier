# Implementation Guide — the three core toy-soldier scripts

Each script is presented twice: a **Blueprint** recipe (node-by-node) and a pointer to
the **C++** component that does the same thing. Build in Blueprints first if you're
new; switch to the C++ components when you want them reusable and fast.

Glossary: *node* = a box in the Blueprint graph. *pin* = a connection dot on a node.
*struct* = a bundle of variables. *component* = a reusable behavior you add to an Actor.

---

## SCRIPT 1 — Dynamic Macro Lens Camera (tilt-shift depth of field)

**Goal:** the camera focuses on whatever you look at and blurs everything else, like a
macro photo, to make the toys feel 2 inches tall.

**Key correction:** use a **CineCameraComponent** on your character (not a plain
CameraComponent). Only the cine camera exposes *Focus Method → Manual*, *Manual Focus
Distance*, and *Aperture (Current Aperture)*.

### Variables
| Name | Type | Default |
|---|---|---|
| `FocusDistance` | float | 1500 |
| `MaxTraceDistance` | float | 2000 |
| `FallbackFocus` | float | 1500 |
| `Aperture` | float | 1.4 |
| `FocusInterpSpeed` | float | 8 |

### One-time setup
1. Open your character Blueprint. Add a **CineCameraComponent** (parent it to a Spring
   Arm if you want third-person). Select it.
2. In Details → *Current Camera Settings → Focus Settings*: set **Focus Method = Manual**.
3. Set *Lens Settings → Current Aperture* to **1.4** (or 2.0).

### Graph (run on a repeating timer, not Event Tick, for performance)
1. **Event BeginPlay → Set Timer by Function Name** — Function Name = `UpdateFocus`,
   Time = `0.03`, Looping = ✔. (Make `UpdateFocus` a Custom Event or function.)
2. In **`UpdateFocus`**:
   - **Get** the CineCamera → **GetWorldLocation** (this is `Start`).
   - CineCamera → **GetForwardVector** → **× MaxTraceDistance** → **+ Start** = `End`.
   - **Line Trace By Channel** — Start=`Start`, End=`End`, Channel=*Visibility*.
   - **Branch** on *Return Value*:
     - True → break *Out Hit* → **Impact Point** → **Vector Distance** (A=Start,
       B=ImpactPoint) → set `TargetFocus`.
     - False → `TargetFocus = FallbackFocus`.
   - **FInterp To** — Current=`FocusDistance`, Target=`TargetFocus`,
     Delta Time=`0.03`, Interp Speed=`FocusInterpSpeed` → **Set `FocusDistance`**.
   - CineCamera → **Set Manual Focus Distance** = `FocusDistance`.
   - CineCamera → **Set Current Aperture** = `Aperture`.

### Polish
- Add a global **Post Process Volume** (Unbound) and turn on a subtle bloom +
  ACES tone mapping for the "real camera" look.
- A real tilt-shift effect can be approximated by keeping the aperture low and the
  camera pitched slightly downward.

**C++ equivalent:** `UToyMacroCameraComponent` — add it to the character, assign the
cine camera (or leave empty to auto-find), done.

---

## SCRIPT 2 — Baseplate Shuffle (surface movement penalty)

**Goal:** soldiers glide on hardwood, bog down ~40% on shag carpet.

### Physical Material setup (do this first or nothing works)
1. *Content Browser → Add → Physics → Physical Material.* Make two:
   **`PM_Hardwood`** and **`PM_ShagCarpet`**.
2. On your **floor materials** (the wood material, the carpet material): open each
   Material, and in Details set **Phys Material** to the matching asset.
   *(Alternative: use Surface Types in Project Settings → Physics and assign per
   material — the Phys Material route is simpler to start.)*
3. Project Settings → Physics → ensure **"Return Physical Material" tracing** is
   possible (it is by default; you enable it per-trace below).

### Variables
| Name | Type | Notes |
|---|---|---|
| `PM_Hardwood`, `PM_ShagCarpet` | PhysicalMaterial (object ref) | assign in Details |
| `HardwoodSpeed` / `CarpetSpeed` / `DefaultSpeed` | float | 400 / 240 / 400 |
| `CurrentSurface` | PhysicalMaterial | last detected, to avoid re-applying |

### Graph (inside the Character; tick or a 0.1s timer)
1. **GetCapsuleComponent → GetWorldLocation** = `Start`.
2. **GetCapsuleComponent → GetScaledCapsuleHalfHeight → + 20** → make Vector
   `(0,0,that)` → `Start − Vector` = `End`.
3. **Line Trace By Channel** — Start/End as above, Channel=*Visibility*, and tick
   **Return Physical Material = true** on the node.
4. Break *Out Hit* → **Phys Material** pin → **Branch** (is it != `CurrentSurface`?).
5. If changed, **Switch** (compare the Phys Material against `PM_Hardwood` /
   `PM_ShagCarpet` with **Equal (Object)** nodes):
   - **Hardwood:** *Get Character Movement → Set Max Walk Speed = 400*; stop the old
     loop sound; **Spawn Sound Attached** `SFX_Plastic_Scrape_Wood`.
   - **Carpet:** *Set Max Walk Speed = 240*; **Spawn Sound Attached**
     `SFX_Plastic_Muffled_Drag`.
   - Store the new surface in `CurrentSurface`.

### Notes
- Set the loop SoundBases to **Looping**, and keep a reference so you can **Stop** the
  previous one when the surface changes.
- Enhancement: pause the loop when velocity ≈ 0 so a standing toy is silent.

**C++ equivalent:** `UBaseplateMovementComponent` — add to the character, assign the two
PhysicalMaterials + speeds + loop sounds.

---

## SCRIPT 3 — Plastic Fracture Damage (stress cracks + shatter)

**Goal:** hits stamp white plastic cracks; at 0 integrity the toy bursts into shards.

### Asset setup
- **Crack decal:** a Material (Domain = *Deferred Decal*) using a jagged white
  crack mask (opacity-masked). Make a few mask variants for variety.
- **Shatter VFX:** a **Niagara** system (`FX_Plastic_Shatter_Hollow`) emitting rigid
  green/tan mesh shards with gravity + short life. *(Cascade is deprecated — use
  Niagara. For AAA shards, a **Chaos Geometry Collection** of the soldier is the
  real-deal "hollow plastic" break, swapped in on death.)*

### Variables (on an Actor Component `BPC_PlasticHealth`)
| Name | Type | Default |
|---|---|---|
| `PlasticIntegrity` | float | 100 |
| `CrackDecalMaterial` | Material | — |
| `ShatterFX` | NiagaraSystem | — |
| `bShattered` | bool | false |
| `DestroyDelay` | float | 0.25 |

### Graph
1. **Event BeginPlay → Bind Event to OnTakePointDamage** (owner). Use **PointDamage**,
   not AnyDamage — it carries *Hit Location* and *Shot From Direction*.
   - Shooters must deal damage with **Apply Point Damage** (hitscan) or a projectile
     that calls it on hit.
2. In the bound event:
   - **Branch**: `bShattered == false` AND `Damage > 0`.
   - **Spawn Decal Attached** — Material=`CrackDecalMaterial`, Attach To = the
     **Skeletal Mesh**, Location = *Hit Location*, Rotation = (Shot From Direction ×
     −1) → **RotationFromXVector**, Life Span = 0 (permanent), Size ≈ (4,6,6).
   - `PlasticIntegrity = PlasticIntegrity − Damage`.
   - **Branch**: `PlasticIntegrity <= 0` → call **`ShatterAndDie`**.
3. **`ShatterAndDie`** function:
   - `Set bShattered = true`.
   - **Set Actor Enable Collision = false**.
   - Mesh → **Set Pause Anims = true** (and optionally **Set Visibility = false**).
   - Character Movement → **Disable Movement**.
   - **Spawn System At Location** (Niagara) = `ShatterFX` at actor location.
   - (Optional) call an event/dispatcher `OnPlasticShattered` for squad/scoring.
   - **Set Life Span = `DestroyDelay`** (auto-destroys the actor).

**C++ equivalent:** `UPlasticHealthComponent` — add to the soldier, assign the crack
material + Niagara system; it binds point damage and shatters automatically, and
exposes an `OnPlasticShattered` delegate + `GetIntegrity()` for the HUD.

---

## How these wire into the bigger game

- **HUD** (your reference screenshots): build with **UMG** — bind the squad panel's
  "Integrity %" to each soldier's `GetIntegrity()`, drive the ability radial wheel from
  the class enum, and feed the minimap from actor positions.
- **Squad AI**: rebuild `squad.js` orders (Follow/Hold/Move/Attack) as a **Behavior
  Tree + Blackboard**; the player possesses one `ACharacter` and switches with 1–4.
- **Classes**: a **DataTable** row per class (speed, fire rate, damage, ability) — the
  direct analog of `classes.js`.

Build order suggestion: (1) Third Person template walking on a wood floor → (2) drop in
Script 1 camera for the toy-scale feel → (3) Script 2 surfaces → (4) Script 3 damage →
(5) UMG HUD → (6) squad switching + AI.
