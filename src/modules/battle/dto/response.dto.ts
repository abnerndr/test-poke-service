import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class BattleResponseDTO {
  @ApiProperty({ description: 'The ID of the battle' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'The ID of the first Pokemon' })
  @IsNotEmpty()
  @IsInt()
  firstPokemonId: number;

  @ApiProperty({ description: 'The ID of the second Pokemon' })
  @IsNotEmpty()
  @IsInt()
  secondPokemonId: number;

  @ApiProperty({ description: 'The ID of the winner Pokemon' })
  @IsNotEmpty()
  @IsInt()
  winnerId: number | null;

  @ApiProperty({ description: 'The occurred at of the battle' })
  @IsNotEmpty()
  @IsDate()
  occurredAt: Date;

  @ApiProperty({ description: 'The metadata of the battle' })
  @IsNotEmpty()
  @IsObject()
  metadata: Record<string, unknown> | null;
}
