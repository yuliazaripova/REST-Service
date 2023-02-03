import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}
    @Get()
    async findAll(@Query() query: any) {
      return this.favoritesService.findAll();
    }
  
    @Get('track/:id')
    async findOneTrack(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.findOne("track", id);
    }

    @Get('album/:id')
    async findOneAlbum(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.findOne("album", id);
    }

    @Get('artist/:id')
    async findOneArtist(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.findOne("artist", id);
    }

}
