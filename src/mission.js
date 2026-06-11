// mission.js — runs one mission: spawns its enemies, tracks the objective, and
// decides win ('won') or loss ('lost'). The main loop asks it for status text and
// state each frame.

import * as THREE from 'three';

export class MissionRunner {
  constructor(def, scene, exit) {
    this.def = def;
    this.scene = scene;
    this.exit = exit;          // the front-door breach zone (escape missions)
    this.state = 'active';     // 'active' | 'won' | 'lost'
    this.timeAcc = 0;          // survive countdown / secure hold timer
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
    this.startKills = enemies.kills;
    if (this.def.enemyLayout) enemies.spawnLayout(this.def.enemyLayout);
  }

  killCount(enemies) {
    return enemies.kills - this.startKills;
  }

  update(dt, squad, enemies) {
    if (this.state !== 'active') return;
    const o = this.def.objective;
    // (No reinforcement waves anywhere — campaign rule: the enemy you meet is
    // the enemy that lives there.)

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

    if (o.type === 'escape') {
      // Any living member in the door zone, with no living tan contesting it.
      const z = this.exit;
      let inside = false, contested = false;
      for (const m of squad.members) {
        if (m.alive && Math.hypot(m.position.x - z.x, m.position.z - z.z) < z.r) inside = true;
      }
      for (const e of enemies.list) {
        if (Math.hypot(e.pos.x - z.x, e.pos.z - z.z) < z.r + 9) { contested = true; break; }
      }
      this.timeAcc = (inside && !contested)
        ? this.timeAcc + dt
        : Math.max(0, this.timeAcc - dt * 0.6);
      if (this.timeAcc >= o.holdSeconds) this.state = 'won';
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
    if (o.type === 'escape') {
      if (this.timeAcc > 0.05) return `BREACHING THE FRONT DOOR   ${this.timeAcc.toFixed(1)} / ${o.holdSeconds}s`;
      const tag = enemies.firstSpotted ? '' : '   ·   UNDETECTED';
      return `ESCAPE THE HOUSE — reach the front door   (tan: ${enemies.list.length})${tag}`;
    }
    return '';
  }
}
