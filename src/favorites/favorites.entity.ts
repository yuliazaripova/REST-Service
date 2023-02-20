import { TrackEntity } from '../track/track.entity';
import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';

@Entity('favs')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
@ChildEntity()
export class TrackFavEntity extends FavsEntity {
  @Column()
  type: string;

  @OneToOne(() => TrackEntity, (track) => track.favs, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId' })
  track: TrackEntity;
  @Column('uuid', { nullable: true })
  trackId: string | null;
}
@ChildEntity()
export class AlbumFavEntity extends FavsEntity {
  @Column()
  type: string;

  @OneToOne(() => AlbumEntity, (album) => album.albumFavs, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;
  @Column('uuid', { nullable: true })
  albumId: string | null;
}

@ChildEntity()
export class ArtistFavEntity extends FavsEntity {
  @Column()
  type: string;

  @OneToOne(() => ArtistEntity, (artist) => artist.artistFavs, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;
  @Column('uuid', { nullable: true })
  artistId: string | null;
}
