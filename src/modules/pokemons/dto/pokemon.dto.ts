import { ApiProperty } from '@nestjs/swagger';
import {
  PokeAPINamedApiResourceDTO,
  PokeAPIPokemonStatDTO,
} from 'src/external/pokeapi/dto';
import { PokemonAbilityDTO } from './pokemon-ability.dto';
import { PokemonColorDTO } from './pokemon-color.dto';
import { PokemonEvolutionsDTO } from './pokemon-evolution.dto';
import { PokemonPictureDTO } from './pokemon-picture.dto';

export class PokemonDTO {
  @ApiProperty({ description: 'The identifier for this resource' })
  id: number;

  @ApiProperty({ description: 'The name for this resource' })
  name: string;

  @ApiProperty({
    description: 'The base experience gained for defeating this Pokémon',
  })
  base_experience: number;

  @ApiProperty({ description: 'The height of this Pokémon in decimetres' })
  height: number;

  @ApiProperty({
    description:
      'Set for exactly one Pokémon used as the default for each species',
  })
  is_default: boolean;

  @ApiProperty({
    description:
      'Order for sorting. Almost national order, except families are grouped together',
  })
  order: number;

  @ApiProperty({ description: 'The weight of this Pokémon in hectograms' })
  weight: number;

  @ApiProperty({
    description:
      'A link to a list of location areas, as well as encounter details pertaining to specific versions',
    required: false,
  })
  location_area_encounters?: string;

  @ApiProperty({
    description: 'The best available pictures of the Pokémon (up to 3)',
    type: [PokemonPictureDTO],
  })
  pictures: PokemonPictureDTO[];

  @ApiProperty({ description: 'The species this Pokémon belongs to' })
  species: PokeAPINamedApiResourceDTO;

  @ApiProperty({
    description: 'A list of base stat values for this Pokémon',
    type: [PokeAPIPokemonStatDTO],
  })
  stats: PokeAPIPokemonStatDTO[];

  @ApiProperty({
    description: 'A list of abilities this Pokémon has',
    type: [PokemonAbilityDTO],
  })
  abilities: PokemonAbilityDTO[];

  @ApiProperty({
    description: 'The evolution chain of this Pokémon (up to 3 stages)',
    type: PokemonEvolutionsDTO,
    required: false,
  })
  evolutions?: PokemonEvolutionsDTO;

  @ApiProperty({
    description: 'The color(s) of this Pokémon',
    type: PokemonColorDTO,
    required: false,
  })
  color?: PokemonColorDTO;
}
