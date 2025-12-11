import { ApiProperty } from '@nestjs/swagger';
import { PokemonListItemDTO } from './pokemon-list-item.dto';

export class PokemonsDTO {
  @ApiProperty({
    description: 'The total number of resources available from this API',
  })
  count: number;

  @ApiProperty({
    description: 'The URL for the next page in the list',
    required: false,
  })
  next?: string;

  @ApiProperty({
    description: 'The URL for the previous page in the list',
    required: false,
  })
  previous?: string;

  @ApiProperty({
    description: 'A list of Pokémon with basic data and pictures',
    type: [PokemonListItemDTO],
  })
  items: PokemonListItemDTO[];
}
