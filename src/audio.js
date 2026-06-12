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
      this._initMusic();
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

  // The bright plastic CRACK of a headshot — meaner than the body thock.
  crit() {
    if (!this.ctx) return;
    [1250, 1650].forEach((f, i) => {
      const t = this.ctx.currentTime + i * 0.035;
      const o = this.ctx.createOscillator();
      o.type = 'square';
      o.frequency.setValueAtTime(f, t);
      o.frequency.exponentialRampToValueAtTime(f * 0.7, t + 0.05);
      const g = this.ctx.createGain();
      this._env(g, t, 0.16, 0.06);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.08);
    });
  }

  // A body easing to the floor: one soft low thud. The whole point is how
  // little noise it makes next to a gunshot.
  takedown() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(170, t);
    o.frequency.exponentialRampToValueAtTime(70, t + 0.09);
    const g = this.ctx.createGain();
    this._env(g, t, 0.22, 0.12);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.14);
  }

  // Magazine out, magazine in: two mechanical clicks, a beat apart.
  reload() {
    if (!this.ctx) return;
    for (const [dt, f] of [[0, 900], [0.22, 1300]]) {
      const t = this.ctx.currentTime + dt;
      const o = this.ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = f;
      const g = this.ctx.createGain();
      this._env(g, t, 0.12, 0.03);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.05);
    }
  }

  // The hollow click of an empty rifle.
  dry() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = 1600;
    const g = this.ctx.createGain();
    this._env(g, t, 0.08, 0.025);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.04);
  }

  // Scooping up supplies / getting a buddy on his feet: two rising notes.
  pickup() {
    if (!this.ctx) return;
    [660, 990].forEach((f, i) => {
      const t = this.ctx.currentTime + i * 0.09;
      const o = this.ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = f;
      const g = this.ctx.createGain();
      this._env(g, t, 0.22, 0.16);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.25);
    });
  }

  // Objective complete: a small confident three-note rise.
  objective() {
    if (!this.ctx) return;
    [523, 659, 880].forEach((f, i) => {
      const t = this.ctx.currentTime + i * 0.11;
      const o = this.ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = f;
      const g = this.ctx.createGain();
      this._env(g, t, 0.26, 0.3);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.5);
    });
  }

  // The BOOM: a grenade going off — deep noise slam + sub thump.
  boom(dist = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const vol = Math.max(0.15, 1 - dist / 80);
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._noiseBuffer(0.5);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 380;
    const ng = this.ctx.createGain();
    this._env(ng, t, 1.1 * vol, 0.45);
    noise.connect(lp).connect(ng).connect(this.master);
    noise.start(t);
    const thump = this.ctx.createOscillator();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(70, t);
    thump.frequency.exponentialRampToValueAtTime(26, t + 0.3);
    const tg = this.ctx.createGain();
    this._env(tg, t, 0.9 * vol, 0.4);
    thump.connect(tg).connect(this.master);
    thump.start(t); thump.stop(t + 0.45);
  }

  // The tank's gun: a deeper, shorter slam than a rifle — you KNOW it's armor.
  cannon(dist = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const vol = Math.max(0.12, 1 - dist / 90);
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._noiseBuffer(0.25);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    const ng = this.ctx.createGain();
    this._env(ng, t, 0.9 * vol, 0.22);
    noise.connect(lp).connect(ng).connect(this.master);
    noise.start(t);
    const thump = this.ctx.createOscillator();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(95, t);
    thump.frequency.exponentialRampToValueAtTime(32, t + 0.18);
    const tg = this.ctx.createGain();
    this._env(tg, t, 0.8 * vol, 0.2);
    thump.connect(tg).connect(this.master);
    thump.start(t); thump.stop(t + 0.24);
  }

  // The bazooka leaving the tube: a rising whoosh of filtered noise.
  rocket() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._noiseBuffer(0.4);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(320, t);
    bp.frequency.exponentialRampToValueAtTime(1500, t + 0.3);
    bp.Q.value = 1.6;
    const g = this.ctx.createGain();
    this._env(g, t, 0.5, 0.35);
    noise.connect(bp).connect(g).connect(this.master);
    noise.start(t);
  }

  // A lightbulb dying: three tiny glass tinks.
  glass() {
    if (!this.ctx) return;
    [2600, 3400, 2100].forEach((f, i) => {
      const t = this.ctx.currentTime + i * 0.04;
      const o = this.ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = f;
      const g = this.ctx.createGain();
      this._env(g, t, 0.1, 0.05);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.07);
    });
  }

  // A sentry's suspicion crossing the line: one soft rising blip. Quieter
  // with distance — the cue is for threats near enough to matter.
  suspicion(dist = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    if (this._lastSus && t - this._lastSus < 0.3) return;
    this._lastSus = t;
    const o = this.ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(760, t + 0.09);
    const g = this.ctx.createGain();
    this._env(g, t, Math.max(0.05, 0.2 * (1 - dist / 55)), 0.13);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.16);
  }

  // MADE: the sharp two-note "!" sting. Globally throttled — a whole post
  // alerting at once is one sting, not a chord of them.
  spotted() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this._lastSpot && now - this._lastSpot < 1.4) return;
    this._lastSpot = now;
    [700, 1040].forEach((f, i) => {
      const t = now + i * 0.07;
      const o = this.ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f;
      const g = this.ctx.createGain();
      this._env(g, t, 0.17, 0.12);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.16);
    });
  }

  // The runner shouting into the handset: beeps that CLIMB as the call gets
  // through. You hear the alarm being raised, not just its result.
  callBeep(progress, dist = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = 470 + progress * 470;
    const g = this.ctx.createGain();
    this._env(g, t, Math.max(0.1, 0.3 * (1 - dist / 90)), 0.14);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.17);
  }

  // A round snapping PAST your head — the near-miss crack that makes enemy
  // fire feel dangerous before it ever lands.
  whiz() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    if (this._lastWhiz && t - this._lastWhiz < 0.08) return;
    this._lastWhiz = t;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._noiseBuffer(0.07);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.2;
    bp.frequency.setValueAtTime(3800, t);
    bp.frequency.exponentialRampToValueAtTime(1300, t + 0.07);
    const g = this.ctx.createGain();
    this._env(g, t, 0.2, 0.07);
    noise.connect(bp).connect(g).connect(this.master);
    noise.start(t);
  }

  // The tan field radio screaming for help: a two-tone siren burst.
  alarm() {
    if (!this.ctx) return;
    for (let i = 0; i < 4; i++) {
      const t = this.ctx.currentTime + i * 0.42;
      const o = this.ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(i % 2 ? 620 : 470, t);
      const g = this.ctx.createGain();
      this._env(g, t, 0.16, 0.36);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.4);
    }
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

  // --- MUSIC: two synth layers that follow the fight. ---
  // 'calm' = room tone only. 'tension' = a low detuned drone (someone is
  // hunting). 'combat' = the drone plus a chugging pulse. The layers run
  // forever at gain 0 and crossfade — the quiet-loud-quiet pacing, scored.
  _initMusic() {
    const c = this.ctx;
    this._musicState = 'calm';
    // TENSION: two saws a hair apart, low-passed to a felt-not-heard drone.
    this.tGain = c.createGain();
    this.tGain.gain.value = 0;
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 240;
    for (const f of [55, 55.7]) {
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f;
      o.connect(lp);
      o.start();
    }
    lp.connect(this.tGain).connect(this.master);
    // COMBAT: a low square chopped by a square LFO — a drum machine's worth
    // of urgency from two oscillators.
    this.cGain = c.createGain();
    this.cGain.gain.value = 0;
    const o = c.createOscillator();
    o.type = 'square';
    o.frequency.value = 82.4;                  // E2
    const chop = c.createGain();
    chop.gain.value = 0.5;
    const lfo = c.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 2.2;
    const depth = c.createGain();
    depth.gain.value = 0.5;
    lfo.connect(depth).connect(chop.gain);     // gate swings 0 → 1
    const clp = c.createBiquadFilter();
    clp.type = 'lowpass';
    clp.frequency.value = 420;
    o.connect(chop).connect(clp).connect(this.cGain).connect(this.master);
    o.start();
    lfo.start();
  }

  setMusic(state) {
    if (!this.ctx || state === this._musicState) return;
    this._musicState = state;
    const t = this.ctx.currentTime;
    const ramp = (g, v, dur) => {
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(v, t + dur);
    };
    ramp(this.tGain, state === 'calm' ? 0 : 0.085, state === 'calm' ? 2.5 : 1.2);
    ramp(this.cGain, state === 'combat' ? 0.1 : 0, state === 'combat' ? 0.5 : 1.8);
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
