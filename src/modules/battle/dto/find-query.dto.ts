import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class FindBattleQueryDTO {
  @ApiProperty({
    description: 'The order of the battles',
    example: 'desc',
    required: false,
    default: 'desc',
  })
  @IsOptional()
  @IsEnum(['desc', 'asc'])
  order?: 'desc' | 'asc';

  @ApiProperty({
    description: 'The limit of the battles',
    example: 10,
    required: false,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiProperty({
    description: 'The offset of the battles',
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
