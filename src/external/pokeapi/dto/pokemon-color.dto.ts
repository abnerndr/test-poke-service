import { ApiProperty } from '@nestjs/swagger';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';

export class PokeAPIPokemonColorDTO {
  @ApiProperty({ description: 'The identifier for this resource' })
  id: number;

  @ApiProperty({ description: 'The name for this resource' })
  name: string;

  @ApiProperty({
    description: 'The name of this resource listed in different languages',
    type: [Object],
  })
  names: Array<{
    name: string;
    language: PokeAPINamedApiResourceDTO;
  }>;

  @ApiProperty({
    description: 'A list of the Pokémon species that have this color',
    type: [PokeAPINamedApiResourceDTO],
  })
  pokemon_species: PokeAPINamedApiResourceDTO[];
}
