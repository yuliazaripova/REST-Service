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
    const artist = await this.artistRepository.findOne({ where: { id } });
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
    const artist = await this.findOne(id);
    await this.artistRepository.save({ id, ...dto });
    return await this.findOne(id);
  }


  // async create(dto: ArtistModel) {
  //   const artist = {
  //     id: uuidv4(),
  //     ...dto,
  //   };
  //   this.artists.push(artist);
  //   return artist;
  // }

  // async findAll() {
  //   return this.artists;
  // }

  // async findOne(id: string) {
  //   const artist = this.artists.find((artist) => artist.id === id);
  //   if (!artist) {
  //     throw new NotFoundException();
  //   }
  //   return artist;
  // }

  // async update(id: string, dto: UpdateArtistDto) {
  //   const index = this.artists.findIndex((user) => user.id === id);
  //   if (index === -1) throw new NotFoundException();

  //   this.artists[index] = { id, ...dto };

  //   return { id, ...dto };
  // }

  // async remove(id: string) {
  //   const index = this.artists.findIndex((artist) => artist.id === id);
  //   if (index === -1) throw new NotFoundException();
  //   this.artists.splice(index, 1);

  //   this.trackService.clearField('artistId', id);
  //   this.favoritesService.removeByDelete('artist', id);
  // }
}
