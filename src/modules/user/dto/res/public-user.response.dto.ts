import { PickType } from '@nestjs/swagger';

import { UserResponseDto } from './user-response.dto';

export class PublicUserResponseDto extends PickType(UserResponseDto, [
  'id',
  'name',
  'age',
  'avatar',
]) {}
