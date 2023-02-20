import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../../track/track.module';
import { FavoritesController } from '../favorites.controller';
import { FavoritesService } from '../favorites.service';
import { TrackFavEntity } from './trackFav.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([TrackFavEntity]),
//     TrackModule,
//     //   forwardRef(() => ArtistModule),
//     // //  forwardRef(() => TrackModule),
//     //   forwardRef(() => AlbumModule),
//   ],
//   providers: [FavoritesService],
//   controllers: [FavoritesController],
//   exports: [TrackFavoritesModule],
// })
// export class TrackFavoritesModule {}
