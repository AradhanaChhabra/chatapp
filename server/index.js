const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { addUser, removeUser, users, add } = require("./utils");
mongoose.connect(
  "mongodb+srv://admin22:admin1234@cluster0.rmbca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("database connected");
  }
);
app.use(cors());
app.use(bodyParser.json({ extended: true }));
const userRouter = require("./routes/user");
app.use(userRouter);

io.on("connection", (socket) => {
  socket.on("check", ({ username, room }, callback) => {
    console.log("called");
    const { error } = addUser({ id: socket.id, username, room });
    if (error) {
      callback(error, null);
    } else {
      callback(null, "Room joined");
    }
  });
  socket.on("join", ({ username, roomname }) => {
    add(socket.id, username, roomname);
    socket.join(roomname);

    io.to(roomname).emit("roomUsers", users);
    socket.to(roomname).emit("userJoined", { username });
  });

  socket.on("newMessage", ({ message, username, roomname }) => {
    socket.to(roomname).emit("message", { message, username });
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id, users);
    const user = removeUser(socket.id);
    if (user) {
      socket.to(user.roomname).emit("userLeft", { username: user.username });
      io.to(user.roomname).emit("roomUsers", users);
    }
  });
});

server.listen(PORT, () => {
  console.log("server is runing at port " + PORT);
});
