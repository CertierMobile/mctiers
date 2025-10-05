// subtle moving grid + parallax tilt on mouse move (background only)
// creates an animated feeling without heavy CPU usage

const bg = document.getElementById('bg-canvas');

// create a canvas overlay for a soft moving grid
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.inset = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-3';
canvas.style.pointerEvents = 'none';
bg.appendChild(canvas);

const ctx = canvas.getContext('2d');
let w=0,h=0,device=1,offset=0;
function resize(){
  device = window.devicePixelRatio || 1;
  w = canvas.width = Math.floor(canvas.clientWidth * device);
  h = canvas.height = Math.floor(canvas.clientHeight * device);
}
resize();
window.addEventListener('resize', resize);

function drawGrid(t){
  ctx.clearRect(0,0,w,h);
  ctx.save();
  ctx.scale(device, device);

  const gap = 48;
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;

  // moving offset for subtle motion
  offset = (t * 0.01) % gap;
  for(let x = -gap; x < (w/device)+gap; x += gap){
    ctx.beginPath();
    ctx.moveTo(x + offset, -gap);
    ctx.lineTo(x + offset, (h/device)+gap);
    ctx.stroke();
  }
  for(let y = -gap; y < (h/device)+gap; y += gap){
    ctx.beginPath();
    ctx.moveTo(-gap, y + offset);
    ctx.lineTo((w/device)+gap, y + offset);
    ctx.stroke();
  }

  ctx.restore();
}

let last = 0;
function loop(ts){
  drawGrid(ts/10);
  last = ts;
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// slight parallax effect by translating the bg element on mouse move (subtle)
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e)=>{
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;
  const tx = mouseX * 18;
  const ty = mouseY * 12;
  bg.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
});