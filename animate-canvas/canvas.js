const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
    context.strokeStyle = `blue`;
    context.stroke();
    context.fill()
  }

  update() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const circleArray = [];

for(let i = 1; i <= 100; i++) {
  let radius = 30;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 5;
  let dy = (Math.random() - 0.5) * 5;
  circleArray.push(new Circle(x, y, dx, dy, radius))
}

function animate() {
  context.clearRect(0,0, innerWidth, innerHeight);
  circleArray.forEach(circle => circle.update());
  requestAnimationFrame(animate);
}

animate();
