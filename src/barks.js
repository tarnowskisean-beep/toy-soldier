// barks.js — little speech sprites over soldiers' heads. A toy battlefield
// should TALK: tan sentries shout when they spot you, mutter when they give
// up the hunt, scream GRENADE; your squad acks orders and calls reloads.
//
// One shared system: barks.say(figure, text, color). Each figure has a
// cooldown so chatter never becomes spam; sprites pop, drift up, vanish.

import * as THREE from 'three';

const matCache = new Map();
function barkMaterial(text, color) {
  const key = color + '|' + text;
  if (matCache.has(key)) return matCache.get(key);
  const c = document.createElement('canvas');
  c.width = 512; c.height = 96;
  const g = c.getContext('2d');
  g.font = 'bold 44px "Courier New", monospace';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = 9; g.strokeStyle = 'rgba(0,0,0,0.9)';
  g.strokeText(text, 256, 50);
  g.fillStyle = color;
  g.fillText(text, 256, 50);
  const m = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false });
  matCache.set(key, m);
  return m;
}

class Barks {
  constructor() {
    this.live = [];
  }

  say(fig, text, color = '#eaffea') {
    const now = performance.now();
    if (fig.userData.lastBark && now - fig.userData.lastBark < 3200) return;
    fig.userData.lastBark = now;
    const sp = new THREE.Sprite(barkMaterial(text, color));
    sp.scale.set(Math.min(8.5, 1.6 + text.length * 0.34), 1.15, 1);
    sp.position.set(0, 3.7, 0);
    fig.add(sp);
    this.live.push({ sp, fig, t: 0 });
  }

  update(dt) {
    for (let i = this.live.length - 1; i >= 0; i--) {
      const b = this.live[i];
      b.t += dt;
      b.sp.position.y = 3.7 + b.t * 0.45;
      if (b.t > 1.7) {
        b.fig.remove(b.sp);
        this.live.splice(i, 1);
      }
    }
  }
}

export const barks = new Barks();
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
