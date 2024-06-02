import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FollowersEntity } from '../../../database/entities/followers.entity';

@Injectable()
export class FollowsRepository extends Repository<FollowersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FollowersEntity, dataSource.manager);
  }
}
