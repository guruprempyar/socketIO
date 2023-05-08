//Node v18.12.1
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
connectDB();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Socket is connected.");

  socket.on("setup", (userdata) => {
    socket.join(userdata._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`room joined: ${room}`);
  });

  socket.on("new message", (newMsg) => {
    const chat = newMsg.chat;
    console.log(newMsg);
    if (!chat.users) return "users are not defined.";

    console.log("here", chat._id);
    socket.to(chat._id).emit("message_recieved", newMsg);
    //socket.emit("message_recieved", newMsg);
  });
});
