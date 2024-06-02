import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { ArticlesEntity } from './articles.entity';
import { TableNamesEnum } from './enums/table-names.enum';
import { BaseModel } from './models/base-model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNamesEnum.LIKES })
export class LikesEntity extends BaseModel {
  @Column('text')
  userId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column('text')
  articleId: string;
  @ManyToMany(() => ArticlesEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'articleId' })
  like?: ArticlesEntity;
}
