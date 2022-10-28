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
  "velocity_y": 1,
  "velocity_x": 6,
}

function draw() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
	c.fillStyle = "red";
	c.fillRect(player.x, player.y, player.width, player.height)
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
}
function keyUpHandler(e) {
  if (e.key == "a") {
    player.leftpressed = false;
  }
  if (e.key == "d") {
    player.rightpressed = false;
  }
}


function update() {
	draw();
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
}

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.y += player.velocity_y;
  update();
}

animate();
