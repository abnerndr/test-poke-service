import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class GetPokemonQueryDTO {
  @ApiProperty({
    description: 'The name or ID of the Pokémon to retrieve',
    example: 'pikachu',
  })
  @IsNotEmpty()
  @IsString()
  name_or_id: string;
}

export class GetPokemonsQueryDTO {
  @ApiProperty({
    description: 'The number of results to return per page',
    example: 20,
    required: false,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiProperty({
    description: 'The number of results to skip',
    example: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}
