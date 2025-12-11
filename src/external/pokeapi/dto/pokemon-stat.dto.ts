import { ApiProperty } from '@nestjs/swagger';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';

export class PokeAPIPokemonStatDTO {
  @ApiProperty({ description: 'The stat the Pokémon has' })
  stat: PokeAPINamedApiResourceDTO;

  @ApiProperty({
    description: 'The effort points (EV) the Pokémon has in the stat',
  })
  effort: number;

  @ApiProperty({ description: 'The base value of the stat' })
  base_stat: number;
}
