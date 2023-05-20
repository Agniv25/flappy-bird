const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
var count = 0;
var score = document.querySelector(".score");
var head = document.querySelector("h1");
var gameplay = 0;
//bird movements initialization
let bx = 50;
let by = 100;
let gravity = 0; //gravity: -0.2
let bv = 2;
var score1 = 0;

//pipe movements
pipeVelocity = 0; //pipevelocity: 2;
pipe = [{ x: 500, y: -80 }];

//loading the images
const bg = new Image();
bg.src = "images/background.png";
const ground = new Image();
ground.src = "images/ground.png";
const bird = new Image();
bird.src = "images/bird.png";
const gap = 2;
const upper = new Image();
upper.src = "images/upper.png";
const lower = new Image();
lower.src = "images/lower.png";

//adding eventListener
document.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }
  if (e.code == "Space") {
    bv -= 4;
  }
});

//functions
function draw() {
  count++;
  //loading the background
  ctx.drawImage(bg, 0, 0, bg.width * 2, bg.height * 2);
  //loading the bird
  ctx.drawImage(bird, bx, by, bird.width * 2, bird.height * 2);

  //loading the pipes
  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(
      upper,
      pipe[i].x,
      pipe[i].y,
      upper.width * 2,
      upper.height * 2
    );
    ctx.drawImage(
      lower,
      pipe[i].x,
      pipe[i].y + 120 + upper.height * 2,
      lower.width * 2,
      lower.height * 2
    );

    //checking for collision
    if (
      bx + 34 >= pipe[i].x &&
      bx <= pipe[i].x + upper.width * 2 &&
      ((by >= 0 && by <= upper.height * 2 + pipe[i].y) ||
        (by + 24 >= pipe[i].y + upper.height * 2 + 120 &&
          by + 24 <= canvas.height - 122))
    ) {
      reload();
      return;
    }

    // calculating the score
    if (pipe[i].x < 40 && pipe[i].x >= 38) {
      score1++;
    }

    pipe[i].x -= pipeVelocity;
  }

  //updating the score
  score.innerHTML = "Score " + score1;

  //   check if the bird collides with the ground or not
  if (by + 24 >= canvas.height - 122) {
    reload();
    return;
  }
  //pushing new pipes
  if (count >= 60) {
    pipe.push({
      x: pipe[pipe.length - 1].x + 240,
      y: -Math.floor(Math.random() * 200 + 30),
    });
    count = 0;
  }

  //adding the ground

  ctx.drawImage(
    ground,
    0,
    canvas.height - 112,
    ground.width * 2,
    ground.height * 2
  );

  //bird movement
  bv -= gravity;
  by += bv;

  //pipe movement

  window.requestAnimationFrame(draw);
}
draw();

document.addEventListener("keydown", () => {
  if (gameplay == 0) {
    head.innerHTML = "";
    gravity = -0.125;
    pipeVelocity = 2;
    bv = 0;

    gameplay = 1;
  }
});

//functions
function reload() {
  gameplay = 0;
  head.innerHTML = "press any key to continue";
  pipe.length = 0;
  pipe = [{ x: 500, y: -80 }];
  score1 = 0;
  gravity = 0;
  bv = 0;
  bx = 50;
  by = 100;
  pipeVelocity = 0;
  draw();
}
