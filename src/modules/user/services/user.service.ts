import { ConflictException, Injectable } from '@nestjs/common';

import { SentryLogger } from '../../logger/logger.service';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly loggerService: SentryLogger,
    private readonly userRepository: UserRepository,
  ) {}

  findAll(): Promise<any> {
    return `This action returns all user` as any;
  }

  findOne(id: string): Promise<any> {
    return `This action returns a #${id} user` as any;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
  public async isEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      console.log(user);
      throw new ConflictException('Email have been taken');
    }
  }
}
