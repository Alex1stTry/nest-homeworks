import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokensRepository } from '../../repository/services/refresh-tokens.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../user/services/user.service';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthResDto } from '../dto/res/auth-res.dto';
import { TokensPairResDto } from '../dto/res/token-pair.res.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache.service';
import { AuthMapperService } from './auth-mapper.service';
import { TokenService } from './token.service';

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
      this.userRepository.create({ ...dto, password }),
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
  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { password: true, id: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    } // перевірка в базі
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    // перевірка паролю
    const pair = await this.tokenService.generateTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    //create new tokens
    await Promise.all([
      this.refreshRepository.delete({
        deviceId: dto.deviceId,
        user_id: user.id,
      }),
      this.authCacheService.deleteToken(user.id, dto.deviceId),
    ]); // delete tokens made in signUp
    await Promise.all([
      await this.refreshRepository.save(
        this.refreshRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: pair.refreshToken,
        }),
      ),
      await this.authCacheService.saveToken(
        pair.accessToken,
        user.id,
        dto.deviceId,
      ),
    ]);
    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    return AuthMapperService.toResponseDTO(userEntity, pair);
  }
  public async refresh(userData: IUserData): Promise<TokensPairResDto> {
    await Promise.all([
      this.refreshRepository.delete({
        deviceId: userData.deviceId,
        user_id: userData.userId,
      }),
      this.authCacheService.deleteToken(userData.userId, userData.userId),
    ]);
    const pair = await this.tokenService.generateTokens({
      userId: userData.userId,
      deviceId: userData.deviceId,
    });
    await Promise.all([
      this.refreshRepository.save(
        this.refreshRepository.create({
          user_id: userData.userId,
          refreshToken: pair.refreshToken,
          deviceId: userData.deviceId,
        }),
      ),
      this.authCacheService.saveToken(
        pair.accessToken,
        userData.userId,
        userData.deviceId,
      ),
    ]);
    return AuthMapperService.toResponseTokensDTO(pair);
  }
  public async logOut(userData: IUserData): Promise<void> {
    Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
  }
}
