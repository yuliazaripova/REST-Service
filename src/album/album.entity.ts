import { IsNumber, IsUUID } from 'class-validator';
import { TrackEntity } from '../track/track.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @IsNumber()
  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];
}
