import { Server } from "socket.io";

let activeUsers: any[] = [];

const handleUserStatus = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("add-new-user", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ socketId: socket.id, userId: newUserId });
      }
      // console.log("User connected", activeUsers);
      socket.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
      activeUsers.filter((user) => user.socketId !== socket.id);
      // console.log("User disconnected", activeUsers);
      socket.emit("get-users", activeUsers);
    });
  });
};

export default handleUserStatus;
