import { RedisClientOptions } from "redis";

declare global {
  namespace CacheRedis {
    interface ConfigCache extends RedisClientOptions {
      socket: {
        host: string;
        port: number;
      };
      password: string;
      database: number;
    }
  }
}

export {};
