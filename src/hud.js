// hud.js — the squad bar at the bottom of the screen.
//
// This is plain DOM (divs + CSS), layered over the 3D canvas. Games often draw
// their UI as regular HTML because it's far easier than drawing text in WebGL.
// We build the cards once, then just update numbers/classes each frame.

const cards = [];   // one entry per squad member: { root, hp, order }
let killsEl;

const ORDER_LABEL = {
  follow: 'FOLLOW', hold: 'HOLDING', move: 'MOVING', attack: 'ATTACK',
};

export function buildSquadHUD(squad) {
  const bar = document.getElementById('squad');
  killsEl = document.getElementById('kills');

  squad.members.forEach((m, i) => {
    const root = document.createElement('div');
    root.className = 'card';
    root.style.setProperty('--ring', '#' + m.cls.ringColor.toString(16).padStart(6, '0'));
    root.innerHTML = `
      <div class="card-top"><span class="key">${i + 1}</span><span class="name">${m.cls.name}</span></div>
      <div class="bar"><div class="fill"></div></div>
      <div class="order"></div>`;
    bar.appendChild(root);
    cards.push({ root, fill: root.querySelector('.fill'), order: root.querySelector('.order') });
  });
}

export function updateSquadHUD(squad, kills) {
  squad.members.forEach((m, i) => {
    const c = cards[i];
    const pct = Math.max(0, (m.health / m.maxHealth) * 100);
    c.fill.style.width = pct + '%';
    c.root.classList.toggle('active', i === squad.activeIndex && m.alive);
    c.root.classList.toggle('picked', squad.selected === m && m.alive);
    c.root.classList.toggle('dead', !m.alive);
    // The active soldier is "you"; others show their standing order.
    c.order.textContent = m.alive
      ? (i === squad.activeIndex ? 'YOU' : (ORDER_LABEL[m.order] || ''))
      : 'DOWN';
  });
  killsEl.textContent = kills;
}
