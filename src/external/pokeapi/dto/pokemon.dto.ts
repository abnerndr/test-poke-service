import { ApiProperty } from '@nestjs/swagger';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';
import { PokeAPIPokemonAbilityDTO } from './pokemon-ability.dto';
import { PokeAPIPokemonSpritesDTO } from './pokemon-sprites.dto';
import { PokeAPIPokemonStatDTO } from './pokemon-stat.dto';
import { PokeAPIPokemonTypeDTO } from './pokemon-type.dto';

export class PokeAPIPokemonDTO {
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
    description: 'A list of abilities this Pokémon could potentially have',
    type: [PokeAPIPokemonAbilityDTO],
  })
  abilities: PokeAPIPokemonAbilityDTO[];

  @ApiProperty({
    description: 'A list of forms this Pokémon can take on',
    type: [PokeAPINamedApiResourceDTO],
  })
  forms: PokeAPINamedApiResourceDTO[];

  @ApiProperty({
    description:
      'A list of game indices relevant to Pokémon item by generation',
    type: [Object],
  })
  game_indices: any[];

  @ApiProperty({
    description: 'A list of items this Pokémon may be holding when encountered',
    type: [PokeAPINamedApiResourceDTO],
  })
  held_items: PokeAPINamedApiResourceDTO[];

  @ApiProperty({
    description:
      'A link to a list of location areas, as well as encounter details pertaining to specific versions',
    required: false,
  })
  location_area_encounters?: string;

  @ApiProperty({
    description:
      'A list of moves along with learn methods and level details pertaining to specific version groups',
    type: [Object],
  })
  moves?: any[];

  @ApiProperty({
    description: 'A set of sprites used to depict this Pokémon in the game',
    type: PokeAPIPokemonSpritesDTO,
  })
  sprites: PokeAPIPokemonSpritesDTO;

  @ApiProperty({ description: 'The species this Pokémon belongs to' })
  species: PokeAPINamedApiResourceDTO;

  @ApiProperty({
    description: 'A list of base stat values for this Pokémon',
    type: [PokeAPIPokemonStatDTO],
  })
  stats: PokeAPIPokemonStatDTO[];

  @ApiProperty({
    description: 'A list of details showing types this Pokémon has',
    type: [PokeAPIPokemonTypeDTO],
  })
  types: PokeAPIPokemonTypeDTO[];
}
