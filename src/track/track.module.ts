import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackController } from './track.controller';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ TrackEntity ])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
