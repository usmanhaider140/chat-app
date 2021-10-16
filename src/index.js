const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const dirPath = path.join(__dirname + "/../public/");
app.use(express.static(dirPath));

io.on("connection", (socket) => {
  console.log("New Web Connection is created");
  socket.emit("countUpdated", 0, 1);
});

server.listen(3000, () => {
  console.log("App listening on port 3000!");
});
