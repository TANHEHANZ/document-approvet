import configureRedis from "../redis.conf";
import { handleConnect, handleEnd, handleError, handleReady } from "./handlers";
export const redisListener = {
  setup: () => {
    configureRedis
      .on("error", handleError)
      .on("connect", handleConnect)
      .on("ready", handleReady)
      .on("end", handleEnd);

    return () => redisListener.remove();
  },
  remove: () => {
    configureRedis
      .off("error", handleError)
      .off("connect", handleConnect)
      .off("ready", handleReady)
      .off("end", handleEnd);
  },
};
