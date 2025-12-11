import { ApiProperty } from '@nestjs/swagger';
import { PokemonPictureDTO } from './pokemon-picture.dto';

export class PokemonListItemDTO {
  @ApiProperty({ description: 'The identifier for this resource' })
  id: number;

  @ApiProperty({ description: 'The name for this resource' })
  name: string;

  @ApiProperty({
    description: 'The best available pictures of the Pokémon (up to 3)',
    type: [PokemonPictureDTO],
  })
  pictures: PokemonPictureDTO[];
}
