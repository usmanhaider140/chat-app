const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const dirPath = path.join(__dirname + "/../public/");
app.use(express.static(dirPath));

io.on("connection", (socket) => {
  socket.emit("message", "welcome bro");
  // socket.emit("countUpdated", count);
  // socket.on("increment", () => {
  //   count++;
  //   io.emit("countUpdated", count);
  // });

  socket.broadcast.emit("message", "User is connected");

  socket.on("disconnect", () => {
    io.emit("message", "User is disconnected");
  });

  socket.on("sendMessage", (message, cb) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return cb("Profanity is not allowed", null);
    }
    io.emit("broadCast", message);
    cb(null, message);
  });

  socket.on("sendLocation", (location, cb) => {
    io.emit(
      "message",
      `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    );

    cb();
  });
});

server.listen(3000, () => {
  console.log("App listening on port 3000!");
});

// Note: Server (emit) -> client (receive) --acknowledgement--> server
// Note: Client (emit) -> server (receive) --acknowledgement--> client
