import {randomIntFromRange, randomColor} from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colorArray = ["#112F41", "#068587", "#4FB99F", "#F2B134", "#ED553B"];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian = Math.random() * Math.PI * 2;
    this.velocity = 0.05;    
    this.distance = randomIntFromRange(50, 120);
    this.lastMouse = {x: x, y: y};

    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
    
    this.update = () => {
        const lastPoint = {x : this.x, y : this.y};
        // Move Points over time

        //Drag Effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //Circular Motion
        this.radian += this.velocity;
        this.x = this.lastMouse.x + Math.cos(this.radian) * this.distance;
        this.y = this.lastMouse.y + Math.sin(this.radian) * this.distance;

        this.draw(lastPoint);
    }
}

// Implementation
let particles;

function init() {
    particles = [];

    for (let i = 0; i < 150; i++) {
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let radius = randomIntFromRange(2,3);
        let color = randomColor(colorArray);
        particles.push(new Particle(x, y, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(255, 255, 255, 0.1)`;
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
}

init()
animate()
