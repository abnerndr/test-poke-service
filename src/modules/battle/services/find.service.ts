import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Battle } from 'src/shared/entities/battles.entity';
import { Repository } from 'typeorm';
import { FindBattleQueryDTO } from '../dto/find-query.dto';
import { BattleResponseDTO } from '../dto/response.dto';
import { BattleMapper } from '../mapper/battle.mapper';

@Injectable()
export class FindBattleService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
  ) {}

  async findAllBattles(
    query: FindBattleQueryDTO,
  ): Promise<BattleResponseDTO[]> {
    const order = query?.order ?? 'desc';
    const limit = query?.limit ?? 20;
    const offset = query?.offset ?? 0;

    const battles = await this.battleRepository.find({
      order: {
        occurredAt: order,
      },
      take: limit,
      skip: offset,
    });
    if (!battles || battles.length === 0) {
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
