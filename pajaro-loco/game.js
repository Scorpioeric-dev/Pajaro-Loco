// JAVASCRIPT CODE //
const cvs = document.getElementById("canvas");
// const cvs = document.getElementById('bird')
const ctx = cvs.getContext("2d");
// const ctx = cvs.getContext("2d");
//Game vars and const
let frames = 0;

//Load sprite image
const sprite = new Image();
sprite.src = "img/sprite.png";

//Background
const bg = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 276,
  x: 0,
  y: cvs.height - 226,
  draw: function() {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  }
};

//foreground
const fg = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: cvs.height - 112,

  draw: function() {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  }
};

//Draw
function draw() {
  //This is the background of entire image
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  fg.draw()
}

//Update
function update() {}

//loop
function loop() {
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}
loop();
