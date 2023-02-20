import { ArtistEntity } from '../artist/artist.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { IsNotEmpty } from 'class-validator';
import { TrackFavEntity } from '../favorites/favorites.entity';


@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @IsNotEmpty()
  @Column({ type: 'int' })
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;
  @Column('uuid', { nullable: true })
  artistId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;
  @Column('uuid', { nullable: true })
  albumId: string | null;

  @OneToOne(() => TrackFavEntity, favs => favs.track, { onDelete: "CASCADE" })
  favs: TrackFavEntity;
}
