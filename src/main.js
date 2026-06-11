// main.js — the conductor. Boots the campaign menu, runs the selected mission's
// loop (input → orders → update → render), and handles win/lose/progression.

import * as THREE from 'three';
import { createWorld } from './world.js';
import { Input } from './input.js';
import { Squad } from './squad.js';
import { Bullets } from './bullets.js';
import { Enemies } from './enemies.js';
import { Grenades } from './grenades.js';
import { buildSquadHUD, updateSquadHUD } from './hud.js';
import { MISSIONS, missionById } from './missions.js';
import { MissionRunner } from './mission.js';
import { hasLineOfSight, segBoxEntryT } from './physics.js';
import { sfx } from './audio.js';
import { barks, pick } from './barks.js';

// --- Renderer + camera ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Filmic color: the single biggest "engine demo → game" rendering switch.
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.45;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
const CAM_DISTANCE = 7, CAM_HEIGHT = 2.2;

// --- Resolve the boot mission FIRST — the world is MISSION DATA ---
// (?smoke=1 forces mission 1 and runs the regression harness after boot.)
const SMOKE = new URLSearchParams(location.search).has('smoke');
const savedScreen = SMOKE
  ? 'mission:' + MISSIONS[0].id
  : (localStorage.getItem('ts_screen') || 'menu');
let savedDef = savedScreen.startsWith('mission:')
  ? missionById(savedScreen.slice('mission:'.length))
  : null;
if (savedDef && savedDef.comingSoon) savedDef = null;
const bootDef = savedDef || MISSIONS[0];   // the menu idles over mission 1's set

// --- Build that mission's world + the squad (enemies spawn at deploy) ---
const world = createWorld(bootDef.world);
const { scene, obstacles, coverPoints, exitGlow, nav, bounds } = world;
const input = new Input(renderer.domElement);
const squad = new Squad(scene, obstacles, nav, bounds);
const bullets = new Bullets(scene, obstacles, bounds);
const enemies = new Enemies(scene, obstacles, coverPoints, nav, bounds);
const grenades = new Grenades(scene, obstacles, bounds);
buildSquadHUD(squad);
bullets.onFire = (origin, team) => {
  const d = origin.distanceTo(squad.active.position);
  sfx.gunshot(team === 'player' ? Math.min(d, 4) : d);
  // EVERY shot is loud — your AI squadmates' fire wakes sentries exactly
  // like yours does. One noise rule, no silent exceptions.
  enemies.hearGunshot(origin);
};
let shake = 0;
grenades.onBoom = (pos) => {
  sfx.boom(pos.distanceTo(squad.active.position));
  shake = Math.min(1, shake + Math.max(0.2, 1.1 - pos.distanceTo(squad.active.position) / 45));
};
window.game = { scene, camera, squad, bullets, enemies, grenades, input, world };

// --- Campaign state machine ---
let state = 'menu';          // 'menu' | 'brief' | 'playing' | 'won' | 'lost'
let mission = null;          // active MissionRunner
let currentDef = null;       // active mission definition

const $ = (id) => document.getElementById(id);
const menuEl = $('menu'), startEl = $('start'), winEl = $('win'), loseEl = $('gameover');
const objectiveEl = $('objective'), crosshair = $('crosshair');
const vignette = $('vignette'), abilityEl = $('ability'), scopeEl = $('scope');
const dmgdirEl = $('dmgdir'), takedownEl = $('takedown'), peekEl = $('peek');
const ammoTopEl = $('ammoTop'), healthfillEl = $('healthfill');
const firemodeEl = $('firemode');
const portraitCv = $('portraitCv'), weaponCv = $('weaponCv'), portraitNameEl = $('portraitName');

