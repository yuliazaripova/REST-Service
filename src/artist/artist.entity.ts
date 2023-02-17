import { TrackEntity } from '../track/track.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsBoolean, IsString } from 'class-validator';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @IsBoolean()
  @Column({ type: 'boolean', nullable: true })
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];
}
