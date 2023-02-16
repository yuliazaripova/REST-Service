import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @Column({ type: 'uuid', nullable: true })
  albumId: string;

  @Column({ type: 'int' })
  duration: number;
}
