import { PartialType } from '@nestjs/mapped-types';

import { CreateUserReqDto } from './create-user.req.dto';

export class UpdateUserReqDto extends PartialType(CreateUserReqDto) {
  public readonly name?: string;

  public readonly age?: number;

  public readonly avatar?: string;
}
