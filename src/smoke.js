// smoke.js — the regression harness. Open the game with ?smoke=1 and it
// deploys Mission 1, drives the simulation deterministically through every
// load-bearing system (spawn, movement, noise, ammo, rescue, stage machine,
// win), and stamps SMOKE PASS / SMOKE FAIL on the page and the console.
//
// This exists so a refactor that silently breaks something far from the code
// you touched gets caught in one reload, not in a playtest three days later.

export function runSmoke() {
  const g = window.game;
  const $ = (id) => document.getElementById(id);
  const checks = [];
  const check = (name, ok) => {
    checks.push((ok ? 'PASS ' : 'FAIL ') + name);
    if (!ok) throw new Error(name);
  };

  const badge = document.createElement('div');
  badge.id = 'smokebadge';
  badge.style.cssText =
    'position:fixed;top:8px;right:8px;z-index:99;padding:8px 14px;' +
    'font:bold 14px monospace;border-radius:6px;background:#333;color:#fff';
  badge.textContent = 'SMOKE RUNNING…';
  document.body.appendChild(badge);

  // The harness verifies SYSTEMS, not difficulty — the sim soldier walks
  // dumb lines a real player never would, so he gets plot armor. Difficulty
  // is playtested by humans.
  const pinHealth = () => { for (const m of g.squad.members) if (m.alive) m.health = m.maxHealth; };

  try {
    // Deploy and take deterministic control.
    $('deployBtn').click();
    g.input.debugLock = true;
    g.step(5);
    check('18 tan spawned', g.enemies.list.length === 18);
    check('3 squadmates crash-downed', g.squad.members.filter((m) => m.crashDowned).length === 3);
    check('regroup objective shown', $('objective').textContent.includes('FIND YOUR SQUAD'));
    check('checkpoint zero saved', !!g.mission.checkpoint);
    check('frag pouch stocked', g.squad.active.nades === 2);

    // Movement + collision: walk the leader into the room.
    const a = g.squad.active;
    const startX = a.position.x;
    a.yaw = Math.PI / 2;
    g.input.keys['KeyW'] = true;
    for (let i = 0; i < 30; i++) { g.step(10); pinHealth(); }
    g.input.keys['KeyW'] = false;
    check('player movement', a.position.x - startX > 20);

    // Gunfire: bullets fly, noise wakes sentries, the magazine drains.
    g.input.firing = true;
    for (let i = 0; i < 12; i++) { g.step(10); pinHealth(); }
    g.input.firing = false;
    check('noise model (someone alerted or died)',
      g.enemies.list.some((e) => e.alerted) || g.enemies.kills > 0);
    check('ammo economy ticking', a.mag < a.cls.mag || a.reloading > 0);

    // The fight is verified — stand the war down before testing the mission
    // verbs, so a lucky tan bullet can't fail an unrelated check. Clear the
    // rounds still IN FLIGHT too: a stray hit during the rescue phase would
    // be honestly snapshotted by the checkpoint and flake the restore check.
    for (const e of g.enemies.list) e.hp = 0;
    g.step(5);
    g.bullets.clear();
    check('enemies clearable', g.enemies.list.length === 0);

    // The TANK: plastic armor that only a BLAST opens — two rocket-sized
    // hits kill it. (Killed now so it can't shell the rescue walks below.)
    const tank = g.mission.tank;
    check('tank fielded and alive', !!tank && tank.alive);
    tank.takeBlast(tank.pos, 7, 220);
    check('tank takes blast damage', tank.hp < 400);
    tank.takeBlast(tank.pos, 7, 220);
    g.step(5);
    check('tank destroyed by explosives', !tank.alive);

    // LIVE WORLD RULES: the radio dies in ANY act — even before its
    // objective opens (regroup is still running here).
    g.world.radio.hp = 0;
    g.step(5);
    check('radio destroyable in any act', !g.world.radio.alive);

    // Rescue mechanic: HOLD E beside each downed buddy until he's up.
    g.input.keys['KeyE'] = true;
    for (const m of g.squad.members) {
      if (!m.crashDowned) continue;
      a.position.set(m.position.x + 1.2, 0, m.position.z + 1.2);
      g.step(160);
    }
    g.input.keys['KeyE'] = false;
    check('crash rescues (hold E)', g.squad.members.every((m) => !m.crashDowned));
    g.step(10);

    // The class specials, through the real Space handler: the Heavy's bazooka
    // and the Sniper's mine each burn one of their two charges.
    g.squad.setActive(1);
    g.input.pressed['Space'] = true;
    g.step(1);
    // (Ammo is the check — the rocket itself may already have detonated if
    // the Heavy happened to stop near a wall.)
    check('bazooka fires (charge spent)', g.squad.members[1].abilityAmmo === 1);
    g.squad.setActive(2);
    g.input.pressed['Space'] = true;
    g.step(1);
    check('mine planted (charge spent)',
      g.squad.members[2].abilityAmmo === 1 && g.grenades.mines.length === 1);
    g.squad.setActive(0);

    // CHECKPOINT: the stage advance saved one; wound the leader, rewind,
    // and the world snaps back — same stage, the SNAPSHOTTED health (not an
    // assumed max — the checkpoint records what was true), no reload. The
    // rewind also re-pockets the just-spent rocket and mine and sweeps the
    // mine off the floor — the snapshot predates them.
    const cpStage = g.mission.stageIdx;
    const cpHealth = g.mission.checkpoint.squad[g.mission.checkpoint.activeIndex].health;
    a.health = 5;
    const restored = g.mission.restoreCheckpoint(g.squad, g.enemies, g.bullets, g.grenades);
    check('checkpoint restores in place',
      restored && g.mission.stageIdx === cpStage &&
      g.squad.active.health === cpHealth && g.squad.active.health > 5);
    check('rewind re-pockets specials',
      g.squad.members[1].abilityAmmo === 2 && g.grenades.mines.length === 0);
    g.step(5);

    for (const s of g.world.supplies) { s.taken = true; s.crate.visible = false; s.ring.visible = false; }
    g.world.radio.hp = 0;
    g.step(10);
    g.squad.members.forEach((m, i) => m.position.set(g.world.exit.x - 1 + i, 0, g.world.exit.z - 1));
    let f = 0;
    while (f < 900 && $('win').classList.contains('hidden')) { g.step(10); f += 10; }
    check('stage machine reaches WIN', !$('win').classList.contains('hidden'));

    badge.textContent = `SMOKE PASS — ${checks.length} checks`;
    badge.style.background = '#1c5a2a';
    document.title = 'SMOKE PASS';
    console.log('SMOKE PASS\n' + checks.join('\n'));
  } catch (err) {
    badge.textContent = 'SMOKE FAIL: ' + err.message;
    badge.style.background = '#7a1812';
    document.title = 'SMOKE FAIL';
    console.error('SMOKE FAIL: ' + err.message + '\n' + checks.join('\n'));
  }
}
