import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  Length,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseArticleReqDto {
  @IsString()
  @Length(5, 25)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @IsString()
  @Length(5, 255)
  @Type(() => String)
  @Transform(TransformHelper.trim)
  body: string;

  @IsString()
  @Length(25, 100)
  @Type(() => String)
  @Transform(TransformHelper.trim)
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueItems)
  @Transform(TransformHelper.toLowerCaseArray)
  tags: string[];
}
