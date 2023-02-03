import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  async findAll(@Query() query: any) {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.create('track', id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.create('album', id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.create('artist', id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.remove('track', id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.remove('album', id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.remove('artist', id);
  }

  @Get('track/:id')
  async findOneTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.findOne('track', id);
  }

  @Get('album/:id')
  async findOneAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.findOne('album', id);
  }

  @Get('artist/:id')
  async findOneArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.findOne('artist', id);
  }
}
