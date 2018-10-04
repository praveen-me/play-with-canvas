import {randomIntFromRange, randomColor, distance} from './utils.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 1;
const friction = 0.79;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener('click', init);

// Objects
class Ball {
    constructor(x, y,dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.dx = dx;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        if(this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
       } else {
            this.dy += gravity;
        }

        if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }
}

// Implementation
let ballArray = [];
const colorArray = ["#112F41", "#068587", "#4FB99F", "#F2B134", "#ED553B"];
function init() {
    ballArray = [];
    for (let i = 0; i < 200; i++) {
        let radius = randomIntFromRange(8, 20);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(0, canvas.height -radius);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2 , 2);
        let color = randomColor(colorArray)
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    ballArray.forEach(ball => ball.update());
}

init()
animate()
