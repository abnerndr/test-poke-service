import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CONFIG } from 'src/shared/constants/env';
import { PokeAPIEvolutionChainDTO } from '../dto';
import { PokeAPIErrorHandler } from '../utils/error-handler';

@Injectable()
export class PokeAPIGetEvolutionService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = CONFIG.POKEAPI_BASE_URL;
  }

  async getEvolutionChainById(id: number): Promise<PokeAPIEvolutionChainDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PokeAPIEvolutionChainDTO>(
          `${this.baseUrl}/evolution-chain/${id}`,
        ),
      );

      return response.data;
    } catch (error: unknown) {
      PokeAPIErrorHandler.handle(
        error,
        `A cadeia de evolução "${id}" não foi encontrada`,
        'Erro ao buscar cadeia de evolução da PokeAPI',
      );
    }
  }
}
