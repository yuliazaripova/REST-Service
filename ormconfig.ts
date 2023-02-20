import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { UserEntity } from './src/user/user.entity';
import { ArtistEntity } from './src/artist/artist.entity';
import { TrackEntity } from './src/track/track.entity';
import { AlbumEntity } from './src/album/album.entity';
import {
  AlbumFavEntity,
  ArtistFavEntity,
  FavsEntity,
  TrackFavEntity,
} from './src/favorites/favorites.entity';
import { Base1676917714077 } from './src/migration/1676917714077-Base';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  port: Number(process.env.PGPORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsRun: true,
  entities: [
    UserEntity,
    ArtistEntity,
    TrackEntity,
    AlbumEntity,
    TrackFavEntity,
    AlbumFavEntity,
    ArtistFavEntity,
    FavsEntity,
  ],
  migrations: [Base1676917714077],
  logging: true,
  synchronize: false,
});
