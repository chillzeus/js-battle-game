canvas = document.getElementById("thisCanvas")
c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

let gravity = 0.2;

const player = {
	"x": 20,
  "y": 20,
  "height": 175,
  "width": 50,
  "leftpressed": false,
  "rightpressed": false,
  "uppressed": false,
  "jump": false,
  "velocity_y": 1,
  "velocity_jump": 2,
  "velocity_x": 6,
}
const enemy = {
  "x": 934,
  "y": 20,
  "height": 175,
  "width": 50,
  "leftpressed": false,
  "rightpressed": false,
  "uppressed": false,
  "velocity_y": 1,
  "velocity_jump": 2,
  "velocity_x": 6,
}


function draw() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
	c.fillStyle = "red";
	c.fillRect(player.x, player.y, player.width, player.height)
  c.fillStyle = "blue";
	c.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "a") {
    player.leftpressed = true;
  }
  if (e.key == "d") {
    player.rightpressed = true;
  }
  if (e.key == "w") {
    player.uppressed = true;
    player.jump = true;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    enemy.leftpressed = true;
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    enemy.rightpressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "a") {
    player.leftpressed = false;
  }
  if (e.key == "d") {
    player.rightpressed = false;
  }
  if (e.key == "w") {
    player.uppressed = true;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    enemy.leftpressed = false;
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    enemy.rightpressed = false;
  }
}


function update() {
	draw();

  // for player 1
  if (player.leftpressed == true) {
    player.x += player.velocity_x * -1;
  }
  if (player.rightpressed == true) {
    player.x += player.velocity_x;
  }
  if (player.y < canvas.height - player.height) {
		player.velocity_y += gravity;  
  }
  if (player.y >= canvas.height - player.height) {
		player.velocity_y = 0;
  }

  // for the enemy (or player 2)
  if (enemy.leftpressed == true) {
    enemy.x += enemy.velocity_x * -1;
  }
  if (enemy.rightpressed == true) {
    enemy.x += enemy.velocity_x;
  }
  if (enemy.y < canvas.height - enemy.height) {
		enemy.velocity_y += gravity;  
  }
  if (enemy.y >= canvas.height - enemy.height) {
		enemy.velocity_y = 0;
  }
}

function playerJump() {
  player.velocity_y = 0;
  for (let i = 0; i < 80; i++) {
    player.y += -player.velocity_jump;
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  // may need an if statement for the jumps
  player.y += player.velocity_y;
  enemy.y += enemy.velocity_y;
  if (player.jump == true) {
    player.jump = false;  
    playerJump();
  }
  update();
}

animate();