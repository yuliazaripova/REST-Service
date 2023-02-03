import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackModel } from './track.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
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

    return track;
  }

  async remove(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException();
    this.tracks.splice(index, 1);
  }
}
