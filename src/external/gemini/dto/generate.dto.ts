import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GenerateTextRequestDTO {
  @ApiProperty({ description: 'The prompt to generate text' })
  prompt: string;

  @ApiProperty({
    description: 'The model to use for generation',
    required: false,
  })
  @IsOptional()
  @IsString()
  model?: string;
}

export class GenerateJsonRequestDTO extends GenerateTextRequestDTO {
  @ApiProperty({
    description:
      'Optional hint of the expected JSON shape. Ex: {"winner":"string","turns":"number"}',
    required: false,
  })
  @IsOptional()
  @IsString()
  schemaHint?: string;
}
