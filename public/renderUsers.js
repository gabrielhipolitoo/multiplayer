const screen = document.getElementById("screen");
const context = screen.getContext("2d");

const randomPosition = {
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
};
console.log(randomPosition.x);

const statePlayers = {
  player1: {
    username: "alana",
    color: "#00FF00",
    width: 250,
    height: 250,
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  },

  player2: {
    username: "gabriel",
    color: "#000",
    width: 250,
    height: 250,
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  },
};

for (const playerId in statePlayers) {
  const { color, width, height, y, x } = statePlayers[playerId];
  context.fillStyle = color;
  console.log(x);
  context.fillRect(y, x, 1, 1);
}
