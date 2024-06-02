import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RefreshTokensEntity } from '../../../database/entities/refresh-tokens.entity';

@Injectable()
export class RefreshTokensRepository extends Repository<RefreshTokensEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokensEntity, dataSource.manager);
  }
}