// --- Class portrait: a little molded bust in the chip, Sarge's-Heroes style ---
function drawPortrait(cls) {
  const g = portraitCv.getContext('2d');
  const W = portraitCv.width, H = portraitCv.height;
  g.clearRect(0, 0, W, H);
  const green = '#2f9e35', dark = '#1d6b24';
  // shoulders
  g.fillStyle = green;
  g.beginPath(); g.moveTo(8, H); g.lineTo(16, 56); g.lineTo(W - 16, 56); g.lineTo(W - 8, H); g.closePath(); g.fill();
  // head
  g.fillStyle = green;
  g.beginPath(); g.arc(W / 2, 42, 17, 0, Math.PI * 2); g.fill();
  // helmet dome + brim
  g.fillStyle = dark;
  g.beginPath(); g.arc(W / 2, 36, 21, Math.PI, 0); g.fill();
  g.fillRect(W / 2 - 23, 34, 46, 5);
  // eyes: two dark notches under the brim
  g.fillStyle = 'rgba(10,25,10,0.9)';
  g.fillRect(W / 2 - 9, 44, 5, 3);
  g.fillRect(W / 2 + 4, 44, 5, 3);
  // class accent: ring-colored chin strap
  g.strokeStyle = '#' + cls.ringColor.toString(16).padStart(6, '0');
  g.lineWidth = 3;
  g.beginPath(); g.arc(W / 2, 46, 19, 0.35, Math.PI - 0.35); g.stroke();
}

// --- Weapon silhouette: stock / receiver / barrel / mag, per class ---
function drawWeapon(cls) {
  const g = weaponCv.getContext('2d');
  const W = weaponCv.width, H = weaponCv.height, mid = 16;
  g.clearRect(0, 0, W, H);
  g.fillStyle = '#dff5dc';
  const barrelLen = 34 + cls.rifleLength * 38;
  const thick = cls.key === 'heavy' ? 7 : 4;
  g.beginPath();                                   // stock
  g.moveTo(6, mid - 5); g.lineTo(22, mid - 4); g.lineTo(22, mid + 6); g.lineTo(6, mid + 9);
  g.closePath(); g.fill();
  g.fillRect(22, mid - 6, 34, 12);                 // receiver
  g.fillRect(56, mid - thick / 2, barrelLen, thick); // barrel
  g.fillRect(30, mid + 6, 8, 10);                  // magazine
  g.fillRect(24, mid - 9, 4, 4);                   // rear sight
  if (cls.key === 'sniper') {                      // scope
    g.beginPath(); g.arc(44, mid - 11, 5, 0, Math.PI * 2); g.fill();
    g.fillRect(38, mid - 12, 12, 3);
  }
}

let portraitKey = null;
function updateVitals() {
  const a = squad.active;
  if (a.cls.key !== portraitKey) {
    portraitKey = a.cls.key;
    drawPortrait(a.cls);
    drawWeapon(a.cls);
    portraitNameEl.textContent = a.cls.name;
    portraitCv.style.setProperty('--pring', '#' + a.cls.ringColor.toString(16).padStart(6, '0'));
    portraitCv.style.borderColor = '#' + a.cls.ringColor.toString(16).padStart(6, '0');
  }
  const pct = Math.max(0, (a.health / a.maxHealth) * 100);
  healthfillEl.style.width = pct + '%';
  healthfillEl.classList.toggle('warn', pct <= 50 && pct > 25);
  healthfillEl.classList.toggle('crit', pct <= 25);
}

const getUnlocked = () => parseInt(localStorage.getItem('ts_unlocked') || '1', 10);
const setScreen = (s) => localStorage.setItem('ts_screen', s);

function hideAllScreens() {
  for (const el of [menuEl, startEl, winEl, loseEl]) el.classList.add('hidden');
}

function showMenu() {
  state = 'menu';
  setScreen('menu');
  if (document.pointerLockElement) document.exitPointerLock();
  hideAllScreens();
  objectiveEl.classList.add('hidden');
  buildMenu();
  menuEl.classList.remove('hidden');
}

function buildMenu() {
  const unlocked = getUnlocked();
  const list = $('missionList');
  list.innerHTML = '';
  MISSIONS.forEach((m, i) => {
    const locked = i >= unlocked || m.comingSoon;
    const div = document.createElement('div');
    div.className = 'mission' + (locked ? ' locked' : '');
    div.innerHTML =
      `<div><div class="m-name">${i + 1}. ${m.name}</div>` +
      `<div class="m-sector">${m.sector}</div></div>` +
      `<div class="m-tag">${locked ? 'LOCKED' : '▶ DEPLOY'}</div>`;
    if (!locked) div.addEventListener('click', () => { setScreen('mission:' + m.id); location.reload(); });
    list.appendChild(div);
  });
}

function showBriefing(def) {
  state = 'brief';
  currentDef = def;
  hideAllScreens();
  $('briefName').textContent = def.name;
  $('briefSector').textContent = def.sector;
  $('briefText').textContent = def.briefing;
  startEl.classList.remove('hidden');
}

