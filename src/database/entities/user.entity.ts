import { Column, Entity, OneToMany } from 'typeorm';

import { ArticlesEntity } from './articles.entity';
import { CommentsEntity } from './comments.entity';
import { TableNamesEnum } from './enums/table-names.enum';
import { FollowersEntity } from './followers.entity';
import { LikesEntity } from './likes.entity';
import { BaseModel } from './models/base-model';
import { RefreshTokensEntity } from './refresh-tokens.entity';

@Entity({ name: TableNamesEnum.USERS })
export class UserEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  phone?: string;
  @Column('text', { nullable: true })
  age?: number;

  @Column('text', { nullable: true })
  avatar?: string;
  @Column('text', { nullable: true })
  bio?: string;

  @Column('text')
  lastname?: string;

  @Column({ default: false })
  isActive: boolean;
  @OneToMany(
    () => RefreshTokensEntity,
    (entity: RefreshTokensEntity) => entity.user,
  )
  refreshTokens?: RefreshTokensEntity[];
  @OneToMany(
    () => FollowersEntity,
    (entity: FollowersEntity) => entity.follower,
  )
  followers?: FollowersEntity[];

  @OneToMany(
    () => FollowersEntity,
    (entity: FollowersEntity) => entity.following,
  )
  followings?: FollowersEntity[];

  @OneToMany(() => CommentsEntity, (entity) => entity.comment)
  comments?: CommentsEntity[];

  @OneToMany(() => ArticlesEntity, (entity) => entity.article)
  articles?: ArticlesEntity[];

  @OneToMany(() => LikesEntity, (entity) => entity.user)
  likes?: LikesEntity[];
}
