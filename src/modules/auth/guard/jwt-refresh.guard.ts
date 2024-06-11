import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RefreshTokensRepository } from '../../repository/services/refresh-tokens.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { TokenTypeEnum } from '../enums/token-type.enum';
import { AuthCacheService } from '../services/auth-cache.service';
import { AuthMapperService } from '../services/auth-mapper.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private tokenService: TokenService,
    private userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokensRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenTypeEnum.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isExist = await this.refreshTokenRepository.isExist(refreshToken);
    if (!isExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = AuthMapperService.toUserDataDTO(user, payload.deviceId);
    return true;
  }
}
