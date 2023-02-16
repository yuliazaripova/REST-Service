import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumModel } from './album.model';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';
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
    const album = await this.findOne(id);
    await this.albumRepository.save({ id, ...dto });
    return await this.findOne(id);
  }

//   async create(dto: AlbumModel) {
//     const album = {
//       id: uuidv4(),
//       ...dto,
//     };
//     this.albums.push(album);
//     return album;
//   }

//   async findAll() {
//     return this.albums;
//   }

//   async findOne(id: string) {
//     const album = this.albums.find((album) => album.id === id);
//     if (!album) {
//       throw new NotFoundException();
//     }
//     return album;
//   }

//   async update(id: string, dto: Omit<AlbumModel, 'id'>) {
//     const index = this.albums.findIndex((album) => album.id === id);
//     if (index === -1) throw new NotFoundException();
//     this.albums[index] = { id, ...dto };

//     return { id, ...dto };
//   }

//   async remove(id: string) {
//     const index = this.albums.findIndex((album) => album.id === id);
//     if (index === -1) throw new NotFoundException();
//     this.albums.splice(index, 1);
//     this.trackService.clearField('albumId', id);
//     this.favoritesService.removeByDelete('album', id);
//   }

//   async clearArtist(id: string) {
//     this.albums.forEach((track, idx) => {
//       if (track.artistId === id) {
//         this.albums[idx].artistId === null;
//       }
//     });
//   }
 }
