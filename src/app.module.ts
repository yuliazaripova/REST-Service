import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AlbumEntity } from './album/album.entity';
import { ArtistEntity } from './artist/artist.entity';
import {
  TrackFavEntity,
  AlbumFavEntity,
  ArtistFavEntity,
  FavsEntity,
} from './favorites/favorites.entity';
import { TrackEntity } from './track/track.entity';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',

        port: config.get<number>('PGPORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        host: 'db',
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
        migrations: ['src/migration/*.ts'],
      }),
    }),
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
