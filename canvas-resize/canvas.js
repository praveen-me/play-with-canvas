const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

context.fillRect(0, 0, 100, 100);
context.fillRect(100, 100, 100, 100);
context.fillRect(200, 200, 100, 100);

let x = 0;
let y = 0;

for(let i = 1; i <= 5; i++) {  
  context.fillRect(x, y, 100, 100);
  x += 100;
  y += 100
}