import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackModel } from './track.model';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  @Inject(forwardRef(() => FavoritesService))
  // @Inject(FavoritesService)
  private readonly favoritesService: FavoritesService;
  private readonly tracks: TrackModel[] = [];

  async create(dto: TrackModel) {
    const track = {
      id: uuidv4(),
      ...dto,
    };
    this.tracks.push(track);
    return track;
  }

  async findAll() {
    console.log(this.favoritesService.findAll);
    return this.tracks;
  }

  async findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async update(id: string, dto: Omit<TrackModel, 'id'>) {
    const index = this.tracks.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException();
    const track = this.tracks[index];
    this.tracks[index] = { id, ...dto };

    return { id, ...dto };
  }

  async remove(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException();
    this.tracks.splice(index, 1);
    this.favoritesService.removeByDelete('track', id);
  }

  async clearField(field: string, id: string) {
    this.tracks.forEach((track, idx) => {
      if (track[field] === id) {
        this.tracks[idx] = { ...track, [field]: null };
      }
    });
    console.log(this.tracks);
  }
}