function startPlaying() {
  if (state !== 'brief') return;   // a double-click must not spawn the mission twice
  hideAllScreens();
  sfx.resume();   // user gesture: safe to start the audio engine
  // Mission title card, Sarge's-Heroes style.
  const card = $('titlecard');
  if (card) {
    $('cardCampaign').textContent = 'THE LONG WAY HOME';
    $('cardMission').textContent = `Mission ${MISSIONS.findIndex(m => m.id === currentDef.id) + 1} — ${currentDef.name}`;
    card.classList.remove('hidden');
    card.classList.remove('fade');
    setTimeout(() => card.classList.add('fade'), 3200);
    setTimeout(() => card.classList.add('hidden'), 4600);
  }
  mission = new MissionRunner(currentDef, scene, world);
  mission.onToast = showToast;
  mission.begin(enemies, squad);
  window.game.mission = mission;
  window.game.world = world;
  objectiveEl.classList.remove('hidden');
  state = 'playing';
  input.requestLock();
}

// Stage banner: slides in under the objective line, lingers, fades.
let toastTimer = null;
function showToast(text) {
  const el = $('toast');
  if (!el || !text) return;
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3800);
}

function onWin() {
  state = 'won';
  sfx.sting(true);
  if (document.pointerLockElement) document.exitPointerLock();
  const idx = MISSIONS.findIndex((m) => m.id === currentDef.id);
  const isLast = idx >= MISSIONS.length - 1;
  localStorage.setItem('ts_unlocked', Math.max(getUnlocked(), Math.min(idx + 2, MISSIONS.length)));
  $('winText').textContent = isLast ? 'CAMPAIGN COMPLETE — HOME AT LAST' : (currentDef.winText || 'OBJECTIVE COMPLETE');
  $('nextBtn').classList.toggle('hidden', isLast);
  winEl.classList.remove('hidden');
}

function onLose() {
  state = 'lost';
  sfx.sting(false);
  if (document.pointerLockElement) document.exitPointerLock();
  loseEl.classList.remove('hidden');
}

// --- Button wiring ---
$('deployBtn').addEventListener('click', startPlaying);
$('briefMenuBtn').addEventListener('click', showMenu);
$('winMenuBtn').addEventListener('click', showMenu);
$('loseMenuBtn').addEventListener('click', showMenu);
$('retryBtn').addEventListener('click', () => { setScreen('mission:' + currentDef.id); location.reload(); });
$('nextBtn').addEventListener('click', () => {
  const idx = MISSIONS.findIndex((m) => m.id === currentDef.id);
  const next = MISSIONS[idx + 1];
  if (next) { setScreen('mission:' + next.id); location.reload(); } else showMenu();
});
// Re-grab the mouse if you pressed Esc mid-mission.
renderer.domElement.addEventListener('click', () => {
  if (state === 'playing' && !input.locked) input.requestLock();
});

// --- Boot into the saved screen (the matching world is already built) ---
(function boot() {
  if (savedDef) showBriefing(savedDef); else showMenu();
  if (SMOKE) import('./smoke.js').then((m) => m.runSmoke());
})();

// --- Aiming raycast (crosshair → world point / enemy) ---
const raycaster = new THREE.Raycaster();
const SCREEN_CENTER = new THREE.Vector2(0, 0);
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const _aimPoint = new THREE.Vector3();

function getAim() {
  raycaster.setFromCamera(SCREEN_CENTER, camera);
  const ray = raycaster.ray;
  let enemy = null, bestT = Infinity;
  for (const e of enemies.list) {
    const cx = e.pos.x, cy = (e.baseY || 0) + 1.1, cz = e.pos.z;
    const ox = cx - ray.origin.x, oy = cy - ray.origin.y, oz = cz - ray.origin.z;
    const t = ox * ray.direction.x + oy * ray.direction.y + oz * ray.direction.z;
    if (t < 0 || t > bestT) continue;
    const px = ray.origin.x + ray.direction.x * t;
    const py = ray.origin.y + ray.direction.y * t;
    const pz = ray.origin.z + ray.direction.z * t;
    if (Math.hypot(px - cx, py - cy, pz - cz) < 1.3) { enemy = e; bestT = t; }
  }
  if (enemy) { _aimPoint.set(enemy.pos.x, 1.1, enemy.pos.z); return { enemy, point: _aimPoint }; }
  if (ray.intersectPlane(GROUND, _aimPoint)) return { enemy: null, point: _aimPoint };
  ray.at(80, _aimPoint);
  return { enemy: null, point: _aimPoint };
}

