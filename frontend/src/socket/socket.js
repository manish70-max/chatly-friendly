import { io } from "socket.io-client";

export const socket = io("https://chatly-friendly-backend.onrender.com", {
  autoConnect: false,
});
