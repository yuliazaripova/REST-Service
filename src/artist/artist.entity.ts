import { TrackEntity } from '../track/track.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsBoolean, IsString } from 'class-validator';
import { ArtistFavEntity } from '../favorites/favorites.entity';

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

  @OneToOne(() => ArtistFavEntity, (favs) => favs.artist, {
    onDelete: 'CASCADE',
  })
  artistFavs: ArtistFavEntity;
}
