// Generate 100 test players
const TOTAL = 100;
const players = Array.from({length: TOTAL}, (_, i) => {
  const name = `Testing${i + 1}`;
  const swordTier = (i % 5) + 1;
  const axeTier = ((i + 2) % 5) + 1;
  return { name, swordTier, axeTier };
});

function avatarFor(name) {
  return `https://crafatar.com/avatars/${encodeURIComponent(name)}?size=128&overlay=true`;
}

// Rankings list
const rankingsList = document.getElementById("rankings-list");
players.forEach((p, idx) => {
  const el = document.createElement("div");
  el.className = "player";
  el.innerHTML = `
    <div class="avatar"><img loading="lazy" src="${avatarFor(p.name)}" alt="${p.name}"></div>
    <div class="info">
      <div class="username">${p.name}</div>
      <div class="meta">Sword T${p.swordTier} • Axe T${p.axeTier}</div>
    </div>
    <div class="rank-badge">#${idx + 1}</div>
  `;
  rankingsList.appendChild(el);
});

// Render tier columns
function renderTiers(rootId, key) {
  const root = document.getElementById(rootId);
  for (let t = 1; t <= 5; t++) {
    const wrapper = document.createElement("div");
    wrapper.className = "tier";
    wrapper.innerHTML = `<h4>TIER ${t}</h4><div class="tier-list" id="${rootId}-tier-${t}"></div>`;
    root.appendChild(wrapper);
  }
  players.forEach(p => {
    const slot = document.getElementById(`${rootId}-tier-${p[key]}`);
    if (!slot) return;
    const row = document.createElement("div");
    row.className = "tier-player";
    row.innerHTML = `
      <div class="avatar" style="width:40px;height:40px">
        <img loading="lazy" src="${avatarFor(p.name)}" alt="${p.name}">
      </div>
      <div class="tier-label">${p.name}</div>
    `;
    slot.appendChild(row);
  });
}
renderTiers("sword-tiers", "swordTier");
renderTiers("axe-tiers", "axeTier");

// Smooth scrolling animation for the ranking list
(function smoothScrollEffect() {
  const el = rankingsList;
  let dir = 1;
  const speed = 0.15;
  function frame() {
    if (el.scrollHeight > el.clientHeight) {
      el.scrollTop += dir * speed;
      if (el.scrollTop >= el.scrollHeight - el.clientHeight - 1) dir = -1;
      if (el.scrollTop <= 0) dir = 1;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// Keyboard shortcuts
window.addEventListener("keydown", (e) => {
  if (e.key === "1") document.getElementById("sword").scrollIntoView({behavior: "smooth"});
  if (e.key === "2") document.getElementById("rankings").scrollIntoView({behavior: "smooth"});
  if (e.key === "3") document.getElementById("axe").scrollIntoView({behavior: "smooth"});
});