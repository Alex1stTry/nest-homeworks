import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TagsEntity } from '../../../database/entities/tags.entity';

@Injectable()
export class TagsRepository extends Repository<TagsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagsEntity, dataSource.manager);
  }
}
