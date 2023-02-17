import { ArtistEntity } from '../artist/artist.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  // @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
  //   onDelete: 'SET NULL',
  // })

  // @Column({ type: 'uuid', nullable: true })
  // artistId: string;

  @Column({ type: 'uuid', nullable: true })
  albumId: string;

  @Column({ type: 'int' })
  duration: number;

  // @ManyToOne(() => ArtistEntity, (artist) => artist, {
  //   onDelete: 'SET NULL',
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn()
  // artist: ArtistEntity;

  // @ManyToOne(() => ArtistEntity, (artist) => artist, {
  //   onDelete: 'SET NULL',
  //   // createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'artistId' })
  // artist: ArtistEntity;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;
  @Column('uuid', { nullable: true })
  artistId: string | null;
}
