import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistModel } from './artist.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
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

  async update(id: string, dto: Omit<ArtistModel, 'id'>) {
    const index = this.artists.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException();
    const artist = this.artists[index];
    this.artists[index] = { id, ...dto };

    return artist;
  }

  async remove(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException();
    this.artists.splice(index, 1);
  }
}
