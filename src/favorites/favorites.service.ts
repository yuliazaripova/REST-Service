import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesModel } from './favorites.model';

@Injectable()
export class FavoritesService {
  //   @Inject(ArtistService)
  //   @Inject(TrackService)
  //   @Inject(AlbumService)
  private readonly artistService: ArtistService;
  private readonly trackService: TrackService;
  private readonly albumService: AlbumService;

  private readonly favs: FavoritesModel = {
    artists: [],
    albums: [],
    tracks: [],
  };
  private getService(field: string) {
    switch (field) {
      case 'artist':
        return this.artistService;
      case 'track':
        return this.trackService;
      case 'album':
        return this.albumService;
    }
  }
  async create(field: string, id: string) {
    const service = this.getService(field);
    const item = service.findOne(id);
    if (!item) {
      throw new UnprocessableEntityException();
    }
    this.favs[`${field}s`].push(item);
  }

  async findAll() {
    return this.favs;
  }

  async findOne(field: string, id: string) {
    const arr = this.favs[`${field}s`];
    const item = arr.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }
}
