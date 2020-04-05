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

//Game state
const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2
};

// Control of the game
cvs.addEventListener("click", function(evt) {
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      break;
    case state.game:
      bird.flap();
      break;
    case state.over:
      state.current = state.getReady;
      break;
  }
});

//Background setting function
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

//foreground setting function
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

// Bird & Animation controls it's X and Y position in Flight function
const bird = {
  animation: [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 }
  ],
  x: 50,
  y: 150,
  w: 34,
  h: 26,
  frame: 0,
  gravity: 0.25,
  jump: 4.6,
  speed: 0,
  draw: function() {
    let bird = this.animation[this.frame];
    ctx.drawImage(
      sprite,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  },
  flap: function() {
    this.speed = - this.jump
  },
  update: function() {
    //Period defines the state of the bird flapping fast or slow , higher number = slower flapping lower number = faster flapping
    this.period = state.current == state.getReady ? 10 : 5;
    //Increment the frame by 1 each period
    this.frame += frames % this.period == 0 ? 1 : 0;
    // Frames will go from 0 to 4, then resets at 0
    this.frame = this.frame % this.animation.length;
    if (state.current == state.getReady) {
      this.y = 150 // Reset position of Bird after Game Over
    } else {
      //this enables the bird to actually change position hence the Y position
      this.speed += this.gravity;
      this.y += this.speed;
      //Checks if the bird drops down to Fg , keeps it in that position
      if(this.y + this.h/2 >= cvs.height -fg.h){
        this.y =  cvs.height - fg.h - this.h/2
        if(state.current == state.game){
          state.current = state.over
        }
      }
    }
  },

  
};

//Get Ready Message function Change to it's own file for clarity
const getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  //center of position on the board
  x: cvs.width / 2 - 173 / 2,
  y: 80,
  draw: function() {
    if (state.current == state.getReady) {
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
    }
  }
};

//Game over Message function Change to it's own file for clarity
const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  //center of position on the board
  x: cvs.width / 2 - 225 / 2,
  y: 90,
  draw: function() {
    if (state.current == state.over) {
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
    }
  }
};

//Draw function invoking all above functions
function draw() {
  //This is the background of entire image
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  fg.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
}

//Update
function update() {
  bird.update();
}

//loop
function loop() {
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}
loop();
