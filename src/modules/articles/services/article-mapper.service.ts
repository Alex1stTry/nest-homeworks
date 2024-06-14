import { ArticlesEntity } from '../../../database/entities/articles.entity';
import { UserMapperService } from '../../user/services/user-mapper.service';
import { ArticleResDto } from '../dto/res/article-res.dto';

export class ArticleMapperService {
  public static toResponseDTO(articles: ArticlesEntity): ArticleResDto {
    return {
      id: articles.id,
      title: articles.title,
      body: articles.body,
      description: articles.description,
      created: articles.created,
      updated: articles.updated,
      tags: articles.tags ? articles.tags.map((tag) => tag.name) : [],
      user: articles.user
        ? UserMapperService.toResponseDTO(articles.user)
        : null,
    };
  }
}
