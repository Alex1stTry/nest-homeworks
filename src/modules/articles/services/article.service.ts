import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { ArticlesEntity } from '../../../database/entities/articles.entity';
import { TagsEntity } from '../../../database/entities/tags.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticlesRepository } from '../../repository/services/articles.repository';
import { TagsRepository } from '../../repository/services/tags.repository';
import { CreateArticleReqDto } from '../dto/req/create-article-req.dto';
import { UpdateArticleReqDto } from '../dto/req/update-article.req.dto';
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
  public async getById(
    userData: IUserData,
    articleId: string,
  ): Promise<ArticleResDto> {
    const articles = await this.articlesRepo.findArticleById(
      userData,
      articleId,
    );
    if (!articles) {
      throw new NotFoundException();
    }
    return ArticleMapperService.toResponseDTO(articles);
  }
  public async updateById(
    userData: IUserData,
    articleId: string,
    dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    const article = await this.findMyArticle(userData.userId, articleId);
    await this.articlesRepo.save({ ...article, ...dto });
    const updatedArticle = await this.articlesRepo.findArticleById(
      userData,
      articleId,
    );
    return ArticleMapperService.toResponseDTO(updatedArticle);
  }
  public async deleteById(
    userData: IUserData,
    articleId: string,
  ): Promise<void> {
    const article = await this.findMyArticle(userData.userId, articleId);
    await this.articlesRepo.remove(article);
  }
  public async findMyArticle(
    userId: string,
    articleId: string,
  ): Promise<ArticlesEntity> {
    const article = await this.articlesRepo.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException();
    }
    if (article.userId !== userId) {
      throw new ForbiddenException();
    }
    return article;
  }
}
