import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight;

    init();
});

class Ball {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
    
}

const getDistance = (x1, x2, y1, y2) => {
    let xDistance = x1 - x2;
    let yDistance = y1 - y2;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Implementation
let objects
let ball;
let ball2;
function init() {
    objects = []

    for (let i = 0; i < 400; i++) {
        // objects.push();
    }

    ball = new Ball(canvas.width / 2, canvas.height / 2, 100, 'black');
    ball2 = new Ball(10, 10, 30, 'red');
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    let distance = getDistance(ball.x, ball2.x, ball.y, ball2.y);


    if(distance < ball.radius + ball2.radius) {
        ball.color = 'red';
    } else {
        ball.color = 'black';
    }

    ball.update();
    ball2.update()
    ball2.x = mouse.x;
    ball2.y = mouse.y;

}

init()
animate()
