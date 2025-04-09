import { createClient } from "redis";
import config from "../../config/config";

const redisConfig: CacheRedis.ConfigCache = {
  socket: {
    host: config.hostRedis,
    port: config.portRedis,
  },
  password: config.passwordRedis,
  database: 0,
};

const configureRedis = createClient(redisConfig);

export default configureRedis;
