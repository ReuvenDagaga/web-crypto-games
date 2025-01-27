import { Server } from "socket.io";

const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on("joinRoom", ({ gameId, roomId }) => {
      socket.join(roomId);
      
      console.log(`User ${socket.id} joined room ${roomId}`);
      io.to(roomId).emit("message", `User ${socket.id} has joined the room`);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`)
    });
  });

  return io;
};

export default initSocket;
