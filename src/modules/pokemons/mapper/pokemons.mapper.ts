import { PokeAPIPokemonListDTO } from 'src/external/pokeapi/dto';
import { PokemonListItemDTO, PokemonsDTO } from '../dto';

export class PokemonsMapper {
  private static mapPokemons(
    pokemons: PokeAPIPokemonListDTO,
  ): PokemonListItemDTO[] {
    return pokemons.results.map((pokemon) => {
      const id = Number(pokemon.url?.split('/').filter(Boolean).pop() ?? 0);
      return {
        id,
        name: pokemon.name,
        pictures: [],
      };
    });
  }

  static toDTO(pokemons: PokeAPIPokemonListDTO): PokemonsDTO {
    return {
      count: pokemons.count,
      next: pokemons.next,
      previous: pokemons.previous,
      items: this.mapPokemons(pokemons),
    };
  }
}
