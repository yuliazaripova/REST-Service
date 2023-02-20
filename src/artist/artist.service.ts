import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}
  async create(dto: ArtistEntity): Promise<ArtistEntity> {
    return await this.artistRepository.save({ ...dto });
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.artistRepository.delete({ id });
  }

  async update(id: string, dto: ArtistEntity): Promise<ArtistEntity> {
    await this.findOne(id);
    await this.artistRepository.save({ id, ...dto });
    return await this.findOne(id);
  }
}
