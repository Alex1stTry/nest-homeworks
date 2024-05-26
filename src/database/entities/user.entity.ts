import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;
}
