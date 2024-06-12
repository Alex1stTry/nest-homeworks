import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AuthService } from '../../auth/services/auth.service';
import { SentryLogger } from '../../logger/logger.service';
import { FollowsRepository } from '../../repository/services/follows.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../dto/req/update-user.req.dto';
import { PublicUserResDto } from '../dto/res/public-user.res.dto.';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserMapperService } from './user-mapper.service';

@Injectable()
export class UserService {
  constructor(
    private readonly loggerService: SentryLogger,
    private readonly userRepository: UserRepository,
    // private readonly authService: AuthService,
    private readonly followRepo: FollowsRepository,
  ) {}

  public async findOne(id: string): Promise<PublicUserResDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return UserMapperService.toPublicResponseDTO(user);
  }

  public async getMe(userData: IUserData): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (!user) {
      throw new NotFoundException();
    }
    return UserMapperService.toResponseDTO(user);
  }
  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (!user) {
      throw new NotFoundException();
    }
    const newUser = await this.userRepository.save({ ...user, ...dto });
    return UserMapperService.toResponseDTO(newUser);
  }
  public async isEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email have been taken');
    }
  }
  public async follow(userData: IUserData, userId: string): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException('you cant follow yourself');
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const follow = await this.followRepo.findOneBy({
      followerId: userData.userId,
      followingId: userId,
    });
    if (follow) {
      throw new ConflictException('You have already subscribed to him/her ');
    }
    await this.followRepo.save(
      this.followRepo.create({
        followerId: userData.userId,
        followingId: userId,
      }),
    );
  }
  public async unFollow(userData: IUserData, userId: string): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException('You cant unfollow yourself');
    }
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (!user) {
      throw new NotFoundException();
    }
    const follow = await this.followRepo.findOneBy({
      followerId: userData.userId,
      followingId: userId,
    });
    if (!follow) {
      throw new ConflictException('You have already unsubscribed to him/her');
    }
    await this.followRepo.remove(follow);
  }
  // public async remove(userData: IUserData): Promise<void> {
  //   await this.authService.logOut(userData);
  //   const user = await this.userRepository.findOneBy({ id: userData.userId });
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   await this.userRepository.remove(user);
  // }
}
