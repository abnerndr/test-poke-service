import { ApiProperty } from '@nestjs/swagger';

export class PokemonAbilityDTO {
  @ApiProperty({ description: 'The name of the ability' })
  name: string;

  @ApiProperty({ description: 'Whether or not this is a hidden ability' })
  is_hidden: boolean;

  @ApiProperty({
    description: 'The slot this ability occupies in this Pokémon species',
  })
  slot?: number;

  @ApiProperty({
    description: 'The effect of this ability in English',
    required: false,
  })
  effect?: string;

  @ApiProperty({
    description: 'The short effect of this ability in English',
    required: false,
  })
  short_effect?: string;
}
