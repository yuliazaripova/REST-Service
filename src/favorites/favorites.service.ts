import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from '../track/track.entity';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

import { FavoritesModel } from './favorites.model';
import { TrackFavEntity } from './track/trackFav.entity';
import { FavsEntity } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavsEntity)
    private readonly favsRepository: Repository<FavsEntity>,

    private readonly trackService: TrackService,
  ) {}
  async create(id: string): Promise<TrackFavEntity> {
    const track = await this.trackService.findOne(id);
    return await this.favsRepository.save({ ...track });
  }

  // async removeByDelete(field: string, id: string) {
  //   const arr = this.favs[`${field}s`];
  //   const index = arr.findIndex((i) => i.id === id);
  //   if (index !== -1) this.favs[`${field}s`].splice(index, 1);
  // }
}
