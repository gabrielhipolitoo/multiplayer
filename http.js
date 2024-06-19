import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "public"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

const serverHttp = http.createServer(app);

let users = {};

const io = new Server(serverHttp);

io.on("connection", (socket) => {
  users[socket.id] = { id: socket.id, nick: "", x: 0, y: 0 };
  socket.on("disconnect", () => {
    "desconctou", (users[socket.id] = undefined);
  });

  socket.on("ON_USER_MOVE", (newPosition) => {
    let user = users[socket.id];
    user.nick = newPosition.nick;
    if (user.id === newPosition.id) {
      user.x = user.x + (newPosition.moves.x || 0);
      user.y = user.y + (newPosition.moves.y || 0);
      io.emit("ON_USERS_UPDATE", JSON.stringify(users));
    }
  });

  // socket.on("GET_IN_GAME", (newUser) => {
  //   io.emit("ON_USERS_INFOR", JSON.stringify(newUser));
  // });
});

app.use("/", (req, res) => {
  res.render("index.html");
});

// Exportar servidor e Socket.IO
export { serverHttp, io };
