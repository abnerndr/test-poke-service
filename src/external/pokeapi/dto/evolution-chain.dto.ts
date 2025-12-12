import { ApiProperty } from '@nestjs/swagger';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';

export class EvolutionDetailDto {
  @ApiProperty({ required: false })
  item?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  trigger?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  gender?: number;

  @ApiProperty({ required: false })
  held_item?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  known_move?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  known_move_type?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  location?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  min_level?: number;

  @ApiProperty({ required: false })
  min_happiness?: number;

  @ApiProperty({ required: false })
  min_beauty?: number;

  @ApiProperty({ required: false })
  min_affection?: number;

  @ApiProperty({ required: false })
  needs_overworld_rain?: boolean;

  @ApiProperty({ required: false })
  party_species?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  party_type?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  relative_physical_stats?: number;

  @ApiProperty({ required: false })
  time_of_day?: string;

  @ApiProperty({ required: false })
  trade_species?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ required: false })
  turn_upside_down?: boolean;
}

export class ChainLinkDto {
  @ApiProperty({ description: 'Whether this Pokémon species is a baby' })
  is_baby: boolean;

  @ApiProperty({ description: 'The Pokémon species at this point in the evolution chain' })
  species: PokeAPINamedApiResourceDTO;

  @ApiProperty({
    description: 'All details regarding the specific forms of this Pokémon that can evolve',
    type: [EvolutionDetailDto],
    required: false,
  })
  evolution_details?: EvolutionDetailDto[];

  @ApiProperty({
    description: 'A list of chain objects',
    type: [Object],
    required: false,
  })
  evolves_to?: ChainLinkDto[];
}

export class PokeAPIEvolutionChainDTO {
  @ApiProperty({ description: 'The identifier for this evolution chain' })
  id: number;

  @ApiProperty({
    description: 'The base chain link object',
    type: ChainLinkDto,
  })
  chain: ChainLinkDto;

  @ApiProperty({ description: 'The item that a Pokémon would be holding when mating that would trigger the egg to have this chain' })
  baby_trigger_item?: PokeAPINamedApiResourceDTO;
}

