import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

import { TransformHelper } from '../../../common/helpers/transform.helper';
import { regexConstants } from '../../../constants/regex-constants';
import { validationMessages } from '../../../constants/validation-messages';

export class CreateUserReqDto {
  @IsString()
  @MinLength(3, { message: validationMessages.minName })
  @MaxLength(25, { message: validationMessages.maxName })
  @Transform(TransformHelper.trim)
  public readonly name: string;

  @IsNumber()
  @Min(18, { message: validationMessages.minAge })
  @Max(65, { message: validationMessages.maxAge })
  @IsInt({ message: validationMessages.int })
  public readonly age: number;

  @Matches(regexConstants.email)
  @IsEmail()
  @IsString()
  @Transform(TransformHelper.trim)
  public readonly email: string;

  @Matches(regexConstants.password)
  @IsString()
  @Transform(TransformHelper.trim)
  public readonly password: string;

  @Matches(regexConstants.phone)
  @IsString()
  @IsOptional()
  public readonly phone?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object) => object.age > 18)
  @MaxLength(125, { message: validationMessages.toLong })
  public readonly avatar?: string;
}
