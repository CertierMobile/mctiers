// Top 20 player data (provided names + sample titles/points/region)
const players = [
  { name: 'Marlowww', title: 'Combat Grandmaster', pts: 18950, region: 'EU', tiers:['S1','A1','B3'] },
  { name: 'ItzRealMe', title: 'Combat Ace', pts: 17840, region: 'NA', tiers:['S2','A1','B2'] },
  { name: 'Swight', title: 'Combat Ace', pts: 17120, region: 'EU', tiers:['S1','A2','B3'] },
  { name: 'Coldified', title: 'Combat Veteran', pts: 16300, region: 'NA', tiers:['S3','A2','B4'] },
  { name: 'Kylaz', title: 'Combat Veteran', pts: 15820, region: 'SA', tiers:['S2','A3','B2'] },
  { name: 'BlvckWlf', title: 'Combat Expert', pts: 15200, region: 'EU', tiers:['S4','A4','B1'] },
  { name: 'janekv', title: 'Combat Expert', pts: 14950, region: 'NA', tiers:['S3','A2','B2'] },
  { name: 'Lurrn', title: 'Combat Pro', pts: 14560, region: 'EU', tiers:['S5','A3','B2'] },
  { name: 'yMiau', title: 'Combat Pro', pts: 14120, region: 'NA', tiers:['S2','A1','B1'] },
  { name: 'Deivi_17', title: 'Combat Veteran', pts: 13780, region: 'EU', tiers:['S3','A3','B3'] },
  { name: 'Juan_Clean', title: 'Combat Veteran', pts: 13420, region: 'SA', tiers:['S1','A4','B2'] },
  { name: 'ninorc15', title: 'Combat Expert', pts: 13150, region: 'NA', tiers:['S2','A2','B4'] },
  { name: 'Arsakha', title: 'Combat Expert', pts: 12940, region: 'EU', tiers:['S3','A1','B3'] },
  { name: 'Xpera', title: 'Combat Pro', pts: 12680, region: 'EU', tiers:['S4','A2','B2'] },
  { name: 'Frxnkey', title: 'Combat Pro', pts: 12300, region: 'NA', tiers:['S5','A2','B1'] },
  { name: 'Hosthan', title: 'Combat Ace', pts: 11920, region: 'EU', tiers:['S2','A3','B3'] },
  { name: 'Spawnplayer', title: 'Combat Ace', pts: 11650, region: 'SA', tiers:['S1','A1','B2'] },
  { name: 'michaelcycle00', title: 'Combat Veteran', pts: 11440, region: 'NA', tiers:['S3','A2','B4'] },
  { name: 'Inapplicable', title: 'Combat Expert', pts: 11210, region: 'EU', tiers:['S4','A3','B2'] },
  { name: 'Dishwasher1221', title: 'Combat Pro', pts: 10980, region: 'NA', tiers:['S2','A2','B3'] }
];

// util: placeholder avatar via dicebear identicon (guaranteed placeholder)
function avatar(name){
  return `https://avatars.dicebear.com/api/identicon/${encodeURIComponent(name)}.svg`;
}

const rows = document.getElementById('rows');

function makeRow(p, index){
  const el = document.createElement('div');
  el.className = 'row';
  if(index === 0) el.classList.add('top-1');
  if(index === 1) el.classList.add('top-2');
  if(index === 2) el.classList.add('top-3');

  el.innerHTML = `
    <div class="col rank">
      <div class="num ${index<3 ? 'top' : ''}">${index+1}</div>
    </div>

    <div class="col player">
      <div class="player-cell">
        <div class="avatar"><img src="${avatar(p.name)}" alt="${p.name}"></div>
        <div class="pname">
          <div class="user">${p.name}</div>
          <div class="title">${p.title}</div>
        </div>
      </div>
    </div>

    <div class="col region">
      <div class="region-badge">${p.region}</div>
    </div>

    <div class="col tiers">
      <div class="tier-list">
        ${p.tiers.map((t,i)=>`<div class="tier-badge ${i===0 ? 'top' : ''}" title="${t}">${t}</div>`).join('')}
      </div>
    </div>

    <div class="col pts">
      <div class="points">${p.pts.toLocaleString()}</div>
    </div>
  `;
  return el;
}

// initial render
players.forEach((p,i)=> rows.appendChild(makeRow(p,i)));

// search (client-side)
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase().trim();
  rows.innerHTML = '';
  players.filter(p => p.name.toLowerCase().includes(q)).forEach((p,i)=> rows.appendChild(makeRow(p,i)));
});