import configureRedis from "../redis.conf";

const DEFAULT_TTL = 3600;

export const createCache = () => ({
  get: async <K extends CacheRedis.CacheKeys>(
    key: K
  ): Promise<CacheRedis.CacheData<K> | null> => {
    const data = await configureRedis.get(key);
    console.log("getData REDIS", data);
    return data ? JSON.parse(data) : null;
  },

  set: async <K extends CacheRedis.CacheKeys>(
    key: K,
    value: CacheRedis.CacheData<K>,
    ttl: number = DEFAULT_TTL
  ): Promise<void> => {
    console.log("setData REDIS", key, value, ttl);
    await configureRedis.setEx(key, ttl, JSON.stringify(value));
  },

  delete: async <K extends CacheRedis.CacheKeys>(key: K): Promise<void> => {
    await configureRedis.del(key);
  },
});
