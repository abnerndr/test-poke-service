import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CONFIG } from 'src/shared/constants/env';
import { PokeAPIPokemonSpeciesDTO } from '../dto';
import { PokeAPIErrorHandler } from '../utils/error-handler';

@Injectable()
export class PokeAPIGetSpeciesService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = CONFIG.POKEAPI_BASE_URL;
  }

  async getPokemonSpeciesByNameOrId(
    nameOrId: string,
  ): Promise<PokeAPIPokemonSpeciesDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PokeAPIPokemonSpeciesDTO>(
          `${this.baseUrl}/pokemon-species/${nameOrId.toLowerCase()}`,
        ),
      );

      return response.data;
    } catch (error: unknown) {
      PokeAPIErrorHandler.handle(
        error,
        `A espécie do Pokémon "${nameOrId}" não foi encontrada`,
        'Erro ao buscar dados da espécie do Pokémon da PokeAPI',
      );
    }
  }
}
