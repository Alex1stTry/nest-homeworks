import { PickType } from '@nestjs/swagger';

import { UserResponseDto } from './user-response.dto';

export class PrivateUserResponseDto extends PickType(UserResponseDto, [
  'id',
  'name',
  'age',
  'email',
  'phone',
  'avatar',
]) {}