// Tier points system
const tierPoints = {
  'LT5':1,'HT5':2,'LT4':3,'HT4':5,'LT3':6,'HT3':9,'LT2':12,'HT2':15,'LT1':20,'HT1':60
};

// Sample top 20 players
const players = [
  { name: 'Marlowww', region:'EU', pts:60 },
  { name: 'ItzRealMe', region:'NA', pts:55 },
  { name: 'Swight', region:'EU', pts:50 },
  { name: 'Coldified', region:'NA', pts:48 },
  { name: 'Kylaz', region:'SA', pts:45 },
  { name: 'BlvckWlf', region:'EU', pts:42 },
  { name: 'janekv', region:'NA', pts:40 },
  { name: 'Lurrn', region:'EU', pts:36 },
  { name: 'yMiau', region:'NA', pts:33 },
  { name: 'Deivi_17', region:'EU', pts:30 },
  { name: 'Juan_Clean', region:'SA', pts:28 },
  { name: 'ninorc15', region:'NA', pts:24 },
  { name: 'Arsakha', region:'EU', pts:20 },
  { name: 'Xpera', region:'EU', pts:16 },
  { name: 'Frxnkey', region:'NA', pts:12 },
  { name: 'Hosthan', region:'EU', pts:9 },
  { name: 'Spawnplayer', region:'SA', pts:6 },
  { name: 'michaelcycle00', region:'NA', pts:5 },
  { name: 'Inapplicable', region:'EU', pts:3 },
  { name: 'Dishwasher1221', region:'NA', pts:1 }
];

function tierLabel(points){
  if(points >= tierPoints.HT1) return 'HT1';
  if(points >= tierPoints.LT1) return 'LT1';
  if(points >= tierPoints.HT2) return 'HT2';
  if(points >= tierPoints.LT2) return 'LT2';
  if(points >= tierPoints.HT3) return 'HT3';
  if(points >= tierPoints.LT3) return 'LT3';
  if(points >= tierPoints.HT4) return 'HT4';
  if(points >= tierPoints.LT4) return 'LT4';
  if(points >= tierPoints.HT5) return 'HT5';
  return 'LT5';
}

const rows = document.getElementById('rows');

function avatar(name){
  return `https://mc-heads.net/avatar/${encodeURIComponent(name)}/100`;
}

function makeRow(p,index){
  const el = document.createElement('div');
  el.className = 'row';
  if(index===0) el.classList.add('top-1');
  if(index===1) el.classList.add('top-2');
  if(index===2) el.classList.add('top-3');

  el.innerHTML = `
    <div class="col rank">
      <div class="num ${index<3?'top':''}">${index+1}</div>
    </div>

    <div class="col player">
      <div class="player-cell">
        <div class="avatar"><img src="${avatar(p.name)}" alt="${p.name}"></div>
        <div class="pname">
          <div class="user">${p.name}</div>
          <div class="title">${tierLabel(p.pts)}</div>
        </div>
      </div>
    </div>

    <div class="col region">
      <div class="region-badge">${p.region}</div>
    </div>

    <div class="col tiers">
      <div class="tier-list">
        <div class="tier-badge top">${tierLabel(p.pts)}</div>
      </div>
    </div>

    <div class="col pts">
      <div class="points">${p.pts}</div>
    </div>
  `;
  return el;
}

// render rows
players.forEach((p,i)=> rows.appendChild(makeRow(p,i)));

// search functionality
document.getElementById('searchInput').addEventListener('input',(e)=>{
  const q = e.target.value.toLowerCase().trim();
  rows.innerHTML='';
  players.filter(p=>p.name.toLowerCase().includes(q))
         .forEach((p,i)=> rows.appendChild(makeRow(p,i)));
});