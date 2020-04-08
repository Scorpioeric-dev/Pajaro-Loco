// JAVASCRIPT CODE //
const cvs = document.getElementById("canvas");
// const cvs = document.getElementById('bird')
const ctx = cvs.getContext("2d");
// const ctx = cvs.getContext("2d");
//Game vars and const
let frames = 0;
const Degree = Math.PI / 180;

//Load sprite image
const sprite = new Image();
sprite.src = "img/sprite.png";
//Loading sound
const score_S = new Audio();
score_S.src = "audio/sfx_point.wav";

const Flap = new Audio();
Flap.src = "audio/sfx_flap.wav";

const Hit = new Audio();
Hit.src = "audio/sfx_hit.wav";

const Die = new Audio();
Die.src = "audio/sfx_die.wav";

const Swooshing = new Audio();
Swooshing.src = "audio/sfx_swooshing.wav";

//Game state
const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2
};

//Start button coord
const startBtn = {
  x: 120,
  y: 263,
  w: 83,
  h: 29
};

// Control of the game
cvs.addEventListener("click", function(evt) {
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      Swooshing.play();
      break;
    case state.game:
      bird.flap();
      Flap.play();
      break;
    case state.over:
      let rect = cvs.getBoundingClientRect();
      let clickX = evt.clientX - rect.left;
      let clickY = evt.clientY - rect.top;
      //Check if we click on start button
      if (
        clickX >= startBtn &&
        clickX <= startBtn.x + startBtn.w &&
        clickY >= startBtn.y &&
        clickY <= startBtn.y + startBtn.h
      ) {
      }
      pipes.reset();
      bird.speedReset();
      score.reset();

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
  dx: 2,

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
  },
  update: function() {
    if (state.current == state.game) {
      this.x = (this.x - this.dx) % (this.w / 2);
    }
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
  radius: 12,
  frame: 0,
  gravity: 0.25,
  jump: 4.6,
  speed: 0,
  rotation: 0,
  draw: function() {
    let bird = this.animation[this.frame];
    ctx.save();
    //Origin Position of the bird
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      sprite,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    );
    ctx.restore();
  },
  flap: function() {
    this.speed = -this.jump;
  },
  update: function() {
    //Period defines the state of the bird flapping fast or slow , higher number = slower flapping lower number = faster flapping
    this.period = state.current == state.getReady ? 10 : 5;
    //Increment the frame by 1 each period
    this.frame += frames % this.period == 0 ? 1 : 0;
    // Frames will go from 0 to 4, then resets at 0
    this.frame = this.frame % this.animation.length;
    if (state.current == state.getReady) {
      this.y = 150; // Reset position of Bird after Game Over
      this.rotation = 0 * Degree;
    } else {
      //this enables the bird to actually change position hence the Y position
      this.speed += this.gravity;
      this.y += this.speed;
      //Checks if the bird drops down to Fg , keeps it in that position
      if (this.y + this.h / 2 >= cvs.height - fg.h) {
        this.y = cvs.height - fg.h - this.h / 2;
        if (state.current == state.game) {
          state.current = state.over;
          Die.play();
        }
      }
      //If the speed is greater than the jump means the bird is falling down
      if (this.speed >= this.jump) {
        this.rotation = 90 * Degree;
        this.frame = 1;
      } else {
        this.rotation = -25 * Degree;
      }
    }
  },
  speedReset: function() {
    this.speed = 0;
  }
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
//These are the Pipes creation logic (Manipulate later to your specs)
const pipes = {
  position: [],
  top: {
    sX: 553,
    sY: 0
  },
  bottom: {
    sX: 502,
    sY: 0
  },
  w: 53,
  h: 400,
  gap: 85,
  maxYPos: -150,
  dx: 2,
  draw: function() {
    // console.log(pipes)
    //a for loop to loop over the position array of pipes
    for (let i = 0; i < this.position.length; i++) {
      console.log("hit");
      let p = this.position[i];
      let topYPos = p.y;
      let bottomYPos = p.y + this.gap + this.h;
      //top pipe image
      ctx.drawImage(
        sprite,
        this.top.sX,
        this.top.sY,
        this.w,
        this.h,
        p.x,
        topYPos,
        this.w,
        this.h
      );
      //Bottom pipe image
      ctx.drawImage(
        sprite,
        this.bottom.sX,
        this.bottom.sY,
        this.w,
        this.h,
        p.x,
        bottomYPos,
        this.w,
        this.h
      );
    }
  },
  update: function() {
    // console.log("hit2");
    if (state.current !== state.game) return;
    if (frames % 100 == 0) {
      this.position.push({
        x: cvs.width,
        y: this.maxYPos * (Math.random() + 1)
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      console.log("HHit2");
      let p = this.position[i];

      let bottomPipeYPos = p.y + this.h + this.gap;
      // Collision Detection
      //  Top pipe
      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > p.y &&
        bird.y - bird.radius < p.y + this.h
      ) {
        state.current = state.over;
        Hit.play()
      }
      //Bottom Pipe
      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > bottomPipeYPos &&
        bird.y - bird.radius < bottomPipeYPos + this.h
      ) {
        state.current = state.over;
        Hit.play()
      }

      // Move the Pipes to the left
      p.x -= this.dx;
      //if the pipes go beyond the canvas , we delete them from the array
      if (p.x + this.w <= 0) {
        this.position.shift();
        score.value += 1;
        score_S.play()

        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best", score.best);
      }
    }
  },
  reset: function() {
    this.position = [];
  }
};
//Score logic
const score = {
  best: +localStorage.getItem("best") || 0,
  value: 0,
  draw: function() {
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#FFF";

    if (state.current == state.game) {
      ctx.lineWidth = 1.5;
      ctx.font = "45px Teko";
      ctx.fillText(this.value, cvs.width / 2, 50);
      ctx.strokeText(this.value, cvs.width / 2, 50);
    } else if (state.current == state.over) {
      //Score Value
      ctx.font = "35px Teko";
      ctx.fillText(this.value, 225, 186);
      ctx.strokeText(this.value, 225, 186);
      //Best Score
      ctx.fillText(this.best, 225, 228);
      ctx.strokeText(this.best, 225, 228);
    }
  },
  reset: function() {
    this.value = 0;
  }
};

//Draw function invoking all above functions
function draw() {
  //This is the background of entire image
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  
  bg.draw();
  fg.draw();
  pipes.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
  score.draw();
}

//Update
function update() {
  pipes.update();
  bird.update();
  fg.update();
}

//loop
function loop() {
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}
loop();
