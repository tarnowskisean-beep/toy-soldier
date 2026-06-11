# Asset Spec — Soldier model (Phase 2, first drop-in)

Goal: replace the placeholder cube with a real soldier you can see. Get me a model
matching this spec and I'll wire it in.

## Fastest path (recommended): Mixamo (free, rigged + animated)
The quickest way to a soldier that actually *walks, aims, and fires* — not just stands:
1. Go to **mixamo.com** (free, Adobe account).
2. Pick a **soldier/military character** (e.g. "Vanguard", or search soldier).
3. Download the **character** (FBX, T-pose, "with skin").
4. Also download a few **animations** (FBX): *Idle, Walk/Run, Rifle Aim, Firing Rifle, Death*.
5. Hand me the files (or drop them in `Content/Soldiers/`).

→ This gets a fully animated humanoid in fast. It won't look like a *plastic toy army
man* yet — we get that later with a toy-soldier model and/or a glossy-plastic material.
But it's a massive jump from cubes and proves the animation pipeline.

## Alternative: text-to-3D (closer to the toy look, usually static)
Tools: **Meshy, Tripo, Rodin** (text/image → 3D). Prompt idea:
> "classic green plastic toy army soldier, standing rifleman, smooth molded plastic,
> simple, game-ready, full body, T-pose"
Export **FBX or GLB**. These are usually **un-rigged** (static) — fine for a first
visual swap; animation comes later.

## Alternative: marketplace
**Fab** (fab.com, built into UE) or Sketchfab — search "soldier", "army man",
"toy soldier", "low poly soldier". Many free. Grab one rigged if possible.

## Technical spec (so it drops in clean)
| Property | Target |
|---|---|
| Format | **FBX** or **glTF/GLB** |
| Height | ~**180 cm** (real-world soldier scale; I can rescale on import) |
| Orientation | facing **+X**, **Z up**, feet at origin (UE convention) |
| Polycount | a few thousand–50k tris is fine |
| Material | one material; **green** is ideal (I tint tan for enemies). Untextured ok |
| Rig (optional now) | if rigged, a standard humanoid skeleton (Mixamo/UE5 Manny compatible is best) |

## What I do once you deliver it
- **Static model** → I swap the cube `BodyMesh` for your mesh, scale/orient it, tint
  green vs tan by team. Soldiers instantly look like soldiers (still T-pose/no anim).
- **Rigged + animations** → I set up the skeletal mesh + an Animation Blueprint so they
  idle/walk/aim/fire/die. This is the big "looks alive" jump.

Just get me one file to start (even a single static model) and we'll see it next turn.
