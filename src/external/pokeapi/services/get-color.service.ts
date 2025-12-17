import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CONFIG } from 'src/shared/constants/env';
import { PokeAPIPokemonColorDTO } from '../dto';
import { PokeAPIErrorHandler } from '../utils/error-handler';

@Injectable()
export class PokeAPIGetColorService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = CONFIG.POKEAPI_BASE_URL;
  }

  async getPokemonColorByNameOrId(
    nameOrId: string,
  ): Promise<PokeAPIPokemonColorDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PokeAPIPokemonColorDTO>(
          `${this.baseUrl}/pokemon-color/${nameOrId.toLowerCase()}`,
        ),
      );

      return response.data;
    } catch (error: unknown) {
      PokeAPIErrorHandler.handle(
        error,
        `A cor do Pokémon "${nameOrId}" não foi encontrada`,
        'Erro ao buscar dados da cor do Pokémon da PokeAPI',
      );
    }
  }
}
