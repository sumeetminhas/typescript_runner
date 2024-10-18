const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d');

type Phase = {
	coord: { x: number; y: number };
	id: number;
	name: string;
	description: string;
	speed: number;
  isColliding: boolean;
};

const phases: Phase[] = [
	{
		coord: { x: canvas.width - 50, y: 149 },
		id: 1,
		name: 'menstrual',
		description: 'something about menstrual phase',
		speed: 6,
    isColliding: false
	},
	{
		coord: { x: canvas.width - 50, y: 149 },
		id: 2,
		name: 'follicular',
		description: 'something about follicular phase',
		speed: 4,
    isColliding: false
	},
	{
		coord: { x: canvas.width - 50, y: 149 },
		id: 3,
		name: 'ovulation',
		description: 'something about ovulation phase',
		speed: 2,
    isColliding: false
	},
	{
		coord: { x: canvas.width - 50, y: 149 },
		id: 4,
		name: 'luteal',
		description: 'something about luteal phase',
		speed: 1,
    isColliding: false
	},
];

let circleX = 100;
let circleY = 100;
const radius = 25;
const moveSpeed = 1.5;
const groundSpeed = 2;
let isJumping = false;
const jumpSpeed = 5;
let pause = false;
let collisionID: null | number = null;

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
	if (!pause) {
		requestAnimationFrame(animate);
		ctx?.clearRect(0, 0, canvas.width, canvas.height);

		if (!ctx) {
			return;
		}

		// // move ground circle
		//     groundCircleX -= groundSpeed;
		//     if (groundCircleX <= -50) {
		//       groundCircleX = canvas.width - 50
		//     }

		phases.forEach((phase) => {
			phase.coord.x -= phase.speed;
			if (phase.coord.x <= -50) {
				phase.coord.x = canvas.width - 50;
			}
			drawCircle(phase.coord.x, phase.coord.y, radius);
		});

		//move top circle
		circleX += moveSpeed;
		if (circleX >= canvas.width - radius) {
			circleX = -radius;
		}

		collisionDetection();
		drawCircle(circleX, circleY, radius);
		// drawGroundCircle(groundCircleX, 150, 10)
		drawLine(150, 50, 800);
	} else {
		const phase = phases.find((p) => p.id === collisionID);
		if (phase) {
			ctx?.beginPath();
			ctx?.rect(20, 20, 200, 200);
			ctx?.stroke();
			ctx?.fillText(phase.name, 30, 50);
			ctx?.fillText(phase.description, 30, 70);
		}
	}
}

function jumpUp() {
	const jumpInterval = setInterval(function () {
		circleY = Math.max(0, circleY - jumpSpeed);
		if (circleY === 0) {
			clearInterval(jumpInterval);
			descend();
		}
	}, 16);

	function descend() {
		const descendInterval = setInterval(function () {
			circleY = Math.min(100, circleY + jumpSpeed);
			if (circleY === 100) {
				clearInterval(descendInterval);
			}
		}, 16);
	}
}

function collisionDetection() {
	for (let i = 0; i < phases.length; i++) {
		// const distanceX = Math.abs(circleX - groundCircleX);
		const distanceX = Math.abs(circleX - phases[i].coord.x);
    const distanceY = Math.abs(circleY - phases[i].coord.y);
    const distance = Math.sqrt(distanceX**2 + distanceY**2)

    if (distance <= radius + radius) {
      if (!phases[i].isColliding){
        pause = true;
        collisionID = phases[i].id;
        phases[i].isColliding = true;
        console.log('collision id', collisionID);
        break;
      }
    }
		// if (distanceX <= radius * 2) {
		// 	if (distanceY <= radius * 2) {

		// 	}
			// numberOfCollisions += 1
		else {
			pause = false;
      phases[i].isColliding = false;
		}
	}
}

document.addEventListener('keydown', function (e) {
	if (e.key === 'i') {
		if (pause) {
			pause = false;
			collisionID = null;
			animate();
		}
	}
});

document.addEventListener('keydown', function (e) {
	if (e.key === ' ') {
		jumpUp();
	}
});

animate();

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
