import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
 
  return userSocketMap[receiverId];
  console.log("User Socket Map:", userSocketMap);
};

io.on("connection", (socket) => {
  // console.log("User Connected:", socket.id);

  const userId = socket.handshake.query.userId;
  // console.log("Connected UserId:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

 

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // console.log("User Disconnected:", socket.id);

    if (userId) {
      delete userSocketMap[userId];
    }

    // console.log("After disconnect:", userSocketMap);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server,io };