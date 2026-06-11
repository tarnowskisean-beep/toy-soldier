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
import { hasLineOfSight } from './physics.js';

// --- Renderer + camera ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
const CAM_DISTANCE = 7, CAM_HEIGHT = 2.2;

// --- Build the world + squad (enemies spawn when a mission starts) ---
const { scene, obstacles, coverPoints, exit, exitGlow } = createWorld();
const input = new Input(renderer.domElement);
const squad = new Squad(scene, obstacles);
const bullets = new Bullets(scene, obstacles);
const enemies = new Enemies(scene, obstacles, coverPoints);
const grenades = new Grenades(scene, obstacles);
buildSquadHUD(squad);
window.game = { scene, camera, squad, bullets, enemies, grenades, input };

// --- Campaign state machine ---
let state = 'menu';          // 'menu' | 'brief' | 'playing' | 'won' | 'lost'
let mission = null;          // active MissionRunner
let currentDef = null;       // active mission definition

const $ = (id) => document.getElementById(id);
const menuEl = $('menu'), startEl = $('start'), winEl = $('win'), loseEl = $('gameover');
const objectiveEl = $('objective'), crosshair = $('crosshair');
const vignette = $('vignette'), abilityEl = $('ability'), scopeEl = $('scope');

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
  hideAllScreens();
  mission = new MissionRunner(currentDef, scene, exit);
  mission.begin(enemies);
  objectiveEl.classList.remove('hidden');
  state = 'playing';
  input.requestLock();
}

function onWin() {
  state = 'won';
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

// --- Boot into the saved screen ---
(function boot() {
  const screen = localStorage.getItem('ts_screen') || 'menu';
  if (screen.startsWith('mission:')) {
    const def = missionById(screen.slice('mission:'.length));
    if (def) showBriefing(def); else showMenu();
  } else {
    showMenu();
  }
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
    const cx = e.pos.x, cy = 1.1, cz = e.pos.z;
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
      if (aim.enemy) squad.orderAttack(aim.enemy);
      else squad.orderMove(aim.point.clone());
    }
    if (input.consume('KeyF')) squad.orderFollow();
    if (input.consume('KeyH')) squad.orderHold();
    if (input.consume('KeyC')) squad.active.crouched = !squad.active.crouched;
    if (input.consume('KeyM')) mapMode = !mapMode;

    handleAbility(aim);

    squad.update(dt, { input, enemies: enemies.list, bullets, free: enemies.combatStarted });
    if (input.firing && !mapMode && squad.active.tryFireAt(aim.point, bullets)) {
      // The shot is LOUD: sentries in earshot wake, the flash pops, the camera kicks.
      const mz = squad.active.muzzleWorldPosition();
      enemies.hearGunshot(mz);
      muzzleLight.position.copy(mz);
      muzzleLight.intensity = 26;
      squad.active.pitch += 0.012;
    }
    muzzleLight.intensity *= Math.pow(0.0001, dt);   // fast falloff
    grenades.update(dt, enemies.list);
    bullets.update(dt);
    enemies.update(dt, squad, bullets);
    squad.takeBulletHits(bullets);

    placeCamera();
    updateZoom(dt);

    updateSquadHUD(squad, enemies.kills);
    updateAbilityHUD();
    crosshair.classList.toggle('hit', enemies.hitFlash > 0);
    exitGlow.material.opacity = 0.25 + 0.15 * Math.sin(performance.now() * 0.004);
    vignette.classList.toggle('show', squad.active.alive && squad.active.health < 35);

    // --- Mission objective ---
    mission.update(dt, squad, enemies);
    objectiveEl.textContent = mission.statusText(enemies);
    if (mission.state === 'won') onWin();
    else if (mission.state === 'lost') onLose();
  }

  input.endFrame();
  renderer.render(scene, camera);
}
window.game.step = (frames = 1, dt = 1 / 60) => { for (let i = 0; i < frames; i++) tick(dt); };

function placeCamera() {
  if (mapMode) {
    // Tactical map: straight down over the house. Enemies you haven't met stay
    // hidden — the map shows squad intel, not omniscience.
    camera.position.set(73.5, 115, 0.01);
    camera.lookAt(73.5, 0, 0);
    for (const e of enemies.list) {
      let seen = e.alerted || e.aware > 0.05;
      if (!seen) {
        for (const m of squad.members) {
          if (!m.alive) continue;
          if (m.position.distanceTo(e.pos) < 40 &&
              hasLineOfSight(m.position, e.pos, obstacles)) { seen = true; break; }
        }
      }
      e.fig.visible = seen;
    }
    return;
  }
  for (const e of enemies.list) e.fig.visible = true;
  const a = squad.active;
  const ty2 = a.position.y + CAM_HEIGHT * (a.crouched ? 0.7 : 1);
  const tx = a.position.x, ty = ty2, tz = a.position.z;
  const cp = Math.cos(a.pitch), sp = Math.sin(a.pitch);
  camera.position.set(
    tx - Math.sin(a.yaw) * cp * CAM_DISTANCE,
    ty + sp * CAM_DISTANCE,
    tz - Math.cos(a.yaw) * cp * CAM_DISTANCE
  );
  camera.lookAt(tx, ty, tz);
}

function handleAbility(aim) {
  const a = squad.active;
  a.suppressing = false;
  a.zoomed = false;
  if (!a.alive) return;
  const ab = a.cls.ability;
  if (ab.input === 'hold') {
    const held = input.aiming;
    if (ab.key === 'scope') a.zoomed = held;
    if (ab.key === 'suppress') {
      a.suppressing = held;
      if (held) enemies.applySuppression(aim.point, 9, 0.7);
    }
  } else if (input.consume('Space') && a.abilityCd <= 0) {
    if (ab.key === 'grenade') {
      grenades.throwAt(a.muzzleWorldPosition(), aim.point);
      a.abilityCd = ab.cooldown;
    } else if (ab.key === 'revive') {
      if (squad.reviveNear(a)) a.abilityCd = ab.cooldown;
    }
  }
}

function updateZoom(dt) {
  const target = squad.active.zoomed ? 28 : 70;
  camFov += (target - camFov) * Math.min(1, dt * 12);
  if (Math.abs(camera.fov - camFov) > 0.01) {
    camera.fov = camFov;
    camera.updateProjectionMatrix();
  }
  scopeEl.classList.toggle('show', squad.active.zoomed);
}

function updateAbilityHUD() {
  const a = squad.active, ab = a.cls.ability;
  abilityEl.textContent = (ab.input === 'hold' ? 'RMB' : 'SPACE') + '  ' + ab.name;
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
