declare global {
  namespace CacheRedis {
    interface CacheModules {
      "scope/all": {
        data: ScopeDTO[];
        ttl: 3600;
      };
      "nav/all": {
        data: any;
        ttl: 604800;
      };
    }

    type CacheKeys = keyof CacheModules;
    type CacheData<K extends CacheKeys> = CacheModules[K]["data"];
    type CacheTTL<K extends CacheKeys> = CacheModules[K]["ttl"];
  }
}

export {};
