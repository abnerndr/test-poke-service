import { ApiProperty } from '@nestjs/swagger';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';

export class PokeAPIPokemonTypeDTO {
  @ApiProperty({ description: "The order the Pokémon's types are listed in" })
  slot: number;

  @ApiProperty({ description: 'The type the referenced Pokémon has' })
  type: PokeAPINamedApiResourceDTO;
}
