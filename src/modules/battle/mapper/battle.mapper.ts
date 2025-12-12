import { Battle } from 'src/shared/entities/battles.entity';
import { BattleResponseDTO } from '../dto/response.dto';

export class BattleMapper {
  static toDTO(battle: Battle): BattleResponseDTO {
    return {
      id: battle.id,
      firstPokemonId: battle.firstPokemonId,
      secondPokemonId: battle.secondPokemonId,
      winnerId: battle.winnerId,
      occurredAt: battle.occurredAt,
      metadata: battle.metadata,
    };
  }
}
