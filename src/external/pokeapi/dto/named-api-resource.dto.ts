import { ApiProperty } from '@nestjs/swagger';

export class PokeAPINamedApiResourceDTO {
  @ApiProperty({ description: 'The name of the referenced resource' })
  name: string;

  @ApiProperty({ description: 'The URL of the referenced resource' })
  url: string;
}
