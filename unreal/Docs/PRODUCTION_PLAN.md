# Toy Soldier — Production Plan

A multi-month build. CDO directs; AI technical lead + agents execute the code/design;
CDO supplies art (via AI art tools / marketplace) and runs the editor.

## Operating model — who does what

| Lane | Owner | Notes |
|---|---|---|
| Vision, priorities, decisions | **CDO (you)** | You greenlight scope, approve milestones |
| Art: models, animation, textures, environments | **You** (AI art tools / Fab / Megascans) | I write the *spec*; you generate/source the asset |
| Unreal **editor** operations (place assets, levels, materials, Blueprints) | **You** | I give exact click-by-click steps; you execute |
| Playtesting & feedback | **You** | You're my eyes — I can't see the running game |
| Code, gameplay systems, architecture | **Me + agents** | Verified by compiling/building |
| Design docs, mission data, class/balance tables | **Me + agents** | |
| Asset specs ("what art we need, to what spec") | **Me** | So your art AI/marketplace search is precise |
| Build, debug, configs, tooling scripts | **Me** | |

**Two hard truths baked into this model (not obstacles, just division of labor):**
1. I can't create art → that's your lane (AI art tools / marketplace).
2. I can't see the Unreal editor → editor steps are yours, with my precise instructions.
Everything else is mine to drive, with agents fanned out where work parallelizes.

## Where agents genuinely multiply output
Code features in parallel, refactors, writing mission/dialogue content, generating
asset specs, test plans, balance tables, tooling. **Not** art/animation (your AI) or
editor operation (you).

## The art pipeline (repeatable loop)
For each asset: **I write a spec** (style, poly/texel budget, naming, slot it fills) →
**you generate/source it** → drop it in `Content/` → **I give exact editor import/hookup
steps** → you do them → I verify via build/cook logs.

## Phased roadmap (~months)

- **Phase 0 — Foundation: ✅ DONE.** UE 5.7 installed, project compiles, placeholder
  test scene runs (cube soldiers on a template floor).
- **Phase 1 — Playable core loop (placeholders).** Switch soldiers, give orders, shoot,
  enemies fight back, win/lose — all with cubes. *Code: me. No art needed.* → proves
  every system before a dollar/hour goes into art.
- **Phase 2 — Real assets.** Swap cubes for soldier models + animations; bring in a
  household environment kit + props + weapons. *Art: you; specs + hookup steps: me.*
- **Phase 3 — Missions & levels.** Build the 7-mission campaign in real levels. *Level
  layout: you (to my blueprints); mission data/logic: me.*
- **Phase 4 — Look & feel.** Lumen lighting, materials, VFX, sound, the macro-lens
  camera. *Art/editor: you; driving code: me.*
- **Phase 5 — UI/HUD.** UMG widgets to the reference design. *You build widgets to my
  specs; binding code: me.*
- **Phase 6 — Polish, balance, package & ship.**

## Sprint 1 (now): Playable core loop with placeholders
**Goal:** you press Play and actually play the tactical game with cubes — switch
soldiers (Tab), shoot (LMB), and your AI squad fights tan enemies. Proves the systems.
- Spawn tan enemies that advance + fight; green AI squad engages back.
- Player fire (hold LMB) + soldier switching (Tab) via legacy input (no editor assets).
- Win = enemies cleared; lose = squad down (logged to screen for now).
- **Deliverable:** an ugly-but-real playable build you launch with one command.

## CDO action items
- Sprint 1: just launch & playtest when I hand you the build; tell me how it feels.
- Soon (Phase 2 prep): pick an AI 3D-asset tool you like (e.g. text-to-3D services) so
  we have a pipeline ready. I'll write the first soldier-model spec when we get there.
