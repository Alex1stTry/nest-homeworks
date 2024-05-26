import { Injectable } from '@nestjs/common';

import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserReqDto): Promise<any> {
    return `This action adds a new user` as any;
  }

  findAll(): Promise<any> {
    return `This action returns all user` as any;
  }

  findOne(id: string): Promise<any> {
    return `This action returns a #${id} user` as any;
  }

  update(id: number, updateUserDto: UpdateUserReqDto): Promise<any> {
    return `This action updates a #${id} user` as any;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
