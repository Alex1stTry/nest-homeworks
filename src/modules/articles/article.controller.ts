import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateArticleReqDto } from './dto/req/create-article-req.dto';
import { ArticleResDto } from './dto/res/article-res.dto';
import { ArticleService } from './services/article.service';

@ApiTags('Articles')
@Controller('articles')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiNotFoundResponse({ description: 'Not found' })
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  public async createArticle(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    return await this.articleService.createArticle(userData, dto);
  }
}
