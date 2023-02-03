import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [ArtistModule, TrackModule, AlbumModule],
  providers: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
