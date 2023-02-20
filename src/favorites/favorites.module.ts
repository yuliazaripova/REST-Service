import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import {
  AlbumFavEntity,
  ArtistFavEntity,
  TrackFavEntity,
} from './favorites.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackFavEntity, AlbumFavEntity, ArtistFavEntity]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
