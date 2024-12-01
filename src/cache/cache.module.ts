import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheParentModule } from '@nestjs/cache-manager';
import { RedisOptions } from 'ioredis';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  providers: [CacheService],
  imports:[
    CacheParentModule.register<RedisOptions>({
      store: redisStore,
      host: process.env.REDIS_HOST, // Redis host
      port: Number(process.env.REDIS_PORT),        // Redis port
      ttl: 60,           // Optional, Time to live for cache items in seconds
    }),
  ],
  exports:[CacheService]
})
export class CacheModule {}
