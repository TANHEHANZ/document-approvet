import { createClient } from "redis";
import config from "./config";

const redisClient = createClient({
  socket: {
    host: config.hostRedis,
    port: config.portRedis,
  },
  password: config.passwordRedis,
  database: 0,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis successfully");
});

redisClient.on("ready", () => {
  console.log("Redis client ready");
});

redisClient.on("end", () => {
  console.log("Redis client connection closed");
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    process.exit(1);
  }
};

export { redisClient };
