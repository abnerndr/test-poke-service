import { Injectable } from '@nestjs/common';
import { PokeAPIService } from 'src/external/pokeapi/pokeapi.service';
import {
  GetPokemonQueryDTO,
  GetPokemonsQueryDTO,
  PokemonDTO,
  PokemonListItemDTO,
  PokemonsDTO,
} from './dto';
import { PokemonMapper } from './mapper/pokemon.mapper';
import { SvgUtils } from './utils/svg';

@Injectable()
export class PokemonService {
  constructor(private readonly pokeAPIService: PokeAPIService) {}

  async getPokemon(query: GetPokemonQueryDTO): Promise<PokemonDTO> {
    const pokemon = await this.pokeAPIService.getPokemonByNameOrId(
      query.name_or_id,
    );
    return PokemonMapper.toDTO(pokemon);
  }

  async listPokemons(query: GetPokemonsQueryDTO): Promise<PokemonsDTO> {
    const pokemonsList = await this.pokeAPIService.listPokemons(
      query.limit,
      query.offset,
    );

    const svgUtils = new SvgUtils();

    const items: PokemonListItemDTO[] = await Promise.all(
      pokemonsList.results.map(async (pokemon) => {
        const nameOrId =
          pokemon.url?.split('/').filter(Boolean).pop() ?? pokemon.name;
        const pokemonData =
          await this.pokeAPIService.getPokemonByNameOrId(nameOrId);

        return {
          id: pokemonData.id,
          name: pokemonData.name,
          pictures: svgUtils.getBestPictures(
            pokemonData.sprites,
            pokemonData.id,
          ),
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
