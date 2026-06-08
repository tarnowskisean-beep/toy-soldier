// mission.js — runs one mission: spawns its enemies, tracks the objective, and
// decides win ('won') or loss ('lost'). The main loop asks it for status text and
// state each frame.

import * as THREE from 'three';

export class MissionRunner {
  constructor(def, scene) {
    this.def = def;
    this.scene = scene;
    this.state = 'active';     // 'active' | 'won' | 'lost'
    this.timeAcc = 0;          // survive countdown / secure hold timer
    this.waveTimer = def.enemies.waves ? def.enemies.waves.interval : 0;
    this.startKills = 0;
    this.zone = null;

    // Secure missions get a visible target ring on the ground.
    if (def.objective.type === 'secure') {
      const z = def.objective.zone;
      const ring = new THREE.Mesh(
        new THREE.CylinderGeometry(z.r, z.r, 0.15, 36),
        new THREE.MeshBasicMaterial({ color: 0x6fff6f, transparent: true, opacity: 0.22 })
      );
      ring.position.set(z.x, 0.08, z.z);
      scene.add(ring);
      this.zone = ring;
    }
  }

  // Spawn the mission's starting enemies. Call once after construction.
  begin(enemies) {
    enemies.respawnOnDeath = false;
    this.startKills = enemies.kills;
    if (this.def.enemies.initial) enemies.spawnWave(this.def.enemies.initial);
  }

  killCount(enemies) {
    return enemies.kills - this.startKills;
  }

  update(dt, squad, enemies) {
    if (this.state !== 'active') return;
    const o = this.def.objective;

    // Reinforcement waves (survive missions).
    const w = this.def.enemies.waves;
    if (w) {
      this.waveTimer -= dt;
      if (this.waveTimer <= 0 && enemies.list.length < w.max) {
        enemies.spawnWave(Math.min(w.perWave, w.max - enemies.list.length));
        this.waveTimer = w.interval;
      }
    }

    // Objective progress.
    if (o.type === 'eliminate') {
      if (this.killCount(enemies) >= o.count) this.state = 'won';
    } else if (o.type === 'survive') {
      this.timeAcc += dt;
      if (this.timeAcc >= o.seconds) this.state = 'won';
    } else if (o.type === 'secure') {
      const z = o.zone;
      let inside = false;
      for (const m of squad.members) {
        if (!m.alive) continue;
        if (Math.hypot(m.position.x - z.x, m.position.z - z.z) < z.r) { inside = true; break; }
      }
      // Progress while a soldier holds it; bleed off (slowly) when nobody does.
      this.timeAcc = inside
        ? this.timeAcc + dt
        : Math.max(0, this.timeAcc - dt * 0.5);
      if (this.zone) this.zone.material.opacity = inside ? 0.45 : 0.22;
      if (this.timeAcc >= o.seconds) this.state = 'won';
    }

    // Loss: the whole squad is down.
    if (!squad.alive) this.state = 'lost';
  }

  statusText(enemies) {
    const o = this.def.objective;
    if (o.type === 'eliminate') {
      return `ELIMINATE TANGOS   ${Math.min(this.killCount(enemies), o.count)} / ${o.count}`;
    }
    if (o.type === 'survive') {
      return `HOLD THE LINE   ${Math.max(0, Math.ceil(o.seconds - this.timeAcc))}s`;
    }
    if (o.type === 'secure') {
      return `SECURE THE ZONE   ${Math.min(this.timeAcc, o.seconds).toFixed(1)} / ${o.seconds}s`;
    }
    return '';
  }
}
