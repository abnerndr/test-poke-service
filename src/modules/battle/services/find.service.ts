import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Battle } from 'src/shared/entities/battles.entity';
import { Repository } from 'typeorm';
import { BattleResponseDTO } from '../dto/response.dto';
import { BattleMapper } from '../mapper/battle.mapper';

@Injectable()
export class FindBattleService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
  ) {}

  async findAllBattles(): Promise<BattleResponseDTO[]> {
    const battles = await this.battleRepository.find();
    if (!battles) {
      throw new NotFoundException('Nenhuma batalha encontrada');
    }
    return battles.map((battle) => BattleMapper.toDTO(battle));
  }

  async findBattleById(id: string): Promise<BattleResponseDTO> {
    const battle = await this.battleRepository.findOne({ where: { id } });
    if (!battle) {
      throw new NotFoundException('Batalha não encontrada');
    }
    return BattleMapper.toDTO(battle);
  }
}
