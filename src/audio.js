// audio.js — every sound in the game, synthesized live with WebAudio.
// No files: gunshots are shaped noise + a sine thump, footsteps are filtered
// ticks, the stingers are tiny arpeggios. Distance attenuates enemy fire.

class Sfx {
  constructor() {
    this.ctx = null;
    this.master = null;
  }

  // Browsers require a user gesture before audio — call from a click handler.
  resume() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.32;
      this.master.connect(this.ctx.destination);
      this._startAmbient();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  _noiseBuffer(seconds) {
    const n = Math.floor(this.ctx.sampleRate * seconds);
    const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  _env(gainNode, t0, peak, decay) {
    const g = gainNode.gain;
    g.setValueAtTime(0.0001, t0);
    g.exponentialRampToValueAtTime(peak, t0 + 0.005);
    g.exponentialRampToValueAtTime(0.0001, t0 + decay);
  }

  // dist 0 = your own rifle; far shots get quieter and duller.
  gunshot(dist = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const vol = Math.max(0.05, 1 - dist / 60);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this._noiseBuffer(0.14);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 5200 - dist * 60;
    const ng = this.ctx.createGain();
    this._env(ng, t, 0.9 * vol, 0.13);
    noise.connect(lp).connect(ng).connect(this.master);
    noise.start(t);

    const thump = this.ctx.createOscillator();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(140, t);
    thump.frequency.exponentialRampToValueAtTime(45, t + 0.09);
    const tg = this.ctx.createGain();
    this._env(tg, t, 0.7 * vol, 0.1);
    thump.connect(tg).connect(this.master);
    thump.start(t); thump.stop(t + 0.12);
  }

  footstep() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._noiseBuffer(0.05);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 260 + Math.random() * 120;
    const g = this.ctx.createGain();
    this._env(g, t, 0.18, 0.05);
    noise.connect(bp).connect(g).connect(this.master);
    noise.start(t);
  }

  // The satisfying plastic "thock" of a confirmed kill.
  kill() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'square';
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(190, t + 0.08);
    const g = this.ctx.createGain();
    this._env(g, t, 0.25, 0.1);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.12);
  }

  sting(win) {
    if (!this.ctx) return;
    const notes = win ? [523, 659, 784, 1047] : [392, 311, 262];
    const step = win ? 0.13 : 0.24;
    notes.forEach((f, i) => {
      const t = this.ctx.currentTime + i * step;
      const o = this.ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = f;
      const g = this.ctx.createGain();
      this._env(g, t, 0.3, win ? 0.4 : 0.6);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.8);
    });
  }

  _startAmbient() {
    // A very quiet evening room tone so silence never feels dead.
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._noiseBuffer(4);
    noise.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 280;
    const g = this.ctx.createGain();
    g.gain.value = 0.05;
    noise.connect(lp).connect(g).connect(this.master);
    noise.start();
  }
}

export const sfx = new Sfx();
