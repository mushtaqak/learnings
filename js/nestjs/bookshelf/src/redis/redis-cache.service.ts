import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key) {
    console.log('fetching redis data ...');
    const result = await this.cache.get(key);
    console.log({ result })
    return result;
  }

  async set(key, value) {
    console.log('setting redis data ...');
    await this.cache.set(key, value, { ttl: 1000000 });
  }
}
