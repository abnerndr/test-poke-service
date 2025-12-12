import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BattleService } from './battle.service';
import { CreateBattleDTO } from './dto/create.dto';
import { BattleResponseDTO } from './dto/response.dto';

@ApiTags('Battle')
@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Batalha criada com sucesso',
    type: BattleResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar batalha - dados inválidos',
  })
  @ApiResponse({
    status: 429,
    description: 'Cota da API do Gemini excedida. Tente novamente mais tarde.',
  })
  @ApiResponse({
    status: 503,
    description:
      'Serviço do Gemini temporariamente indisponível. Modelo sobrecarregado. Tente novamente em alguns instantes.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao criar batalha',
  })
  async createBattle(
    @Body() createBattleDTO: CreateBattleDTO,
  ): Promise<BattleResponseDTO> {
    return this.battleService.createBattle(createBattleDTO);
  }

  @Get('list')
  @ApiResponse({
    status: 200,
    description: 'Lista de batalhas encontrada com sucesso',
    type: [BattleResponseDTO],
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar lista de batalhas',
  })
  async findAllBattles(): Promise<BattleResponseDTO[]> {
    return this.battleService.findAllBattles();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Batalha encontrada com sucesso',
    type: BattleResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Batalha não encontrada',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar batalha',
  })
  async findBattleById(@Param('id') id: string): Promise<BattleResponseDTO> {
    return this.battleService.findBattleById(id);
  }
}
