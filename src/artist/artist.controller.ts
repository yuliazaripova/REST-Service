import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ArtistModel } from './artist.model';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Post()
  async create(@Body() dto: ArtistModel) {
    return this.artistService.create(dto);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Omit<ArtistModel, 'id'>) {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}
