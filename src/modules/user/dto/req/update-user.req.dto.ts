import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from './base-user.req.dto';

export class UpdateUserReqDto extends PickType(BaseUserReqDto, [
  'name',
  'bio',
  'image',
]) {}
