const bg = document.getElementById('bg-canvas');
const canvas = document.createElement('canvas');
canvas.style.position='absolute';
canvas.style.inset='0';
canvas.style.width='100%';
canvas.style.height='100%';
canvas.style.zIndex='-3';
canvas.style.pointerEvents='none';
bg.appendChild(canvas);
const ctx = canvas.getContext('2d');

let w=0,h=0,device=1;
function resize(){ device = window.devicePixelRatio || 1; w=canvas.width=Math.floor(canvas.clientWidth*device); h=canvas.height=Math.floor(canvas.clientHeight*device) }
resize();
window.addEventListener('resize', resize);

let mouseX=0,mouseY=0;
window.addEventListener('mousemove',e=>{ mouseX=e.clientX; mouseY=e.clientY });

function drawGrid(){
  ctx.clearRect(0,0,w,h);
  ctx.save();
  ctx.scale(device,device);
  const gap=48;
  for(let x=-gap;x<(w/device)+gap;x+=gap){
    for(let y=-gap;y<(h/device)+gap;y+=gap){
      let dx = mouseX - x, dy = mouseY - y, dist=Math.sqrt(dx*dx+dy*dy);
      let alpha=Math.max(0.02,0.06-dist*0.001);
      ctx.strokeStyle=`rgba(165,108,255,${alpha})`;
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(x,0); ctx.lineTo(x,h/device); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,y); ctx.lineTo(w/device,y); ctx.stroke();
    }
  }
  ctx.restore();
}

requestAnimationFrame(function loop(){ drawGrid(); requestAnimationFrame(loop) });

bg.style.transition='transform 0.12s linear';
window.addEventListener('mousemove', e=>{
  const tx=(e.clientX/window.innerWidth