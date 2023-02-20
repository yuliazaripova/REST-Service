import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}
  async create(dto: AlbumEntity): Promise<AlbumEntity> {
    return await this.albumRepository.save({ ...dto });
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.albumRepository.delete({ id });
  }

  async update(id: string, dto: AlbumEntity): Promise<AlbumEntity> {
    await this.findOne(id);
    await this.albumRepository.save({ id, ...dto });
    return await this.findOne(id);
  }
}
