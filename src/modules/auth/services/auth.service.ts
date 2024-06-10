import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokensRepository } from '../../repository/services/refresh-tokens.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../user/services/user.service';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthCacheService } from './auth-cache.service';
import { AuthMapperService } from './auth-mapper.service';
import { TokenService } from './token.service';
import { AuthResDto } from "../dto/res/auth-res.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly refreshRepository: RefreshTokensRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}
  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.userService.isEmailUnique(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      await this.userRepository.create({ ...dto, password }),
    );
    const pair = await this.tokenService.generateTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await Promise.all([
      this.refreshRepository.save(
        this.refreshRepository.create({
          user_id: user.id,
          refreshToken: pair.refreshToken,
          deviceId: dto.deviceId,
        }),
      ),
      this.authCacheService.saveToken(pair.accessToken, user.id, dto.deviceId),
    ]);
    return AuthMapperService.toResponseDTO(user, pair);
  }
  public async signIn(dto: any): Promise<any> {
    return;
  }
}
