import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [TrackModule, forwardRef(() => FavoritesModule)],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService]
})
export class ArtistModule {}
