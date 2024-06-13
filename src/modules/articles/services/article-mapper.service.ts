import { ArticlesEntity } from '../../../database/entities/articles.entity';
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
      tags: articles.tags.map((tag) => tag.name),
    };
  }
}
