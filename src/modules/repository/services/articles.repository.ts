import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ArticlesEntity } from '../../../database/entities/articles.entity';

@Injectable()
export class ArticlesRepository extends Repository<ArticlesEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticlesEntity, dataSource.manager);
  }
}
