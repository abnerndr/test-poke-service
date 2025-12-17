import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CONFIG } from 'src/shared/constants/env';
import { PathUtils } from 'src/shared/utils/path';
import { PokeAPIPokemonDTO } from '../dto';
import { PokeAPIErrorHandler } from '../utils/error-handler';
import { PokeAPIGetAbilityService } from './get-ability.service';

@Injectable()
export class PokeAPIGetPokemonService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly pokeAPIGetAbilityService: PokeAPIGetAbilityService,
  ) {
    this.baseUrl = CONFIG.POKEAPI_BASE_URL;
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
            const abilityIdOrName = PathUtils.getLastPath(abilityUrl);

            if (!abilityIdOrName) {
              return ability;
            }

            const abilityData =
              await this.pokeAPIGetAbilityService.getAbilityByNameOrId(
                abilityIdOrName,
              );
            return {
              ...ability,
              ability_data: abilityData,
            };
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
}
