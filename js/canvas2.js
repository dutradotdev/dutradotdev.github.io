(function(doc, win){
  'use strict';

  const app = (function canvas() {
    const $canvas = doc.querySelector('canvas');
    const c = $canvas.getContext('2d');
    const TOTAL_CIRCLES = 100;
    const arrayCircles = [];
    let circlesRunning = TOTAL_CIRCLES + 0;
    const Circle =  function Circle(x, y, dx, dy, mousemoved) {
      this.radius = Math.ceil((Math.random() + 0.3)* 30);
      this.half = 1;
      this.dx = dx;
      this.dy = dy + Math.round(this.radius / 2);
      this.startAngle = 0;
      this.endAngle = Math.PI * 2;
      this.x = x;
      this.y = y + (this.radius / 2);
      this.antiClockWise = false;
      this.maxTop = innerHeight -1;
      this.timer = 0;
      this.alreadyStop = false;
      this.possibleColors = ['#D8DBE2', '#A9BCD0', '#58A4B0', '#373F51', '#DAA49A'];
      this.color = this.possibleColors[Math.round(Math.random() * this.possibleColors.length)];
      this.draw = function draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.antiClockWise);
        c.fillStyle = this.color;
        c.fill();
      },
      this.update = function update() {
        this.draw();
        if(this.y + this.radius >= this.maxTop) {
          this.radius = Math.round(this.radius / 2);
          this.dy = -Math.round((this.dy / 2));
          this.timer = setInterval(() => { this.dy += 0.8 }, 75);
          if(this.dy === 0) {
            clearInterval(this.timer);
          }
        }

        if(this.radius <= 1.1 && !this.alreadyStop) {
          circlesRunning--;
          this.alreadyStop = true;
          this.radius = 0;
        }

        this.y += this.dy;
      }
    };
    return {
      init: function init() {
        $canvas.width = innerWidth;
        $canvas.height = innerHeight;
        this.generateAllCircles();
        this.infinityAnimate();
      },
      resizeCanvas: function resizeCanvas(height) {
      },
      infinityAnimate: function infinityAnimate() {
        if(!circlesRunning) {
          return;
        }
        requestAnimationFrame(infinityAnimate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        for(let i = 0; i < arrayCircles.length; i++) {
          arrayCircles[i].update();
        }
      },
      generateAllCircles: function generateAllCircles() {
        for(let i = 0; i < TOTAL_CIRCLES; i++) {
          let x = Math.round(Math.random() * innerWidth);
          arrayCircles.push(new Circle(x, 0, 0, 5, false));
        }
      },
      mouseMoveFn: function mouseMoveFn(e) {
        if(e.x % 7 === 0) {
          let circle = new Circle(e.x, e.y, 0, 5, true);
          circlesRunning++;
          arrayCircles.push(circle);
        }
        return null;
      }
    };
  }());

  app.init();
  win.resizeCanvas = app.resizeCanvas;

}(document, window));
