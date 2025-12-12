import { ApiProperty } from '@nestjs/swagger';

export class PokemonColorDTO {
  @ApiProperty({ description: 'The identifier for this resource' })
  id?: number | undefined;

  @ApiProperty({ description: 'The name for this resource' })
  name: string;

  @ApiProperty({
    description: 'The name of this color in different languages',
    type: [Object],
  })
  names?: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
}
