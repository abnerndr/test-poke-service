import { ApiProperty } from '@nestjs/swagger';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';

export class PokeAPIPokemonListDTO {
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
    description: 'A list of named API resources',
    type: [PokeAPINamedApiResourceDTO],
  })
  results: PokeAPINamedApiResourceDTO[];
}
