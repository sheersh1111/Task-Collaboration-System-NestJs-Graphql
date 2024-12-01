import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
    constructor(
@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
) {}

async setCache(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value, { ttl: 60 }); // Cache the value for 60 seconds
  }
  
  async getCache(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }
  
  async delCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
  
}
