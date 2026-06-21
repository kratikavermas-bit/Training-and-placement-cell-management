const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../")); // serves your HTML files

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg); // broadcast to all users
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(5000, () => {
  console.log("Server running on ");
});
