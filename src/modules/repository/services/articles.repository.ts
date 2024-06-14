import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ArticlesEntity } from '../../../database/entities/articles.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class ArticlesRepository extends Repository<ArticlesEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticlesEntity, dataSource.manager);
  }
  public async findArticleById(userData: IUserData, articleId: string) {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.followerId=:myId',
    );

    qb.where('article.id=:articleId');
    qb.setParameter('articleId', articleId);
    qb.setParameter('myId', userData.userId);

    return await qb.getOne();
  }
}
