export default function createGame() {
  const state = {
    players: {},
    fruits: {
      fruits1: { color: "green", x: 0, y: 1 },
    },
    screen: {
      width: 10,
      height: 10,
    },
  };

  const observers = [];

  function subscribe(observerFunction) {
    observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command);
    }
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerColor = command.color;
    const playerX =
      "playerX" in command
        ? command.playerX
        : Math.floor(Math.random() * state.screen.width);
    const playerY =
      "playerY" in command
        ? command.playerY
        : Math.floor(Math.random() * state.screen.height);

    state.players[playerId] = {
      color: playerColor,
      x: playerX,
      y: playerY,
    };

    notifyAll({
      type: "add-player",
      playerId: playerId,
      playerColor: playerColor,
      playerX: playerX,
      playerY: playerY,
    });
  }

  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];

    notifyAll({
      type: "remove-player",
      playerId: playerId,
    });
  }

  function addFruits(command) {
    const fruitId = command.fruitId;
    const fruitColor = "green";
    const fruitX = command.fruitX;
    const fruitY = command.fruitY;

    state.fruits[fruitId] = {
      color: fruitColor,
      x: fruitX,
      y: fruitY,
    };
  }

  function removeFruits(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
  }

  function movePlayer(command) {
    const acceptedMoves = {
      ArrowUp(player) {
        console.log("move up");
        if (keyPressed === "ArrowUp" && player.y - 1 >= 0) {
          player.y = player.y - 1;
        }
      },
      ArrowDown(player) {
        console.log("move down");
        if (keyPressed === "ArrowDown" && player.y + 1 < state.screen.height) {
          player.y = player.y + 1;
        }
      },
      ArrowLeft(player) {
        console.log("move left");
        if (keyPressed === "ArrowLeft" && player.x - 1 >= 0) {
          player.x = player.x - 1;
        }
      },
      ArrowRight(player) {
        console.log("move Right");
        if (keyPressed === "ArrowRight" && player.x + 1 < state.screen.width) {
          player.x = player.x + 1;
        }
      },
    };
    const keyPressed = command.keyPressed;
    const playerId = command.playerId;
    const player = state.players[command.playerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (player && moveFunction) {
      console.log(
        `game.movePlayer ${command.playerId} with ${command.keyPressed}`
      );
      moveFunction(player);
      checkForFruitCollision(playerId);
    }
  }
  function checkForFruitCollision(playerId) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];
      if (player.x === fruit.x && player.y === fruit.y) {
        console.log(`Collision ${playerId} with ${fruitId}`);
        removeFruits({ fruitId: fruitId });
      }
    }
  }

  return {
    addPlayer,
    removePlayer,
    addFruits,
    movePlayer,
    state,
    setState,
    subscribe,
  };
}
