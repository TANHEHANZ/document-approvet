import configureRedis from "../redis.conf";
import { redisListener } from "./listener";

const initRedis = async () => {
  try {
    redisListener.setup();
    await configureRedis.connect();
    return configureRedis;
  } catch (error) {
    redisListener.remove();
    throw error;
  }
};

const closeRedis = async () => {
  try {
    await configureRedis.disconnect();
    redisListener.remove();
  } catch (error) {
    throw error;
  }
};

export const redisService = {
  client: configureRedis,
  init: initRedis,
  close: closeRedis,
};