let camFov = 70;
let mapMode = false;
let stepAccum = 0;        // footstep cadence
let lastKills = 0;
let lastPos = new THREE.Vector3();
const clock = new THREE.Clock();

// Muzzle flash: one pooled light, repositioned to the active soldier's muzzle
// on every shot and faded out fast.
const muzzleLight = new THREE.PointLight(0xffd9a0, 0, 14);
scene.add(muzzleLight);

function loop() {
  requestAnimationFrame(loop);
  tick(Math.min(clock.getDelta(), 0.05));
}

// One simulation+render step. Extracted from loop() so automation (and tests)
// can step the game deterministically even when rAF is throttled.
function tick(dt) {
  if (state === 'playing' && (input.locked || input.debugLock) && squad.alive) {
    if (input.consume('Digit1')) squad.setActive(0);
    if (input.consume('Digit2')) squad.setActive(1);
    if (input.consume('Digit3')) squad.setActive(2);
    if (input.consume('Digit4')) squad.setActive(3);
    if (input.consume('Tab')) squad.cycle();

    const aim = getAim();
    crosshair.classList.toggle('enemy', !!aim.enemy);
    if (input.consume('KeyQ')) {
      if (aim.enemy) { squad.orderAttack(aim.enemy); orderBark('Engaging!'); }
      else { squad.orderMove(aim.point.clone()); orderBark('Moving!'); }
    }
    if (input.consume('KeyF')) { squad.orderFollow(); orderBark('On you!'); }
    if (input.consume('KeyH')) { squad.orderHold(); orderBark('Holding!'); }
    if (input.consume('KeyX')) {
      squad.fireMode = squad.fireMode === 'free' ? 'hold' : 'free';
      orderBark(squad.fireMode === 'hold' ? 'Hold fire!' : 'Weapons free!');
      firemodeEl.textContent = 'SQUAD ▸ ' + (squad.fireMode === 'hold' ? 'HOLD FIRE' : 'WEAPONS FREE');
      firemodeEl.classList.toggle('hold', squad.fireMode === 'hold');
    }
    if (input.consume('KeyC')) squad.active.toggleCover();
    if (input.consume('KeyM')) mapMode = !mapMode;
    if (input.consume('KeyR')) squad.active.startReload();

    handleAbility(aim);
    handleInteract(dt);

    squad.update(dt, { input, enemies: enemies.list, bullets, free: enemies.combatStarted });
    if (input.firing && !mapMode && squad.active.tryFireAt(aim.point, bullets)) {
      // Hearing is handled by bullets.onFire (one rule for every shot) —
      // here it's just the flash and the camera kick.
      muzzleLight.position.copy(squad.active.muzzleWorldPosition());
      muzzleLight.intensity = 26;
      squad.active.pitch += 0.012;
    }
    muzzleLight.intensity *= Math.pow(0.0001, dt);   // fast falloff
    grenades.update(dt, enemies);
    bullets.update(dt);
    barks.update(dt);
    checkLampHit();
    enemies.update(dt, squad, bullets);
    squad.takeBulletHits(bullets);

    placeCamera(dt);
    updateZoom(dt);

    updateSquadHUD(squad, enemies.kills);
    updateAbilityHUD();
    updateAmmoHUD();
    updateDamageHUD();
    crosshair.classList.toggle('hit', enemies.hitFlash > 0);

    // Footsteps from actual ground covered; a kill gets its plastic THOCK.
    stepAccum += squad.active.position.distanceTo(lastPos);
    lastPos.copy(squad.active.position);
    const stride = squad.active.crouched ? 1.15 : 1.7;
    if (stepAccum > stride) { stepAccum = 0; sfx.footstep(); }
    if (enemies.kills > lastKills) { sfx.kill(); lastKills = enemies.kills; }
    exitGlow.material.opacity = 0.25 + 0.15 * Math.sin(performance.now() * 0.004);
    vignette.classList.toggle('show', squad.active.alive && squad.active.health < 35);

    // --- Mission objective ---
    mission.update(dt, squad, enemies, bullets);
    objectiveEl.textContent = mission.statusText(enemies);
    if (mission.state === 'won') onWin();
    else if (mission.state === 'lost') onLose();
  }

  input.endFrame();
  renderer.render(scene, camera);
}
window.game.step = (frames = 1, dt = 1 / 60) => { for (let i = 0; i < frames; i++) tick(dt); };

