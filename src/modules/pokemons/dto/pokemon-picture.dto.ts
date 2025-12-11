import { ApiProperty } from '@nestjs/swagger';

export class PokemonPictureDTO {
  @ApiProperty({
    description: 'The URL of the Pokémon picture',
  })
  url: string;
}

export class PokemonPicturesDTO {
  @ApiProperty({
    description: 'List of the best available Pokémon pictures (up to 3)',
    type: [PokemonPictureDTO],
  })
  items: PokemonPictureDTO[];
}
