import dotenv from "dotenv";
dotenv.config();
import { createServer } from "./server";
import config from "./infraestructure/config/config";
import { connectRedis } from "./infraestructure/config/redis.client";

const startServer = async () => {
  try {
    await connectRedis();
    const server = createServer();

    server.listen(config.port, () => {
      console.log(`SERVICE-AUTH Running on port: ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
