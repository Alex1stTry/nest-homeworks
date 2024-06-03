import { Injectable } from '@nestjs/common';

import { SentryLogger } from '../logger/logger.service';
import { UserRepository } from '../repository/services/user.repository';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { UserResponseDto } from './dto/res/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly loggerService: SentryLogger,
    private readonly userRepository: UserRepository,
  ) {}
  public async create(dto: CreateUserReqDto): Promise<UserResponseDto> {
    return await this.userRepository.save({
      name: 'alex',
      email: 'ergav@mail.com',
      password: 'Afgega1qs!',
    });
  }

  findAll(): Promise<any> {
    return `This action returns all user` as any;
  }

  findOne(id: string): Promise<any> {
    return `This action returns a #${id} user` as any;
  }

  update(id: string, updateUserDto: UpdateUserReqDto): Promise<any> {
    return `This action updates a #${id} user` as any;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
