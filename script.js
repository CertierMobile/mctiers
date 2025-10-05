const tierPoints = {
  'LT5':1,'HT5':2,'LT4':3,'HT4':5,'LT3':6,'HT3':9,'LT2':12,'HT2':15,'LT1':20,'HT1':60
};

const rows = document.getElementById('rows');

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

function avatar(name){
  return `https://mc-heads.net/avatar/${encodeURIComponent(name)}/100`;
}

function makeRow(p,index){
  const el = document.createElement('div');
  el.className = 'row';
  if(index===0) el.classList.add('top-1');
  if(index===1) el.classList.add('top-2');
  if(index===2) el.classList.add('top-3');

  const gamemodeBadges = Object.entries(p.gamemodes).map(([gm, pts])=>{
    return `<div class="tier-badge" data-gm="${gm}" title="${gm}">${tierLabel(pts)}</div>`;
  }).join('');

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
          <div class="tier-list">${gamemodeBadges}</div>
        </div>
      </div>
    </div>
    <div class="col region">
      <div class="region-badge">${p.region}</div>
    </div>
    <div class="col pts">
      <div class="points">${p.pts}</div>
    </div>
  `;
  return el;
}

// fetch leaderboard dynamically
fetch('players.json')
  .then(r => r.json())
  .then(data => {
    data.forEach((p,i)=> rows.appendChild(makeRow(p,i)));
  });

// search
document.getElementById('searchInput').addEventListener('input',(e)=>{
  const q = e.target.value.toLowerCase().trim();
  rows.innerHTML='';
  fetch('players.json')
    .then(r => r.json())
    .then(data => {
      data.filter(p=>p.name.toLowerCase().includes(q))
          .forEach((p,i)=> rows.appendChild(makeRow(p,i)));
    });
});
