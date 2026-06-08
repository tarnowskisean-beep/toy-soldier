# Campaign — "OPERATION PLASTIC STORM"

The Green Army must retake the house, room by room, from the Tan Menace. Seven
missions, each built around a **different core verb** so no two play alike. Every
mission maps onto the objective framework (`EObjectiveType`) and the actors
(`AToyObjectiveVolume`, `AToyObjectiveTarget`) — the "Build" notes say exactly which.

Difficulty ramps; new mechanics are introduced one at a time. Optional objectives add
replay value (par time, no-casualty, hidden intel).

---

## M1 — "BEACHHEAD" · Living Room Floor · *Assault / Secure*
**Teaches:** movement, switching soldiers (1–4), basic orders, firing.
**Fantasy:** establish a foothold under the coffee table.
- **Objectives**
  - Eliminate the tan patrol — `Eliminate` (Required 0 = auto-count, ~6 tan).
  - Secure the artillery outpost (the coffee table) — `Secure`, hold 15s.
  - *(Optional)* Recover the dropped dog-tags — `Collect`.
- **Enemies:** light riflemen, no cover usage yet (set their Order = Hold).
- **Twist:** none — this is the clean teaching mission.
- **Build:** scatter ~6 Tan `BP_ToySoldier`; one `AToyObjectiveVolume` (Secure) under
  the coffee table; one `AToyObjectiveVolume` (Collect) for the tags.

## M2 — "HOLD THE DOORMAT" · Front Hall · *Defend / Survive*
**Teaches:** Heavy's suppress, formation orders (Hold), the medic.
**Fantasy:** a last stand at the chokepoint as the tan counterattack rolls in.
- **Objectives**
  - Hold the doormat for 90 seconds — `Survive`, Required 90.
  - Do not let the tan breach the hall — `Defend` (fail if a tan reaches the inner zone).
- **Enemies:** escalating waves from under the door — use a spawner that calls
  `GameMode->RegisterEnemy` on each spawn so kills count and pressure mounts.
- **Twist:** the only way through is a single doorway — position the Heavy to suppress it
  and the Sniper for overwatch while the Medic keeps everyone standing.
- **Build:** one `AToyObjectiveVolume` (Defend) at the inner hall; a wave-spawner BP;
  the `Survive` objective ticks automatically.

## M3 — "BOOKSHELF BREAK" · The Bookcase Cliffs · *Rescue / Escort*
**Teaches:** sniper overwatch, careful movement, verticality.
**Fantasy:** green POWs are held on a book ledge above a sheer drop.
- **Objectives**
  - Free the captured greens — `Rescue` ×3 (three volumes on the ledges).
  - Get the squad to extraction — `Extract` (unlocks after the rescues).
  - *(Optional)* No casualties — track via the squad-down event.
- **Enemies:** tan snipers on higher shelves — punishes moving in the open; send one
  soldier up via the "stairs" (stacked books) while the Sniper covers.
- **Twist:** freed POWs follow to extraction; lose them and the rescue reverts.
- **Build:** three `AToyObjectiveVolume` (Rescue) on ledges; one (Extract) at the floor;
  tan soldiers placed with long EngageRange on high shelves.

## M4 — "BATTERY DEPOT" · Kitchen Counter · *Sabotage / Destroy*
**Teaches:** the Leader's grenade, target priority, demolitions.
**Fantasy:** blow the tan fuel dump — the BATTERELL batteries — and their artillery (a
stapler).
- **Objectives**
  - Destroy the battery drums — `Destroy` ×2 (`AToyObjectiveTarget`, 300 HP each).
  - Destroy the artillery piece (stapler) — `Destroy`.
  - Exfil before the timer — `Survive` 60s *as a fuse* after the first charge (optional
    tension layer; or model as a fail-timer in BP).
- **Enemies:** guards around the depot; tight quarters favor grenades.
- **Twist:** targets are tanky — bring the grenade and the Heavy; the Sniper can't solo
  them.
- **Build:** `AToyObjectiveTarget` for each drum + the stapler.

## M5 — "LIGHTS OUT" · Bedroom at Night · *Stealth / Recon*
**Teaches:** single-soldier finesse, the Sniper's silent one-shot, patience.
**Fantasy:** slip past sleeping defenses to steal intel (a glowing phone screen).
- **Objectives**
  - Reach the nightstand intel undetected — `ReachZone`.
  - *(Optional)* Take zero alarms — fail the bonus if any tan spots you.
- **Enemies:** tan sentries with flashlight cones (a spotlight + a detection volume in
  BP). Detection raises the alarm → spawns a reinforcement wave (RegisterEnemy).
- **Twist:** stealth-first — the Sniper can silently drop a lone sentry, but a missed
  shot wakes the room. Move one soldier; leave the rest holding in the dark.
- **Build:** `AToyObjectiveVolume` (ReachZone) at the nightstand; sentry BPs with a
  vision cone that calls a "raise alarm" event → spawner.

## M6 — "BACKYARD BLITZ" · Garden / Sandbox · *Combined Arms*
**Teaches:** everything together at scale.
**Fantasy:** open-field push across the garden — the biggest battle yet.
- **Objectives**
  - Knock out the tan mortar (hose nozzle) — `Destroy`.
  - Capture the two strongpoints — `Secure` ×2, hold 12s each.
  - Eliminate the garrison — `Eliminate` (auto-count).
- **Enemies:** mixed riflemen + snipers using cover (Order = Hold near crates/rocks).
- **Twist:** multiple objectives, no single right order — split the squad with Move/
  Attack orders and the command wheel; the open ground makes the Sniper shine.
- **Build:** one `AToyObjectiveTarget` (mortar) + two `AToyObjectiveVolume` (Secure).

## M7 — "THE TOYBOX THRONE" · Under the Bed / Toy Chest · *Boss / Extract (Finale)*
**Teaches:** mastery — a climactic test of all systems.
**Fantasy:** storm the tan command throne, kill the Commander, and get out before the
"cleanup" (a vacuum) arrives.
- **Objectives**
  - Eliminate the Tan Commander — `Destroy` (a high-HP elite `AToyObjectiveTarget`, or a
    beefed-up tan soldier) plus his guard `Eliminate`.
  - Survive the counterattack — `Survive` 45s.
  - Reach extraction before the vacuum — `Extract` (a hard fail-timer in BP).
- **Enemies:** elite heavies + waves; the Commander hits hard and soaks damage.
- **Twist:** three-phase finale — breach, boss fight, timed run to exfil. Revive and
  suppress are clutch; losing the Medic early is near-fatal.
- **Build:** Commander as an `AToyObjectiveTarget` or special soldier; `Survive` + a
  scripted vacuum hazard; `Extract` volume at the bed leg.

---

## Designing more missions
Mix any of these levers for variety:
- **Verb:** Eliminate / Secure / Defend / Destroy / Rescue / Collect / Survive / Extract.
- **Setting (household biome):** living room, hall, bookcase, kitchen, bedroom, garden,
  bathroom, garage, under-bed.
- **Constraint:** stealth, timer, no-casualties, one-soldier-only, limited ammo.
- **Spotlight class:** build at least one mission where each class is the obvious MVP.

Author each as a `UToyMissionData` asset (see CAMPAIGN_GUIDE.md), add it to the
`UToyCampaignData` list in order, and place the matching objective actors in the level.
