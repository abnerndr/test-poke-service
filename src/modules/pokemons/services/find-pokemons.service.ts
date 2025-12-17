import { Injectable } from '@nestjs/common';
import { PokeAPIPokemonColorDTO } from 'src/external/pokeapi/dto';
import { PokeAPIService } from 'src/external/pokeapi/pokeapi.service';
import { GetPokemonsQueryDTO, PokemonListItemDTO, PokemonsDTO } from '../dto';
import { ColorUtils } from '../utils/color';
import { SvgUtils } from '../utils/svg';
import { UrlUtils } from '../utils/url';

@Injectable()
export class FindPokemonsService {
  constructor(private readonly pokeAPIService: PokeAPIService) {}

  async listPokemons(query: GetPokemonsQueryDTO): Promise<PokemonsDTO> {
    const pokemonsList = await this.pokeAPIService.listPokemons(
      query.limit,
      query.offset,
      query.name,
    );

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
          pictures: SvgUtils.getBestPictures(
            pokemonData.sprites,
            pokemonData.id,
          ),
          color: ColorUtils.mapColor(color),
        };
      }),
    );
    return {
      count: pokemonsList.count,
      next: pokemonsList.next,
      previous: pokemonsList.previous,
      items: items.filter((item) => item !== undefined),
    };
  }
}
