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
  "velocity_jump": 12,
  "velocity_x": 6,
  "gravity": 0.4,
  "fall_difference": 0.2,
}
const enemy = {
  "x": 934,
  "y": 20,
  "height": 175,
  "width": 50,
  "leftpressed": false,
  "rightpressed": false,
  "uppressed": false,
  "jump": false,
  "velocity_y": 1,
  "velocity_jump": 12,
  "velocity_x": 6,
  "gravity": 0.4,
  "fall_difference": 0.2,
}


function draw() {
  // c.fillStyle = "black";
  // c.fillRect(0, 0, canvas.width, canvas.height);
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
  if (e.key == "Up" || e.key == "ArrowUp") {
    enemy.uppressed = true;
    enemy.jump = true;
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
    player.uppressed = false;
  } 
  if (e.key == "Left" || e.key == "ArrowLeft") {
    enemy.leftpressed = false;
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    enemy.rightpressed = false;
  }
  if (e.key == "Up" || e.key == "ArrowUp") {
    enemy.uppressed = false;
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
  if (player.y < 370) {
		player.velocity_y += player.gravity;  
  }
  if (player.y >= 370) {
		player.velocity_y = 0;
  }
  if (player.x < 0) {
    player.velocity_x = 0;
    player.x += 6;
    player.velocity_x = 6;
  }

  // for the enemy (or player 2)
  if (enemy.leftpressed == true) {
    enemy.x += enemy.velocity_x * -1;
  }
  if (enemy.rightpressed == true) {
    enemy.x += enemy.velocity_x;
  }
  if (enemy.y < 370) {
		enemy.velocity_y += enemy.gravity;  
  }
  if (enemy.y >= 370) {
		enemy.velocity_y = 0;
  }
  if (enemy.x < 0) {
    enemy.velocity_x = 0;
    enemy.x += 6;
    enemy.velocity_x = 6;
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  // may need an if statement for the jumps
  player.y += player.velocity_y;
  enemy.y += enemy.velocity_y;
  if (player.jump == true) {
    // 60 works! 
    if (player.y > 55) {
      player.velocity_y = 0;
      player.velocity_jump -= player.fall_difference;
      player.y += -player.velocity_jump;
    }
    if (player.y <= 55) {
      player.velocity_jump = 12;
      player.velocity_y = 1;
      player.jump = false;
    }
  }
  if (enemy.jump == true) {
    if (enemy.y > 55) {
      enemy.velocity_y = 0;
      enemy.velocity_jump -= enemy.fall_difference;
      enemy.y += -enemy.velocity_jump;
    }
    if (enemy.y <= 55) {
      enemy.velocity_jump = 12;
      enemy.velocity_y = 1;
      enemy.jump = false;
    }
  }
  update();
}

animate();