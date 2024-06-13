import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { TagsEntity } from '../../../database/entities/tags.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticlesRepository } from '../../repository/services/articles.repository';
import { TagsRepository } from '../../repository/services/tags.repository';
import { CreateArticleReqDto } from '../dto/req/create-article-req.dto';
import { ArticleResDto } from '../dto/res/article-res.dto';
import { ArticleMapperService } from './article-mapper.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly tagRepo: TagsRepository,
    private readonly articlesRepo: ArticlesRepository,
  ) {}
  public async createArticle(
    userData: IUserData,
    dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    const tags = await this.createTags(dto.tags);
    const articles = await this.articlesRepo.save(
      this.articlesRepo.create({
        ...dto,
        userId: userData.userId,
        tags,
      }),
    );
    return ArticleMapperService.toResponseDTO(articles);
  }
  public async createTags(tags: string[]): Promise<TagsEntity[]> {
    if (!tags || tags.length === 0) return [];
    const entities = await this.tagRepo.findBy({ name: In(tags) });
    const uniqueTags = new Set(entities.map((tag) => tag.name));
    const newTags = tags.filter((tag) => !uniqueTags.has(tag));
    const newEntities = await this.tagRepo.save(
      newTags.map((name) => this.tagRepo.create({ name })),
    );
    return [...entities, ...newEntities];
  }
}
