const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const maxRadius = 40;
// const minRadius = 2;

let mouse = {
  x : undefined,
  y : undefined
}

window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(e);
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

const colorArray = ["#112F41", "#068587", "#4FB99F", "#F2B134", "#ED553B"];

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.radius = radius;
    this.minRadius = radius;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Interactivity with mouse
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if(this.radius <= maxRadius) {
        this.radius++;
      }
    } else if(this.radius > this.minRadius) {
      this.radius--;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

let circleArray = [];
function init() {
  circleArray = [];
  for(let i = 1; i <= 800; i++) {
    let radius = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - radius * 3) + radius;
    let y = Math.random() * (innerHeight - radius * 3) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}  


function animate() {
  context.clearRect(0,0, innerWidth, innerHeight);
  circleArray.forEach(circle => circle.update());
  requestAnimationFrame(animate);
}

animate();

init();