import { ApiProperty } from '@nestjs/swagger';
import { PokemonPictureDTO } from './pokemon-picture.dto';

export class PokemonEvolutionDTO {
  @ApiProperty({ description: 'The ID of the Pokémon in this evolution stage' })
  id: number;

  @ApiProperty({ description: 'The name of the Pokémon in this evolution stage' })
  name: string;

  @ApiProperty({
    description: 'The pictures of the Pokémon in this evolution stage',
    type: [PokemonPictureDTO],
  })
  pictures: PokemonPictureDTO[];
}

export class PokemonEvolutionsDTO {
  @ApiProperty({
    description: 'The first stage of evolution (baby/base form)',
    type: PokemonEvolutionDTO,
    required: false,
  })
  first?: PokemonEvolutionDTO;

  @ApiProperty({
    description: 'The second stage of evolution (middle evolution)',
    type: PokemonEvolutionDTO,
    required: false,
  })
  second?: PokemonEvolutionDTO;

  @ApiProperty({
    description: 'The third stage of evolution (final form)',
    type: PokemonEvolutionDTO,
    required: false,
  })
  third?: PokemonEvolutionDTO;
}

