let pipe = [];
let xPipe = 200
let bird = { x: 80, y: 370, w: 25, v: 0 };
let g = 1;
let score = 0;
let gap = 130;
let dead = false;
let highscore;

function setup() {
  createCanvas(600, 400);
  highscore = getItem("high Score");
  for (let i = 0; i < 200; i++) {
    pipe.push({
      x: xPipe + ([i] * xPipe),
      y: 0,
      w: 50,
      h: random(20, 270),
      v: 0,
    });
  }
}

function draw() {
  background(0);
  fill(220, 250, 50);
  square(bird.x, bird.y, bird.w);
  createPipe();
if(dead === false){
  game();
  hit();
  fill(250);
  text("score: " + score, 20, 20);
  storeItem("high score", highscore);
  text("highscore: " + highscore, 20, 40);
  if(score === 200){
    text("theres no way you actually got this far", 300, 200);
  }
}
}

function keyPressed() {
  if(dead === false){
  if (key === " ") {
    bird.v = 10;
    for (i = 0; i < 200; i++) {
      pipe[i].v = 2;
    }}
  } if (isLooping() === false){
    if(key === 'k'){
      dead = false;
      score = 0;
      for(i = 0; i< 200; i++){
        pipe[i].x = xPipe + ([i] * xPipe);
        pipe[i].v = 0;
        pipe[i].h = random(20, 270)
      }
      bird.v = 0;
      bird.y = 400;
      g = 1;
      game();
      loop();
    }
  }
}

function hit() { // i am a FOOL :sob:
  for (i = 0; i < 200; i++) {
    if (bird.x + bird.w > pipe[i].x && bird.x < pipe[i].x + pipe[i].w) {
//       console.log(bird.y + bird.w );
      if(bird.y < pipe[i].h  || bird.y + bird.w >  pipe[i].h + gap) {
        death();
      }
    }
  }
}

function death() {
  highscore = max(score, highscore);
  bird.v = 0;
  g = 0;
  fill(250, 0, 0);
  text("gg lol", 300, 200);
  fill(250);
  text("press 'k' to restart", 280, 220)
  for (i = 0; i < 200; i++) {
    pipe[i].v = 0;
  }
  dead = true;
  noLoop();
}

function game(){
  bird.y = bird.y - bird.v;
  if (bird.y < 370) {
    //birb jump
    bird.v = bird.v - g;
  } else if (bird.y >= 370) {
    bird.y = 370;
  }

  if (bird.y < 0) {
    bird.y = 0;
  }

  for (i = 0; i < 200; i++) {
   pipe[i].x = pipe[i].x - pipe[i].v;  
    if (pipe[i].x === 0) {
      score += 1;
    }
  }
}
function createPipe(){
  for(i = 0; i < 200; i++){
    fill(0, 250, 0);
    rect(pipe[i].x, pipe[i].y, pipe[i].w, pipe[i].h);
    rect(
      pipe[i].x,
      pipe[i].y + gap + pipe[i].h,
      pipe[i].w,
      400 - (gap + pipe[i].h)
    );
  }
}