import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBattleDTO {
  @ApiProperty({ description: 'The ID of the first Pokemon' })
  @IsNotEmpty()
  @IsInt()
  firstPokemonId: number;

  @ApiProperty({ description: 'The ID of the second Pokemon' })
  @IsNotEmpty()
  @IsInt()
  secondPokemonId: number;
}
