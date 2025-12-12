import { ApiProperty } from '@nestjs/swagger';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';

export class PokeAPIPokemonSpeciesDTO {
  @ApiProperty({ description: 'The identifier for this resource' })
  id: number;

  @ApiProperty({ description: 'The name for this resource' })
  name: string;

  @ApiProperty({ description: 'The order in which species should be sorted' })
  order: number;

  @ApiProperty({ description: 'The chance of this Pokémon being female' })
  gender_rate: number;

  @ApiProperty({ description: 'The base capture rate' })
  capture_rate: number;

  @ApiProperty({ description: 'The happiness when caught by a normal Pokéball' })
  base_happiness: number;

  @ApiProperty({ description: 'Whether or not this is a baby Pokémon' })
  is_baby: boolean;

  @ApiProperty({ description: 'Whether or not this is a legendary Pokémon' })
  is_legendary: boolean;

  @ApiProperty({ description: 'Whether or not this is a mythical Pokémon' })
  is_mythical: boolean;

  @ApiProperty({ description: 'Initial hatch counter' })
  hatch_counter: number;

  @ApiProperty({ description: 'Whether or not this Pokémon has visual gender differences' })
  has_gender_differences: boolean;

  @ApiProperty({ description: 'Whether or not this Pokémon forms a switchable pair' })
  forms_switchable: boolean;

  @ApiProperty({ description: 'The rate at which this Pokémon species gains growth points' })
  growth_rate: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'A list of Pokedexes this Pokémon species appears in' })
  pokedex_numbers: any[];

  @ApiProperty({ description: 'A list of egg groups this Pokémon species is a member of' })
  egg_groups: PokeAPINamedApiResourceDTO[];

  @ApiProperty({ description: 'The color of this Pokémon for Pokédex search' })
  color: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'The shape of this Pokémon species' })
  shape: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'The Pokémon species that evolves into this Pokemon_species' })
  evolves_from_species?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'The evolution chain this Pokémon species is a member of' })
  evolution_chain: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'The habitat this Pokémon species can be encountered in' })
  habitat?: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'The generation this Pokémon species was introduced in' })
  generation: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'The name of this resource listed in different languages' })
  names: any[];

  @ApiProperty({ description: 'A list of flavor text entries for this Pokémon species' })
  flavor_text_entries: any[];

  @ApiProperty({ description: 'Descriptions of different forms Pokémon take on within the Pokémon species' })
  form_descriptions: any[];

  @ApiProperty({ description: 'The genus of this Pokémon species listed in multiple languages' })
  genera: any[];

  @ApiProperty({ description: 'A list of the Pokémon that exist within this Pokémon species' })
  varieties: any[];
}

