import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import {
  AlbumFavEntity,
  ArtistFavEntity,
  TrackFavEntity,
} from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(TrackFavEntity)
    private readonly trackFavsRepository: Repository<TrackFavEntity>,
    @InjectRepository(AlbumFavEntity)
    private readonly albumFavsRepository: Repository<AlbumFavEntity>,
    @InjectRepository(ArtistFavEntity)
    private readonly artistFavsRepository: Repository<ArtistFavEntity>,

    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}
  async findAll() {
    const albums = await this.albumFavsRepository.find();
    const tracks = await this.trackFavsRepository.find();
    const artists = await this.artistFavsRepository.find();
    return {
      artists: artists.map((i) => i.artist),
      albums: albums.map((i) => i.album),
      tracks: tracks.map((i) => i.track),
    };
  }

  async deleteAlbum(id: string): Promise<any> {
    await this.albumService.findOne(id);
    return await this.albumFavsRepository.delete({ id });
  }
  async deleteTrack(id: string): Promise<any> {
    await this.trackService.findOne(id);
    return await this.trackFavsRepository.delete({ id });
  }
  async deleteArtist(id: string): Promise<any> {
    await this.artistService.findOne(id);
    return await this.artistFavsRepository.delete({ id });
  }

  async createTrack(id: string): Promise<TrackFavEntity> {
    const items = await this.trackService.findAll();
    const item = items.find((i) => i.id === id);
    if (!item) {
      throw new UnprocessableEntityException();
    }
    return await this.trackFavsRepository.save({
      ...item,
      trackId: id,
    });
  }

  async createAlbum(id: string): Promise<AlbumFavEntity> {
    const items = await this.albumService.findAll();
    const item = items.find((i) => i.id === id);
    if (!item) {
      throw new UnprocessableEntityException();
    }
    return await this.albumFavsRepository.save({ ...item, albumId: id });
  }

  async createArtist(id: string): Promise<ArtistFavEntity> {
    const items = await this.artistService.findAll();
    const item = items.find((i) => i.id === id);
    if (!item) {
      throw new UnprocessableEntityException();
    }
    return await this.artistFavsRepository.save({ ...item, artistId: id });
  }

  // async removeByDelete(field: string, id: string) {
  //   const arr = this.favs[`${field}s`];
  //   const index = arr.findIndex((i) => i.id === id);
  //   if (index !== -1) this.favs[`${field}s`].splice(index, 1);
  // }
}
