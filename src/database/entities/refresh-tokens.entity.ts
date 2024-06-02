import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNamesEnum } from './enums/table-names.enum';
import { BaseModel } from './models/base-model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNamesEnum.REFRESH_TOKENS })
export class RefreshTokensEntity extends BaseModel {
  @Column('text')
  token: string;
  @Column('text')
  userId: string;
  @Column('text')
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
