// JAVASCRIPT CODE //
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
let frames = 0;
const sprite = new Image()
sprite.src = "img/sprite.png"

function draw() {
  //This is the background of entire image
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.drawImage(sprite,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight)
}
function loop() {
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}
loop();
