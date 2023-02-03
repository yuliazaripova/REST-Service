import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavoritesModule)],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
