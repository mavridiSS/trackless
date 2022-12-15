const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 5000;
const router = express.Router();

router.get("/", (req, resp) => {
  resp.send("Server is up and running!");
});

const rooms = {
  1: "1",
};

const users = {};

const app = express();
const server = http.Server(app);
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000", "https://trackless.onrender.com"],
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

router.post("/create-room", (request, response) => {
  const roomId = request.body.room;
  rooms[roomId] = roomId;
  response.send(roomId);
});

app.use(router);

io.on("connection", function (socket) {
  socket.on("join", ({ username: user, roomId }) => {
    // Check if this room is present?
    if (!rooms[roomId]) {
      socket.emit("message", "Room is not created!");
      return;
    }

    const clients = io.sockets.adapter.rooms.get(roomId);
    console.log(clients);

    const userRooms = users[user];
    // Check if the user is in the same room
    // if (userRooms && userRooms.includes(roomId)) {
    //   socket.emit("error", "User is already in this room!");
    // } else {
    if (userRooms) {
      users[user].push(roomId);
    } else {
      users[user] = [roomId];
    }
    socket.emit("message", "You have successfully joined the room!");
    console.log("User:", user, roomId);
    socket.join(roomId);
    socket.to(roomId).emit("user-join", user);

    // }
    // Add the user
    // Join to the socket to the room
    // Emit to the user that he's successfully joined
    // Broadcash to everybody else in the chat that somebody has joined
  });

  socket.on("message", ({ message, roomId }) => {
    socket.to(roomId).emit("message", message);
  });

  socket.on("call", ({ signal, from, roomId }) => {
    console.log(`${from} is calling ${roomId}`);
    socket.to(roomId).emit("hey", { signal, from });
  });

  socket.on("accept-call", (data) => {
    socket.to(data.roomId).emit("call-accepted", data.signal);
  });

  socket.on("reject-call", (data) => {
    socket.to(data.roomId).emit("call-rejected", data.signal);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
