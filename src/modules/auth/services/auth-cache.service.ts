import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config, JWTConfig } from '../../../configs/configs.type';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JWTConfig;
  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = configService.get<JWTConfig>('jwt');
  }
  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accessExpires);
  }
  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<boolean> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }
  public async deleteToken(userId: string, deviceId: string) {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    await this.redisService.deleteByKey(key);
  }
}