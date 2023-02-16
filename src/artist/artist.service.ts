import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistModel } from './artist.model';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService {
  @Inject(forwardRef(() => TrackService))
  private readonly trackService: TrackService;

  @Inject(forwardRef(() => FavoritesService))
  private readonly favoritesService: FavoritesService;

  private readonly artists: ArtistModel[] = [];

  async create(dto: ArtistModel) {
    const artist = {
      id: uuidv4(),
      ...dto,
    };
    this.artists.push(artist);
    return artist;
  }

  async findAll() {
    return this.artists;
  }

  async findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    const index = this.artists.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException();

    this.artists[index] = { id, ...dto };

    return { id, ...dto };
  }

  async remove(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException();
    this.artists.splice(index, 1);

    this.trackService.clearField('artistId', id);
    this.favoritesService.removeByDelete('artist', id);
  }
}
