import { IsNumber, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string; // previous password

  @IsNumber()
  year: number;

  artistId: string | null; // refers to Artist
}
