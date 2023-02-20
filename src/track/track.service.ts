import { Injectable, NotFoundException } from '@nestjs/common';
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
    await this.findOne(id);
    await this.trackRepository.save({ id, ...dto });
    return await this.findOne(id);
  }
}
