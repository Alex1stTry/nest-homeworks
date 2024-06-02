import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNamesEnum } from './enums/table-names.enum';
import { BaseModel } from './models/base-model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNamesEnum.FOLLOWERS })
export class FollowersEntity extends BaseModel {
  @Column('text')
  followerId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'followerId' })
  follower?: UserEntity;

  @Column('text')
  followingId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'followingId' })
  following?: UserEntity;
}
