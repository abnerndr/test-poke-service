import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeminiService } from 'src/external/gemini/gemini.service';
import { OpenAIService } from 'src/external/openai/openai.service';
import { PokeAPIService } from 'src/external/pokeapi/pokeapi.service';
import { CONFIG } from 'src/shared/constants/env';
import { Battle } from 'src/shared/entities/battles.entity';
import { Repository } from 'typeorm';
import { CreateBattleDTO } from '../dto/create.dto';
import { BattleResponseDTO } from '../dto/response.dto';
import { BattleMapper } from '../mapper/battle.mapper';
import { BattlePrompt, BattleResult } from '../prompts/battle.prompt';

@Injectable()
export class CreateBattleService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
    private readonly geminiService: GeminiService,
    private readonly openAIService: OpenAIService,
    private readonly pokeAPIService: PokeAPIService,
  ) {}

  private async validateIfBattleAlreadyExists(
    firstPokemonId: number,
    secondPokemonId: number,
  ): Promise<boolean> {
    const battle = await this.battleRepository.findOne({
      where: { firstPokemonId, secondPokemonId },
    });
    return !!battle;
  }

  private async AISimulateBattle(prompt: string): Promise<BattleResult> {
    try {
      const battleResult = await this.openAIService.generate<BattleResult>({
        prompt,
        model: CONFIG.OPENAI_MODEL,
      });
      // const battleResult = await this.geminiService.generateJson<BattleResult>({
      //   prompt,
      //   schemaHint: BattlePrompt.getSchemaHint(),
      // });
      return battleResult;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao simular batalha com a IA. Tente novamente mais tarde.',
        error instanceof HttpException ? error.getStatus() : 500,
      );
    }
  }

  async createBattle(
    createBattleDTO: CreateBattleDTO,
  ): Promise<BattleResponseDTO> {
    const isBattleAlreadyExists = await this.validateIfBattleAlreadyExists(
      createBattleDTO.firstPokemonId,
      createBattleDTO.secondPokemonId,
    );
    if (isBattleAlreadyExists) {
      throw new BadRequestException('Batalha já existe');
    }
    const firstPokemon = await this.pokeAPIService.getPokemonByNameOrId(
      createBattleDTO.firstPokemonId.toString(),
    );
    const secondPokemon = await this.pokeAPIService.getPokemonByNameOrId(
      createBattleDTO.secondPokemonId.toString(),
    );
    const prompt = BattlePrompt.create(firstPokemon, secondPokemon);
    const battleResult = await this.AISimulateBattle(prompt);
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
        percentage: battleResult.percentage ?? 0,
        percentageLoser: battleResult.percentageLoser ?? 0,
        firstPokemonName: firstPokemon.name,
        secondPokemonName: secondPokemon.name,
      },
    });
    const savedBattle = await this.battleRepository.save(battle);
    return BattleMapper.toDTO(savedBattle);
  }
}
