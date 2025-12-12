import { ApiProperty } from '@nestjs/swagger';

export class PokemonStatDTO {
  @ApiProperty({ description: 'The name of the stat' })
  name: string;

  @ApiProperty({ description: 'The base value of the stat' })
  base_stat: number;

  @ApiProperty({
    description: 'The maximum possible value of the stat at level 100',
  })
  max_stat: number;
}

export class PokemonStatsDTO {
  @ApiProperty({ description: 'HP stat', type: PokemonStatDTO })
  hp: PokemonStatDTO;

  @ApiProperty({ description: 'Attack stat', type: PokemonStatDTO })
  attack: PokemonStatDTO;

  @ApiProperty({ description: 'Defense stat', type: PokemonStatDTO })
  defense: PokemonStatDTO;

  @ApiProperty({ description: 'Special Attack stat', type: PokemonStatDTO })
  sp_atk: PokemonStatDTO;

  @ApiProperty({ description: 'Special Defense stat', type: PokemonStatDTO })
  sp_def: PokemonStatDTO;

  @ApiProperty({ description: 'Speed stat', type: PokemonStatDTO })
  speed: PokemonStatDTO;

  @ApiProperty({ description: 'Total of all base stats' })
  total: number;

  @ApiProperty({ description: 'Total of all max stats' })
  max_total: number;
}
