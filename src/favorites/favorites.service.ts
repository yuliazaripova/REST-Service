import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesModel } from './favorites.model';

@Injectable()
export class FavoritesService {
  @Inject(forwardRef(() => TrackService))
  private readonly trackService: TrackService;

  @Inject(forwardRef(() => ArtistService))
  private readonly artistService: ArtistService;

  @Inject(forwardRef(() => AlbumService))
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
  async remove(field: string, id: string) {
    const arr = this.favs[`${field}s`];
    const index = arr.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException();
    this.favs[`${field}s`].splice(index, 1);
  }

  async removeByDelete(field: string, id: string) {
    const arr = this.favs[`${field}s`];
    const index = arr.findIndex((i) => i.id === id);
    if (index !== -1) this.favs[`${field}s`].splice(index, 1);
  }

  async create(field: string, id: string) {
    const service = this.getService(field);

    const items: any = await service.findAll();
    const item = items.find((i) => i.id === id);
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
