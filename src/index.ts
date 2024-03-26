
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d');

let circleX = 100;
const circleY = 100;
const radius = 25;
const speed = 5;

function drawCircle(x: number, y: number, radius: number) {
  ctx?.clearRect(0, 0, canvas.width, canvas.height)
  ctx?.beginPath();
  ctx?.arc(x, y, radius, 0, Math.PI * 2);
  ctx?.closePath();
  ctx?.stroke();
}


function drawLine(y: number, x1: number, x2: number) {
  ctx?.beginPath();
  ctx?.moveTo(x1, y);
  ctx?.lineTo(x2, y);
  ctx?.stroke();
}

function animate() {
  requestAnimationFrame(animate)
  drawCircle(circleX, circleY, radius)
  drawLine(150, 50, 800);
}

// canvas.addEventListener('click', function(e) {
//   circleX = e.clientX - canvas.getBoundingClientRect().left; 
// })

document.addEventListener('keydown', function(event) {
  if (event.key === "ArrowRight") {
    circleX = Math.min(canvas.width - radius, circleX + speed);
  } else if (event.key === "ArrowLeft") {
    circleX = Math.max(radius, circleX - speed)
  }
})

animate()