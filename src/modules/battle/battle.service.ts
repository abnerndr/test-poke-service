import { Injectable } from '@nestjs/common';
import { CreateBattleDTO } from './dto/create.dto';
import { FindBattleQueryDTO } from './dto/find-query.dto';
import { BattleResponseDTO } from './dto/response.dto';
import { CreateBattleService } from './services/create.service';
import { FindBattleService } from './services/find.service';

@Injectable()
export class BattleService {
  constructor(
    private readonly createBattleService: CreateBattleService,
    private readonly findBattleService: FindBattleService,
  ) {}

  async createBattle(
    createBattleDTO: CreateBattleDTO,
  ): Promise<BattleResponseDTO> {
    return await this.createBattleService.createBattle(createBattleDTO);
  }

  async findAllBattles(): Promise<BattleResponseDTO[]> {
    return await this.findBattleService.findAllBattles({});
  }

  async findAllBattlesPaginated(
    query: FindBattleQueryDTO,
  ): Promise<BattleResponseDTO[]> {
    return await this.findBattleService.findAllBattles(query);
  }

  async findBattleById(id: string): Promise<BattleResponseDTO> {
    return await this.findBattleService.findBattleById(id);
  }
}
