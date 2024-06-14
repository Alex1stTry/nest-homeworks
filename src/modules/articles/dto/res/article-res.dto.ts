import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../user/dto/res/user.res.dto';

export class ArticleResDto {
  @ApiProperty({
    example: 'id',
    description: 'article id',
  })
  id: string;

  @ApiProperty({
    description: 'title of this article',
  })
  title: string;

  @ApiProperty({
    description: 'body of this article',
  })
  body: string;

  @ApiProperty({
    description: 'when article was created',
  })
  created: Date;

  @ApiProperty({
    description: 'description',
  })
  description: string;

  @ApiProperty({ description: 'when article was updated' })
  updated: Date;

  @ApiProperty({ description: 'tags of this articles' })
  tags: string[];

  user?: UserResDto;
}
