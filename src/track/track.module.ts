import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artist/artist.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackController } from './track.controller';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ TrackEntity ]), ArtistModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
