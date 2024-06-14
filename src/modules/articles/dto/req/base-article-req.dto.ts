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
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @IsString()
  @Length(0, 500)
  @Type(() => String)
  @Transform(TransformHelper.trim)
  body: string;

  @IsString()
  @Length(0, 150)
  @Type(() => String)
  @Transform(TransformHelper.trim)
  description: string;

  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueItems)
  @Transform(TransformHelper.toLowerCaseArray)
  tags: string[];
}