// Only big slabs (walls, couch, wreck, fridge, shelf) push the camera around —
// colliding with every toy block or table leg would make the boom jitter
// constantly. "Big" = tall enough to fill the frame AND wide enough that you
// can't see past it.
const cameraBlockers = obstacles.filter((b) =>
  b.max.y >= 3.5 && (b.max.x - b.min.x) * (b.max.z - b.min.z) >= 5);
let camDist = CAM_DISTANCE;
let aimT = 0;   // 0 = chase camera, 1 = over-the-shoulder aim camera

function placeCamera(dt = 0) {
  // The reveal fog is for eyes at soldier height — the tactical map reads
  // the whole floor plan, so it sees through it.
  if (scene.fog && world.fogCfg) {
    scene.fog.near = mapMode ? 9000 : world.fogCfg.near;
    scene.fog.far = mapMode ? 10000 : world.fogCfg.far;
  }
  if (mapMode) {
    // Tactical map: straight down over the house. Enemies you haven't met stay
    // hidden — the map shows squad intel, not omniscience.
    camera.position.set(world.map.x, world.map.height, 0.01);
    camera.lookAt(world.map.x, 0, 0);
    for (const e of enemies.list) {
      let seen = e.alerted || e.aware > 0.05;
      if (!seen) {
        for (const m of squad.members) {
          if (!m.alive) continue;
          if (m.position.distanceTo(e.pos) < 52 &&
              hasLineOfSight(m.position, e.pos, obstacles)) { seen = true; break; }
        }
      }
      e.fig.visible = seen;
    }
    return;
  }
  for (const e of enemies.list) e.fig.visible = true;
  const a = squad.active;

  // Aiming pulls the camera in over the RIGHT SHOULDER: closer, lower, and
  // offset so you see your soldier shoulder the rifle along the sightline.
  aimT += ((a.aiming ? 1 : 0) - aimT) * Math.min(1, dt * 9);
  const boomLen = CAM_DISTANCE + (3.1 - CAM_DISTANCE) * aimT;
  const side = 1.65 * aimT;                       // over the RIGHT shoulder:
                                                  // the soldier sits LEFT of
                                                  // frame, crosshair clears him
  // (Screen-right is world MINUS the facing-right vector for this camera —
  // shift the view axis toward his LEFT so HE ends up left of frame.)
  const rx = -Math.cos(a.yaw), rz = Math.sin(a.yaw);

  const ty = a.position.y + (CAM_HEIGHT + (2.05 - CAM_HEIGHT) * aimT) * (a.crouched ? 0.7 : 1);
  const tx = a.position.x + rx * side, tz = a.position.z + rz * side;
  const cp = Math.cos(a.pitch), sp = Math.sin(a.pitch);
  const dx = -Math.sin(a.yaw) * cp, dy = sp, dz = -Math.cos(a.yaw) * cp;

  // The camera is on a boom arm behind the soldier. Cast the arm against the
  // walls and pull the camera IN FRONT of the first one it would cross —
  // a camera inside a wall is a black screen.
  let want = boomLen;
  const ex = tx + dx * boomLen, ey = ty + dy * boomLen, ez = tz + dz * boomLen;
  for (const b of cameraBlockers) {
    const t = segBoxEntryT(tx, ty, tz, ex, ey, ez, b);
    if (t < Infinity) want = Math.min(want, t * boomLen - 0.35);
  }
  want = Math.max(1.4, want);
  // Snap IN instantly (never clip a wall), ease back OUT (no popping).
  camDist = want < camDist ? want : camDist + (want - camDist) * Math.min(1, dt * 5);

  camera.position.set(tx + dx * camDist, ty + dy * camDist, tz + dz * camDist);
  // Explosions rattle the lens.
  if (shake > 0.005) {
    camera.position.x += (Math.random() - 0.5) * shake * 0.7;
    camera.position.y += (Math.random() - 0.5) * shake * 0.5;
    camera.position.z += (Math.random() - 0.5) * shake * 0.7;
    shake *= Math.pow(0.01, dt);
  }
  camera.lookAt(tx, ty, tz);

  // A soldier between you and the lens goes ghost-transparent — you should
  // never eat a screenful of your buddy's back (or, pressed against a wall,
  // your own helmet). Distance is measured to the CHEST, where the camera
  // actually collides with the figure.
  for (const m of squad.members) {
    const p = m.figure.position;
    const dcx = p.x - camera.position.x;
    const dcy = p.y + 1.4 - camera.position.y;
    const dcz = p.z - camera.position.z;
    const d = Math.sqrt(dcx * dcx + dcy * dcy + dcz * dcz);
    const op = Math.max(0, Math.min(1, (d - 1.4) / 1.2));
    for (const mat of m.figure.userData.fadeMats) {
      mat.transparent = op < 1;
      mat.opacity = op;
    }
  }
}

