import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './base-user.res.dto';

export class PublicUserResDto extends PickType(BaseUserResDto, [
  'name',
  'bio',
  'image',
]) {}
