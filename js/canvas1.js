(function(){
  'use strict';
  var canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext('2d');

/*     // quadrado
  c.fillStyle = 'red';
  c.fillRect(100,100,100,100);
  c.fillStyle = 'rgba(255,0,0,0.1)';
  c.fillRect(200,200,200,200);
  c.fillStyle = 'green';
  c.fillRect(300,300,300,300);

  // linhas
  c.beginPath();
  c.moveTo(200, 200);
  c.lineTo(300, 100);
  c.strokeStyle = 'blue';
  c.stroke(); */

  // arcos
/*    for(let i = 0; i < 100; i ++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false)
    c.strokeStyle = getColor()[Math.round(Math.random() * getColor().length)];
    c.stroke();
  } */

  var mouse = {
    x: undefined,
    y: undefined,
  }

  window.addEventListener('mousemove', animateMouse);

  function animateMouse(e) {
    mouse.x = e.x;
    mouse.y = e.y;
  }

  function getColor() {
    return [
      'orange',
      'red',
      'yellow',
      'green',
      'black',
      'blue',
    ];
  }

  //let circle = new Circle(200, 200, 3, 3, 30);
  let circleArray = [];
  const totalCircles = 10;
  for(let i = 0; i < totalCircles; i++) {
    circleArray.push(new Circle(randomX(30), randomY(30), 3, 3, 30));
  }

  function randomX(radius) {
    return Math.random() * (innerWidth - radius * 2) + radius;
  }

  function randomY(radius) {
    return Math.random() * (innerHeight - radius * 2) + radius;
  }

  function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.strokeStyle = 'blue';
      c.fillStyle = 'blue';
      c.fill();
      c.stroke();

    }

    this.update = function update() {
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

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }

  animate();
}());
