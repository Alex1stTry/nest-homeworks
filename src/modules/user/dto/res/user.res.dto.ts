import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './base-user.res.dto';

export class UserResDto extends PickType(BaseUserResDto, [
  'id',
  'name',
  'image',
  'email',
  'isFollowed',
  'bio',
]) {}
