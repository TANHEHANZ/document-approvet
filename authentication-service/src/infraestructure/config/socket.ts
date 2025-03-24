// import { Server } from "socket.io";
// import { createServer } from "http";
// import config from "./config";

// const httpServer = createServer();
// export const io = new Server(httpServer, {
//   cors: {
//     origin: config.client_url,
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("auth", (userId) => {
//     socket.join(`user_${userId}`);
//   });

//   socket.on("admin:auth", () => {
//     socket.join("admin_channel");
//   });

//   socket.on("disconnect", () => {});
// });

// export const initializeSocket = () => {
//   const PORT = process.env.SOCKET_PORT || 3001;
//   httpServer.listen(PORT, () => {
//     console.log(`WebSocket server running on port ${PORT}`);
//   });
// };
