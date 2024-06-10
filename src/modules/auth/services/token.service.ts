import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JWTConfig } from '../../../configs/configs.type';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ITokensPair } from '../interfaces/tokens.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JWTConfig;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = configService.get<JWTConfig>('jwt');
  }
  public async generateTokens(payload: IJwtPayload): Promise<ITokensPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpires,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpires,
    });
    return { accessToken, refreshToken };
  }
}
