import { Injectable } from '@nestjs/common';
import { PokeAPIPokemonColorDTO } from 'src/external/pokeapi/dto';
import { PokeAPIService } from 'src/external/pokeapi/pokeapi.service';
import {
  GetPokemonQueryDTO,
  GetPokemonsQueryDTO,
  PokemonDTO,
  PokemonEvolutionsDTO,
  PokemonListItemDTO,
  PokemonsDTO,
} from './dto';
import { PokemonMapper } from './mapper/pokemon.mapper';
import { ColorUtils } from './mapper/utils/color';
import { EvolutionUtils } from './mapper/utils/evolution';
import { SvgUtils } from './mapper/utils/svg';

@Injectable()
export class PokemonService {
  constructor(private readonly pokeAPIService: PokeAPIService) {}

  async getPokemon(query: GetPokemonQueryDTO): Promise<PokemonDTO> {
    const pokemon = await this.pokeAPIService.getPokemonByNameOrId(
      query.name_or_id,
    );

    let evolutions: PokemonEvolutionsDTO | undefined;
    let color: PokeAPIPokemonColorDTO | undefined;
    try {
      const species = await this.pokeAPIService.getPokemonSpeciesByNameOrId(
        pokemon.species.url.split('/').filter(Boolean).pop() ?? '',
      );

      // Buscar cadeia de evolução
      if (species.evolution_chain?.url) {
        const evolutionChainId = species.evolution_chain.url
          .split('/')
          .filter(Boolean)
          .pop();

        if (evolutionChainId) {
          const evolutionChain =
            await this.pokeAPIService.getEvolutionChainById(
              Number(evolutionChainId),
            );

          evolutions = await new EvolutionUtils().mapEvolutions(
            evolutionChain,
            this.pokeAPIService,
          );
        }
      }
      if (species.color?.url) {
        const colorIdOrName = species.color.url
          .split('/')
          .filter(Boolean)
          .pop();

        if (colorIdOrName) {
          try {
            color =
              await this.pokeAPIService.getPokemonColorByNameOrId(
                colorIdOrName,
              );
          } catch {
            // Se não conseguir buscar cor, continua sem ela
            color = undefined;
          }
        }
      }
    } catch {
      // Se não conseguir buscar espécie, continua sem evoluções e cor
      evolutions = undefined;
      color = undefined;
    }

    return PokemonMapper.toDTO(pokemon, evolutions, color);
  }

  async listPokemons(query: GetPokemonsQueryDTO): Promise<PokemonsDTO> {
    const pokemonsList = await this.pokeAPIService.listPokemons(
      query.limit,
      query.offset,
      query.name,
    );

    const svgUtils = new SvgUtils();
    const colorUtils = new ColorUtils();

    const items: PokemonListItemDTO[] = await Promise.all(
      pokemonsList.results.map(async (pokemon) => {
        const nameOrId =
          pokemon.url?.split('/').filter(Boolean).pop() ?? pokemon.name;
        const pokemonData =
          await this.pokeAPIService.getPokemonByNameOrId(nameOrId);

        // Buscar cor do pokemon
        let color: PokeAPIPokemonColorDTO | undefined;
        try {
          const species = await this.pokeAPIService.getPokemonSpeciesByNameOrId(
            pokemonData.species.url.split('/').filter(Boolean).pop() ?? '',
          );

          if (species.color?.url) {
            const colorIdOrName = species.color.url
              .split('/')
              .filter(Boolean)
              .pop();

            if (colorIdOrName) {
              try {
                color =
                  await this.pokeAPIService.getPokemonColorByNameOrId(
                    colorIdOrName,
                  );
              } catch {
                // Se não conseguir buscar cor, continua sem ela
                color = undefined;
              }
            }
          }
        } catch {
          // Se não conseguir buscar espécie/cor, continua sem ela
          color = undefined;
        }

        return {
          id: pokemonData.id,
          name: pokemonData.name,
          pictures: svgUtils.getBestPictures(
            pokemonData.sprites,
            pokemonData.id,
          ),
          color: colorUtils.mapColor(color),
        };
      }),
    );

    return {
      count: pokemonsList.count,
      next: pokemonsList.next,
      previous: pokemonsList.previous,
      items,
    };
  }
}
