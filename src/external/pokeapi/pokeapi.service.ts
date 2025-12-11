import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CONFIG } from 'src/shared/constants/env';
import { PokeAPIAbilityDTO } from './dto/ability.dto';
import { PokeAPIPokemonListDTO } from './dto/pokemon-list.dto';
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
  ): Promise<PokeAPIPokemonListDTO> {
    try {
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
