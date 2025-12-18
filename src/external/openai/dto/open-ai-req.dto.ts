import { ApiProperty } from '@nestjs/swagger';

export class OpenAIRequestDTO {
  @ApiProperty({ description: 'The prompt to generate text' })
  prompt: string;

  @ApiProperty({ description: 'The model to use for generation' })
  model: string;
}
