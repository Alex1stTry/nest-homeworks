import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CommentsEntity } from './comments.entity';
import { TableNamesEnum } from './enums/table-names.enum';
import { LikesEntity } from './likes.entity';
import { BaseModel } from './models/base-model';
import { TagsEntity } from './tags.entity';
import { UserEntity } from './user.entity';

@Entity({ name: TableNamesEnum.ARTICLES })
export class ArticlesEntity extends BaseModel {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @OneToMany(
    () => CommentsEntity,
    (entity: CommentsEntity) => entity.commenting,
  )
  comments?: CommentsEntity[];

  @OneToMany(() => LikesEntity, (entity) => entity.like)
  likes?: LikesEntity[];

  @Column('text')
  userId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'userId' })
  article?: UserEntity;

  @ManyToMany(() => TagsEntity, (entity) => entity.articles)
  tags?: TagsEntity[];
}
