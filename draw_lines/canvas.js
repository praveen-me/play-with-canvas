const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

//Line
context.beginPath();
context.moveTo(100, 300);
context.lineTo(300, 100);
context.lineTo(600, 300)
context.stroke();

//Arc
for(let i = 1; i <= 10; i++) {
  let x = Math.random() * window.innerWidth;

  let y = Math.random() * window.innerHeight;

  let color1 = Math.floor(Math.random() * 255);
  let color2 = Math.floor(Math.random() * 255);
  let color3 = Math.floor(Math.random() * 255);

  context.beginPath();
  context.arc(x, y, 30, 0, Math.PI *2, false);
  context.strokeStyle = `rgb(${color1}, ${color2}, ${color3})`
   context.stroke();
}

