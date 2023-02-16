import { Exclude, Transform } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  login: string;

  @Exclude()
  @Column({ type: 'varchar', length: 300 })
  password: string;

  @VersionColumn({ type: 'int' })
  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  @CreateDateColumn()
  createdAt: Date;

  @Transform(({ value }) => new Date(value).getTime())
  @UpdateDateColumn()
  updatedAt: Date;
}
