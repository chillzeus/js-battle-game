canvas = document.getElementById("thisCanvas")
c = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 270;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

let gravity = 0.2;

const player = {
	"x": 20,
  "y": 20,
  "height": 75,
  "width": 25,
  "velocity_y": 1,
}

function draw() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
	c.fillStyle = "red";
	c.fillRect(player.x, player.y, player.width, player.height)
}

function update() {
	draw();
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
