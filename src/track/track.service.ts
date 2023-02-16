import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackModel } from './track.model';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}
  async create(dto: TrackEntity): Promise<TrackEntity> {
    return await this.trackRepository.save({ ...dto });
   
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.trackRepository.delete({ id });
  }

  async update(id: string, dto: TrackEntity): Promise<TrackEntity> {
    const track = await this.findOne(id);
    await this.trackRepository.save({ id, ...dto });
    return await this.findOne(id);
  }

 

  // async create(dto: TrackModel) {
  //   const track = {
  //     id: uuidv4(),
  //     ...dto,
  //   };
  //   this.tracks.push(track);
  //   return track;
  // }

  // async findAll() {
  //   console.log(this.favoritesService.findAll);
  //   return this.tracks;
  // }

  // async findOne(id: string) {
  //   const track = this.tracks.find((track) => track.id === id);
  //   if (!track) {
  //     throw new NotFoundException();
  //   }
  //   return track;
  // }

  // async update(id: string, dto: Omit<TrackModel, 'id'>) {
  //   const index = this.tracks.findIndex((user) => user.id === id);
  //   if (index === -1) throw new NotFoundException();

  //   this.tracks[index] = { id, ...dto };

  //   return { id, ...dto };
  // }

  // async remove(id: string) {
  //   const index = this.tracks.findIndex((track) => track.id === id);
  //   if (index === -1) throw new NotFoundException();
  //   this.tracks.splice(index, 1);
  //   this.favoritesService.removeByDelete('track', id);
  // }

  // async clearField(field: string, id: string) {
  //   this.tracks.forEach((track, idx) => {
  //     if (track[field] === id) {
  //       this.tracks[idx] = { ...track, [field]: null };
  //     }
  //   });
  //   console.log(this.tracks);
  // }
}
