import { ApiProperty } from '@nestjs/swagger';
import { PokeAPINamedApiResourceDTO } from './named-api-resource.dto';

export class AbilityEffectEntryDto {
  @ApiProperty({
    description:
      'The localized effect text for an API resource in a specific language',
  })
  effect: string;

  @ApiProperty({ description: 'The language this effect is in' })
  language: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'The localized effect text in brief' })
  short_effect: string;
}

export class AbilityFlavorTextDto {
  @ApiProperty({
    description:
      'The localized flavor text for an API resource in a specific language',
  })
  flavor_text: string;

  @ApiProperty({ description: 'The language this name is in' })
  language: PokeAPINamedApiResourceDTO;

  @ApiProperty({ description: 'The version group that uses this flavor text' })
  version_group: PokeAPINamedApiResourceDTO;
}

export class PokeAPIAbilityDTO {
  @ApiProperty({ description: 'The identifier for this resource' })
  id: number;

  @ApiProperty({ description: 'The name for this resource' })
  name: string;

  @ApiProperty({
    description:
      'Whether or not this ability originated in the main series of the video games',
  })
  is_main_series: boolean;

  @ApiProperty({ description: 'The generation this ability was introduced in' })
  generation: PokeAPINamedApiResourceDTO;

  @ApiProperty({
    description: 'The name of this resource listed in different languages',
    type: [Object],
  })
  names: any[];

  @ApiProperty({
    description: 'The effect of this ability listed in different languages',
    type: [AbilityEffectEntryDto],
  })
  effect_entries: AbilityEffectEntryDto[];

  @ApiProperty({
    description:
      'The flavor text of this ability listed in different languages',
    type: [AbilityFlavorTextDto],
  })
  flavor_text_entries: AbilityFlavorTextDto[];

  @ApiProperty({
    description: 'A list of Pokémon that could potentially have this ability',
    type: [Object],
  })
  pokemon: any[];
}
