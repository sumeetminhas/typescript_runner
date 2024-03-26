
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d');

function drawCircle(x: number, y: number, radius: number) {
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

drawCircle(100, 100, 25);
drawLine(150, 50, 800);