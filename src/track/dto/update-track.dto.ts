import { IsNotEmpty } from 'class-validator';

export class UpdateTracktDto {
  @IsNotEmpty()
  name: string;

  artistId: string | null; // refers to Artist

  albumId: string | null; // refers to Album
  @IsNotEmpty()
  duration: number; // integer number
}