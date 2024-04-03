
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d');

type Phase = { name: string, description: string }

const phases: Phase[] = [
  { "name": "menstrual", "description": "something about menstrual phase" },
  { "name": "follicular", "description": "something about follicular phase" },
  { "name": "ovulation", "description": "something about ovulation phase" },
  { "name": "luteal", "description": "something about luteal phase" }
]

let circleX = 100;
let circleY = 100;
const radius = 25;
const moveSpeed = 1.5;
const groundSpeed = 2;
let isJumping = false;
const jumpSpeed = 5;
let groundCircleX = canvas.width - 50;
let isColliding = false;

function drawCircle(x: number, y: number, radius: number) {
  ctx?.beginPath();
  ctx?.arc(x, y, radius, 0, Math.PI * 2);
  ctx?.closePath();
  ctx?.stroke();
}

function drawGroundCircle(x: number, y: number, radius: number) {
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
  ctx?.clearRect(0, 0, canvas.width, canvas.height)

  if (!ctx) {
    return;
  }

  //move top circle
  if (!isColliding) {
    circleX += moveSpeed;
    if (circleX >= canvas.width - radius) {
      circleX = -radius
    }
  }


// move ground circle
  if (!isColliding) {
    groundCircleX -= groundSpeed;
    if (groundCircleX <= -50) {
      groundCircleX = canvas.width - 50
    }
  }


  collisionDetection();
  drawCircle(circleX, circleY, radius)
  drawGroundCircle(groundCircleX, 150, 10)
  drawLine(150, 50, 800);
}


function jumpUp() {
  const jumpInterval = setInterval(function() {
    circleY = Math.max(0, circleY - jumpSpeed);
    if (circleY === 0) {
      clearInterval(jumpInterval);
      descend();
    }
  }, 16);

  function descend() {
    const descendInterval = setInterval(function() {
      circleY = Math.min(100, circleY + jumpSpeed);
      if (circleY === 100) {
        clearInterval(descendInterval);
      }
    }, 16);
  }    
}

function collisionDetection() {
  const distanceX = Math.abs(circleX - groundCircleX);
  if (distanceX <= radius * 2) {
    isColliding = true;
    cyclePhases(phases)
  } else {
    isColliding = false;
  }
}

function cyclePhases(arr: Phase[]) {
  for (let i = 0; i < arr.length; i++) {
    const phase = arr[i]
    console.log(`Phase: ${phase.name} Description: ${phase.description}`)
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === ' ') {
    jumpUp();
  }
})

animate()



// canvas.addEventListener('click', function(e) {
//   circleX = e.clientX - canvas.getBoundingClientRect().left; 
// })

// *****************************************************************************
// **** code to move circle left, right, and jump up when pressing spacebar **** 
// document.addEventListener('keydown', function(event) {
//   if (event.key === "ArrowRight") {
//     circleX = Math.min(canvas.width - radius, circleX + moveSpeed);
//   } else if (event.key === "ArrowLeft") {
//     circleX = Math.max(radius, circleX - moveSpeed)
//   } else if (event.key === ' ') {
//     jumpUp();
//   }
// })
// *******************************************************************************


