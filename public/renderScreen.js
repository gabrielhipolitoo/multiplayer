export default function renderScreen(screen, game, requestAnimationFrame) {
  const context = screen.getContext("2d");
  context.clearRect(0, 0, 30, 30);

  for (const playerId in game["state"]["players"]) {
    const player = game.state.players[playerId];
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (const fruitId in game["state"]["fruits"]) {
    const fruits = game.state.fruits[fruitId];
    context.fillStyle = fruits.color;
    context.fillRect(fruits.x, fruits.y, 1, 1);
  }

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame);
  });
}
