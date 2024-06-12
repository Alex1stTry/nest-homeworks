import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guard/jwt-access.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    AuthCacheService,
    JwtAccessGuard,
    { provide: APP_GUARD, useClass: JwtAccessGuard },
  ],
  imports: [forwardRef(() => UserModule), JwtModule, RedisModule],
  exports: [AuthService],
})
export class AuthModule {}
