import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export function connectSocket(email) {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit("register", email);
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export default socket;
