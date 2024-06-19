const player = document.querySelector(".player");
let users = {};
let user = prompt('Digite seu nome');

const socket = io();
socket.on("connect", function () {
  users[socket.id] = {
    id: socket.id,
    nick: user,
  };

  console.log(users[socket.id].nick);
  playerKeyBoard();
});

function playerKeyBoard() {

  player.innerHTML = `
  ${Object.keys(users)
    .map((userId) => {
      const user = users[userId];
      return `
      <div class="player" style="top:${user.y || 0}px; left:${
        user.x || 0
      }px;">${user.nick}</div>
    `;
    })
    .join("")}
  `;
}

document.addEventListener("keydown", (event) => {
  let moves = {
    x: 0,
    y: 0,
  };

  switch (event.key) {
    case "ArrowUp":
      moves.y = -10;
      break;
    case "ArrowDown":
      moves.y = +10;
      break;

    case "ArrowRight":
      moves.x = +10;
      break;

    case "ArrowLeft":
      moves.x = -10;
      break;

    default:
      break;
  }
  socket.emit("ON_USER_MOVE", {
    id: socket.id,
    nick: user,
    moves,
  });
});

socket.on("ON_USERS_UPDATE", (updateUsers) => {
  users = JSON.parse(updateUsers);
  playerKeyBoard();
});

function locationTarget() {
  const target = document.querySelector(".target");
  const player = document.querySelector(".player");

  const { x: targetX, y: targetY } = target.getBoundingClientRect();
  const { x: playerX, y: playerY } = player.getBoundingClientRect();

  const valuePlayer = playerX + playerY;
  const valueTarget = targetX + targetY;

  if (valuePlayer === valueTarget) {
    alert("voce ganhou");
  }
}
