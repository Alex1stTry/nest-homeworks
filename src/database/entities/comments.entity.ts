import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticlesEntity } from './articles.entity';
import { TableNamesEnum } from './enums/table-names.enum';
import { BaseModel } from './models/base-model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNamesEnum.COMMENTS })
export class CommentsEntity extends BaseModel {
  @Column('text')
  body: string;

  @Column('text')
  userId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'userId' })
  comment?: UserEntity;

  @Column('text')
  articleId: string;
  @ManyToOne(() => ArticlesEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'articleId' })
  commenting?: ArticlesEntity;
}
