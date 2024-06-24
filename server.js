import express from "express";
import http from "http";
import createGame from "./public/createGame.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

const game = createGame();

app.use(express.static("public"));

game.subscribe((command) => {
  console.log(`Emitting ${command.type}`);
  sockets.emit(command.type, command);
});

sockets.on("connection", (socket) => {
  game.addPlayer({
    playerId: socket.id,
    color: "red",
  });
  const playerId = socket.id;
  console.log(`player connected on server with id --> ${playerId}`);
  socket.emit("setup", game.state);

  socket.on("disconnect", () => {
    game.removePlayer({ playerId: playerId });
    console.log(`O player ${playerId} se desconectou`);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`server listener on port --> ${port}`);
});
