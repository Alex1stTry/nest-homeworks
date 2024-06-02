import { Injectable } from '@nestjs/common';

import { SentryLogger } from '../logger/logger.service';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';

@Injectable()
export class UserService {
  constructor(private readonly loggerService: SentryLogger) {}
  create(createUserDto: CreateUserReqDto): Promise<any> {
    return `This action adds a new user` as any;
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
