import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;
}
