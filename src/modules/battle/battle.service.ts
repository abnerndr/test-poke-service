import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeminiService } from 'src/external/gemini/gemini.service';
import { PokeAPIService } from 'src/external/pokeapi/pokeapi.service';
import { Battle } from 'src/shared/entities/battles.entity';
import { Repository } from 'typeorm';
import { CreateBattleDTO } from './dto/create.dto';
import { BattleResponseDTO } from './dto/response.dto';
import { BattleMapper } from './mapper/battle.mapper';
import { BattlePrompt, BattleResult } from './prompts/battle.prompt';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
    private readonly geminiService: GeminiService,
    private readonly pokeAPIService: PokeAPIService,
  ) {}

  async createBattle(
    createBattleDTO: CreateBattleDTO,
  ): Promise<BattleResponseDTO> {
    const firstPokemon = await this.pokeAPIService.getPokemonByNameOrId(
      createBattleDTO.firstPokemonId.toString(),
    );
    const secondPokemon = await this.pokeAPIService.getPokemonByNameOrId(
      createBattleDTO.secondPokemonId.toString(),
    );

    const prompt = BattlePrompt.create(firstPokemon, secondPokemon);

    let battleResult: BattleResult;
    try {
      battleResult = await this.geminiService.generateJson<BattleResult>({
        prompt,
        schemaHint: BattlePrompt.getSchemaHint(),
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao simular batalha com a IA. Tente novamente mais tarde.',
        error instanceof HttpException ? error.getStatus() : 500,
      );
    }

    const validWinnerIds = [firstPokemon.id, secondPokemon.id];
    if (!validWinnerIds.includes(battleResult.winnerId)) {
      throw new BadRequestException(
        `ID do vencedor inválido: ${battleResult.winnerId}. Deve ser ${firstPokemon.id} ou ${secondPokemon.id}`,
      );
    }

    const battle = this.battleRepository.create({
      firstPokemonId: firstPokemon.id,
      secondPokemonId: secondPokemon.id,
      winnerId: battleResult.winnerId,
      metadata: {
        reason: battleResult.reason,
        firstPokemonName: firstPokemon.name,
        secondPokemonName: secondPokemon.name,
      },
    });

    const savedBattle = await this.battleRepository.save(battle);
    return BattleMapper.toDTO(savedBattle);
  }

  async findAllBattles(): Promise<BattleResponseDTO[]> {
    const battles = await this.battleRepository.find();
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
