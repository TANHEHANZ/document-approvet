// import { Server } from "socket.io";
// import { createServer } from "http";
// import { createAdapter } from "@socket.io/redis-adapter";
// import { createClient } from "redis";
// import config from "./config";

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: { origin: config.client_url },
//   transports: ["websocket"]
// });

// // Configuración Redis para escalamiento
// const pubClient = createClient({ url: config.redis_url });
// const subClient = pubClient.duplicate();

// Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
//   io.adapter(createAdapter(pubClient, subClient));
// });

// io.on("connection", (socket) => {
//   socket.on("auth", (token) => {
//     // Validar token JWT
//     const user = verifyToken(token);
//     socket.join(`user_${user.id}`);
//   });

//   socket.on("service:auth", (serviceName) => {
//     socket.join(`service_${serviceName}`);
//   });
// });

// export const initializeSocket = () => {
//   httpServer.listen(config.websocket_port, () => {
//     console.log(`WebSocket Service: ${config.websocket_port}`);
//   });
// };
