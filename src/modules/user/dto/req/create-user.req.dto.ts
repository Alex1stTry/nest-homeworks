import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
// import { regexConstants } from '../../../../constants/regex-constants';
import { validationMessages } from '../../../../constants/validation-messages';

export class CreateUserReqDto {
  @IsString()
  @MinLength(3, { message: validationMessages.minName })
  @MaxLength(25, { message: validationMessages.maxName })
  @Transform(TransformHelper.trim)
  @ApiProperty({ required: true })
  public readonly name: string;

  @IsString()
  // @Matches(regexConstants.email, { message: validationMessages.email })
  @IsEmail()
  @ApiProperty({ required: true })
  // @Transform(TransformHelper.trim)
  public readonly email: string;

  // @Matches(regexConstants.password, { message: validationMessages.password })
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({ required: true })
  public readonly password: string;

  // @Matches(regexConstants.phone)
  @IsString()
  @IsOptional()
  public readonly phone?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object) => object.age > 18)
  @MaxLength(125, { message: validationMessages.toLong })
  public readonly avatar?: string;
}
