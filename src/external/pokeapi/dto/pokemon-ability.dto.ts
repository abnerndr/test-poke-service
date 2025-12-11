import { ApiProperty } from '@nestjs/swagger';
import { PokeAPIAbilityDTO } from './ability.dto';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';

export class PokeAPIPokemonAbilityDTO {
  @ApiProperty({ description: 'Whether or not this is a hidden ability' })
  is_hidden: boolean;

  @ApiProperty({
    description: 'The slot this ability occupies in this Pokémon species',
  })
  slot: number;

  @ApiProperty({ description: 'The ability the Pokémon may have' })
  ability: PokeAPINamedApiResourceDTO;

  @ApiProperty({
    description: 'The full ability data',
    type: () => PokeAPIAbilityDTO,
    required: false,
  })
  ability_data?: PokeAPIAbilityDTO;
}
