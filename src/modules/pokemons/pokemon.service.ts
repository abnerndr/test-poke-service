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
import { UrlUtils } from './utils/url';

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
        UrlUtils.getIdFromUrl(pokemon.species.url),
      );

      if (species.evolution_chain?.url) {
        const evolutionChainId = UrlUtils.getIdFromUrl(
          species.evolution_chain.url,
        );
        const evolutionChain = await this.pokeAPIService.getEvolutionChainById(
          Number(evolutionChainId),
        );
        evolutions = await new EvolutionUtils().mapEvolutions(
          evolutionChain,
          this.pokeAPIService,
        );
      }
      if (species.color?.url) {
        const colorIdOrName = UrlUtils.getIdFromUrl(species.color.url);
        color =
          await this.pokeAPIService.getPokemonColorByNameOrId(colorIdOrName);
      }
    } catch {
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
        const nameOrId = UrlUtils.getIdFromUrl(pokemon.url) ?? pokemon.name;
        const pokemonData =
          await this.pokeAPIService.getPokemonByNameOrId(nameOrId);

        let color: PokeAPIPokemonColorDTO | undefined;
        try {
          const species = await this.pokeAPIService.getPokemonSpeciesByNameOrId(
            UrlUtils.getIdFromUrl(pokemonData.species.url),
          );

          if (species.color?.url) {
            const colorIdOrName = UrlUtils.getIdFromUrl(species.color.url);
            color =
              await this.pokeAPIService.getPokemonColorByNameOrId(
                colorIdOrName,
              );
          }
        } catch {
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
      items: items.filter((item) => item !== undefined) as PokemonListItemDTO[],
    };
  }
}