// An order ack from one living squadmate — the squad TALKS back.
function orderBark(text) {
  for (let i = 0; i < squad.members.length; i++) {
    if (i === squad.activeIndex || !squad.members[i].alive) continue;
    barks.say(squad.members[i].figure, text, '#9fe89f');
    return;
  }
}

// The floor lamp is a TARGET: kill the bulb, darken the corner — sentries in
// the pool lose reach (the shot itself is as loud as any other).
function checkLampHit() {
  const lamp = world.lamp;
  if (!lamp || !lamp.alive) return;
  for (const b of bullets.active) {
    if (b.team !== 'player') continue;
    const dx = b.mesh.position.x - lamp.pos.x;
    const dy = b.mesh.position.y - lamp.bulbY;
    const dz = b.mesh.position.z - lamp.pos.z;
    if (dx * dx + dy * dy + dz * dz < 3.2 * 3.2) {
      lamp.alive = false;
      lamp.light.intensity = 0;
      lamp.shade.material.emissiveIntensity = 0;
      sfx.glass();
      bullets.burst(b.mesh.position);
      bullets.retireBullet(b);
      return;
    }
  }
}

// --- SILENT TAKEDOWN ---
// Close to ~3u of a man who hasn't made you (a sentry, or a hunter who lost
// you), FROM BEHIND his back arc, and E drops him without a shot. Only an
// 8u scuffle is heard — his buddy beside him reacts; a lone post doesn't.
const TAKEDOWN_RANGE = 3.0;

function takedownCandidate() {
  const a = squad.active;
  if (!a.alive) return null;
  let best = null, bestD = TAKEDOWN_RANGE;
  for (const e of enemies.list) {
    if (e.alerted && !e.searching) continue;        // eyes-on men can't be grabbed
    if (e.baseY > 0) continue;                      // can't reach a man on a tower
    const dx = a.position.x - e.pos.x, dz = a.position.z - e.pos.z;
    const d = Math.hypot(dx, dz);
    if (d >= bestD) continue;
    // Behind him: he faces AWAY from you.
    const fx = Math.sin(e.facing), fz = Math.cos(e.facing);
    if ((fx * dx + fz * dz) / (d || 1) > -0.1) continue;
    best = e; bestD = d;
  }
  return best;
}

// E is the HANDS button: revive the buddy beside you (priority), or drop the
// sentry whose back is turned.
let reviveT = 0;
function handleInteract(dt) {
  const a = squad.active;

  // Anyone can get a downed mate back up — the medic is just twice as fast
  // and brings them back twice as healthy.
  let mate = null;
  for (const m of squad.members) {
    if (m === a || !m.downed) continue;
    if (m.position.distanceTo(a.position) < 2.8) { mate = m; break; }
  }
  if (mate && !mapMode) {
    const medic = a.cls.key === 'medic';
    if (input.isDown('KeyE')) {
      reviveT += dt * (medic ? 2.1 : 1);
      takedownEl.textContent = `REVIVING… ${Math.min(99, Math.round(reviveT / 2.5 * 100))}%`;
      if (reviveT >= 2.5) {
        mate.revive(medic ? 0.65 : 0.35);
        sfx.pickup();
        barks.say(mate.figure, pick(['Back in it!', 'Thanks — I owe you.', 'On my feet!']), '#7dff7d');
        reviveT = 0;
      }
    } else {
      reviveT = Math.max(0, reviveT - dt * 2);
      takedownEl.textContent = `E  REVIVE ${mate.cls.name}`;
    }
    takedownEl.classList.add('show');
    peekEl.classList.remove('show');
    return;
  }
  reviveT = 0;

  const cand = takedownCandidate();
  if (cand) takedownEl.textContent = 'E  SILENT TAKEDOWN';
  takedownEl.classList.toggle('show', !!cand && !mapMode);
  if (cand && input.consume('KeyE')) {
    enemies.takedown(cand, squad.active.position);
    sfx.takedown();
  }
  // Cover affordances: offer the snap when you're near it, the pop when
  // you're in it.
  const showPop = !mapMode && a.alive && a.inCover && !a.aiming && !cand;
  const showTake = !mapMode && a.alive && !a.inCover && a.coverNear && !a.aiming && !cand;
  if (showPop || showTake) {
    peekEl.textContent = showPop ? 'RMB  POP OUT' : 'C  TAKE COVER';
  }
  peekEl.classList.toggle('show', showPop || showTake);
}

