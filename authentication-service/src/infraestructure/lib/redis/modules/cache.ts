import configureRedis from "../redis.conf";

const DEFAULT_TTL = 3600;

/**
 * Creates a typed Redis cache instance
 * @template K - Cache key type extending CacheRedis.CacheKeys
 * @returns {Object} Cache operations object
 */
export const createCache = () => ({
  /**
   * Retrieves data from cache
   * @template K
   * @param {K} key - Cache key
   * @returns {Promise<CacheRedis.CacheData<K> | null>} Cached data or null if not found
   */
  get: async <K extends CacheRedis.CacheKeys>(
    key: K
  ): Promise<CacheRedis.CacheData<K> | null> => {
    const data = await configureRedis.get(key);
    console.log("getData REDIS", data);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Stores data in cache
   * @template K
   * @param {K} key - Cache key
   * @param {CacheRedis.CacheData<K>} value - Data to cache
   * @param {number} [ttl=DEFAULT_TTL] - Time to live in seconds
   * @returns {Promise<void>}
   */
  set: async <K extends CacheRedis.CacheKeys>(
    key: K,
    value: CacheRedis.CacheData<K>,
    ttl: number = DEFAULT_TTL
  ): Promise<void> => {
    console.log("setData REDIS", key, value, ttl);
    await configureRedis.setEx(key, ttl, JSON.stringify(value));
  },

  /**
   * Removes data from cache
   * @template K
   * @param {K} key - Cache key to delete
   * @returns {Promise<void>}
   */
  delete: async <K extends CacheRedis.CacheKeys>(key: K): Promise<void> => {
    await configureRedis.del(key);
  },
});
