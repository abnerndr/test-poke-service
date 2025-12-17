import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CONFIG } from 'src/shared/constants/env';
import { PokeAPIAbilityDTO } from './dto/ability.dto';
import { PokeAPIEvolutionChainDTO } from './dto/evolution-chain.dto';
import { PokeAPIPokemonColorDTO } from './dto/pokemon-color.dto';
import { PokeAPIPokemonListDTO } from './dto/pokemon-list.dto';
import { PokeAPIPokemonSpeciesDTO } from './dto/pokemon-species.dto';
import { PokeAPIPokemonDTO } from './dto/pokemon.dto';
import { PokeAPIErrorHandler } from './utils/error-handler';

@Injectable()
export class PokeAPIService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = CONFIG.POKEAPI_BASE_URL;
  }

  async getAbilityByNameOrId(nameOrId: string): Promise<PokeAPIAbilityDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PokeAPIAbilityDTO>(
          `${this.baseUrl}/ability/${nameOrId.toLowerCase()}`,
        ),
      );

      return response.data;
    } catch (error: unknown) {
      PokeAPIErrorHandler.handle(
        error,
        `A habilidade "${nameOrId}" não foi encontrada`,
        'Erro ao buscar dados da habilidade da PokeAPI',
      );
    }
  }

  async getPokemonByNameOrId(nameOrId: string): Promise<PokeAPIPokemonDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PokeAPIPokemonDTO>(
          `${this.baseUrl}/pokemon/${nameOrId.toLowerCase()}`,
        ),
      );

      const pokemon = response.data;

      if (pokemon.abilities && pokemon.abilities.length > 0) {
        const abilityPromises = pokemon.abilities.map(async (ability) => {
          try {
            const abilityUrl = ability.ability.url;
            const abilityIdOrName = abilityUrl.split('/').filter(Boolean).pop();

            if (abilityIdOrName) {
              const abilityData =
                await this.getAbilityByNameOrId(abilityIdOrName);
              return {
                ...ability,
                ability_data: abilityData,
              };
            }
            return ability;
          } catch {
            return ability;
          }
        });

        pokemon.abilities = await Promise.all(abilityPromises);
      }

      return pokemon;
    } catch (error: unknown) {
      PokeAPIErrorHandler.handle(
        error,
        `O Pokémon "${nameOrId}" não foi encontrado`,
        'Erro ao buscar dados do Pokémon da PokeAPI',
      );
    }
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