function handleAbility(aim) {
  const a = squad.active;
  a.zoomed = false;
  if (!a.alive) return;
  // RMB = shoulder the rifle, every class. The sniper's shoulder is a scope.
  a.aiming = input.aiming && !mapMode;
  const ab = a.cls.ability;
  if (ab.key === 'scope') a.zoomed = a.aiming;

  if (ab.key === 'suppress') {
    // DIG IN is a stance, not a button-hold: Space plants/unplants the gun.
    if (input.consume('Space')) a.suppressing = !a.suppressing;
    if (a.suppressing) enemies.applySuppression(aim.point, 12, 0.7);
  } else {
    a.suppressing = false;
    if (input.consume('Space') && a.abilityCd <= 0) {
      if (ab.key === 'grenade') {
        grenades.throwAt(a.muzzleWorldPosition(), aim.point);
        a.abilityCd = ab.cooldown;
      } else if (ab.key === 'revive') {
        if (squad.reviveNear(a)) a.abilityCd = ab.cooldown;
      }
    }
  }
}

function updateZoom(dt) {
  // The lens ladder: scope < shouldered aim < normal < sprint.
  const a = squad.active;
  const target = a.zoomed ? 28 : (a.aiming ? 52 : (a.sprinting ? 76 : 70));
  camFov += (target - camFov) * Math.min(1, dt * 12);
  if (Math.abs(camera.fov - camFov) > 0.01) {
    camera.fov = camFov;
    camera.updateProjectionMatrix();
  }
  scopeEl.classList.toggle('show', a.zoomed);
  crosshair.classList.toggle('ads', a.aiming && !a.zoomed);
}

function updateAmmoHUD() {
  const a = squad.active;
  if (a.reloading > 0) {
    ammoTopEl.innerHTML = '<span class="reserve">RELOADING…</span>';
    ammoTopEl.classList.add('reloading');
    ammoTopEl.classList.remove('low');
  } else {
    ammoTopEl.innerHTML = `${a.mag}<span class="reserve"> / ${a.reserve}</span>`;
    ammoTopEl.classList.remove('reloading');
    ammoTopEl.classList.toggle('low', a.mag <= Math.ceil(a.cls.mag * 0.25));
  }
  updateVitals();
}

// The red arc that says WHERE the hurt came from, and a pulse that says NOW.
let lastPulseAt = 0;
function updateDamageHUD() {
  const a = squad.active;
  const since = performance.now() - a.lastHitAt;
  if (since < 700) {
    const worldAng = Math.atan2(a.lastHitFrom.x - a.position.x, a.lastHitFrom.z - a.position.z);
    const rel = worldAng - a.yaw;                      // 0 = dead ahead
    dmgdirEl.style.transform = `translate(-50%, -50%) rotate(${(-rel * 180 / Math.PI).toFixed(1)}deg)`;
    dmgdirEl.style.opacity = (1 - since / 700) * 0.9;
    if (a.lastHitAt !== lastPulseAt) {
      lastPulseAt = a.lastHitAt;
      vignette.classList.remove('pulse');
      void vignette.offsetWidth;                       // restart the CSS animation
      vignette.classList.add('pulse');
    }
  } else {
    dmgdirEl.style.opacity = 0;
  }
}

function updateAbilityHUD() {
  const a = squad.active, ab = a.cls.ability;
  abilityEl.textContent = (ab.input === 'aim' ? 'RMB' : 'SPACE') + '  ' + ab.name;
  const engaged = (ab.key === 'suppress' && a.suppressing) || (ab.key === 'scope' && a.zoomed);
  abilityEl.classList.toggle('active', engaged);
  abilityEl.classList.toggle('cooldown', ab.input === 'press' && a.abilityCd > 0);
}

placeCamera();
loop();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
