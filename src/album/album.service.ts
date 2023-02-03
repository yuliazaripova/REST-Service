import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumModel } from './album.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private readonly albums: AlbumModel[] = [];

  async create(dto: AlbumModel) {
    const album = {
      id: uuidv4(),
      ...dto,
    };
    this.albums.push(album);
    return album;
  }

  async findAll() {
    return this.albums;
  }

  async findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async update(id: string, dto: Omit<AlbumModel, 'id'>) {
    const index = this.albums.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException();
    const album = this.albums[index];
    this.albums[index] = { id, ...dto };

    return album;
  }

  async remove(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException();
    this.albums.splice(index, 1);
  }
}
