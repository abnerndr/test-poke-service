import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CONFIG } from 'src/shared/constants/env';
import { PokeAPIPokemonDTO, PokeAPIPokemonListDTO } from '../dto';
import { PokeAPIErrorHandler } from '../utils/error-handler';

@Injectable()
export class PokeAPIFindService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = CONFIG.POKEAPI_BASE_URL;
  }

  async listPokemons(
    limit: number = 20,
    offset: number = 0,
    name?: string,
  ): Promise<PokeAPIPokemonListDTO> {
    try {
      if (name) {
        try {
          const response = await firstValueFrom(
            this.httpService.get<PokeAPIPokemonDTO>(
              `${this.baseUrl}/pokemon/${name.toLowerCase()}`,
            ),
          );

          const pokemon = response.data;
          return {
            count: 1,
            results: [
              {
                name: pokemon.name,
                url: `${this.baseUrl}/pokemon/${pokemon.id}/`,
              },
            ],
          };
        } catch (error: unknown) {
          if (
            error &&
            typeof error === 'object' &&
            'response' in error &&
            error.response &&
            typeof error.response === 'object' &&
            'status' in error.response &&
            error.response.status === 404
          ) {
            return {
              count: 0,
              results: [],
            };
          }
          throw error;
        }
      }

      const response = await firstValueFrom(
        this.httpService.get<PokeAPIPokemonListDTO>(`${this.baseUrl}/pokemon`, {
          params: {
            limit,
            offset,
          },
        }),
      );

      return response.data;
    } catch (error: unknown) {
      PokeAPIErrorHandler.handle(
        error,
        'Lista de Pokémon não encontrada',
        'Erro ao buscar lista de Pokémon da PokeAPI',
      );
    }
  }
}
