import { ApiProperty } from '@nestjs/swagger';

export class PokeAPIPokemonSpritesDTO {
  @ApiProperty({
    description:
      'The default depiction of this Pokémon from the front in battle',
    required: false,
  })
  front_default?: string;

  @ApiProperty({
    description: 'The shiny depiction of this Pokémon from the front in battle',
    required: false,
  })
  front_shiny?: string;

  @ApiProperty({
    description:
      'The female depiction of this Pokémon from the front in battle',
    required: false,
  })
  front_female?: string;

  @ApiProperty({
    description:
      'The shiny female depiction of this Pokémon from the front in battle',
    required: false,
  })
  front_shiny_female?: string;

  @ApiProperty({
    description:
      'The default depiction of this Pokémon from the back in battle',
    required: false,
  })
  back_default?: string;

  @ApiProperty({
    description: 'The shiny depiction of this Pokémon from the back in battle',
    required: false,
  })
  back_shiny?: string;

  @ApiProperty({
    description: 'The female depiction of this Pokémon from the back in battle',
    required: false,
  })
  back_female?: string;

  @ApiProperty({
    description:
      'The shiny female depiction of this Pokémon from the back in battle',
    required: false,
  })
  back_shiny_female?: string;
}
