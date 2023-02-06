import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumModel } from './album.model';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  @Inject(forwardRef(() => TrackService))
  private readonly trackService: TrackService;

  @Inject(forwardRef(() => FavoritesService))
  private readonly favoritesService: FavoritesService;

  private readonly albums: AlbumModel[] = [];

  async create(dto: AlbumModel) {
    const album = {
      id: uuidv4(),
      ...dto,
    };
    this.albums.push(album);
    return album;
  }

  async findAll() {
    return this.albums;
  }

  async findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async update(id: string, dto: Omit<AlbumModel, 'id'>) {
    const index = this.albums.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException();
    this.albums[index] = { id, ...dto };

    return { id, ...dto };
  }

  async remove(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException();
    this.albums.splice(index, 1);
    this.trackService.clearField('albumId', id);
    this.favoritesService.removeByDelete('album', id);
  }

  async clearArtist(id: string) {
    this.albums.forEach((track, idx) => {
      if (track.artistId === id) {
        this.albums[idx].artistId === null;
      }
    });
  }
}
