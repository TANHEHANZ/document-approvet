import { RedisClientType, RedisModules, RedisScripts } from "redis";

declare global {
  namespace CacheRedis {
    interface CacheStore<T = any> {
      client: RedisClientType<RedisModules, RedisScripts>;
      key: string;
      data: T;
      ttl: number;
    }

    interface CacheOptions {
      ttl?: number;
      prefix?: string;
      invalidateOn?: string[];
    }

    interface CacheResult<T> {
      success: boolean;
      cached: boolean;
      data?: T;
      timestamp?: number;
    }
  }
}

export {};
