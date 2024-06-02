import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { ArticlesEntity } from './articles.entity';
import { TableNamesEnum } from './enums/table-names.enum';
import { BaseModel } from './models/base-model';

@Entity({ name: TableNamesEnum.TAGES })
export class TagsEntity extends BaseModel {
  @Column('text')
  name: string;
  @ManyToMany(() => ArticlesEntity, (entity) => entity.tags)
  @JoinTable()
  articles?: ArticlesEntity[];
}
