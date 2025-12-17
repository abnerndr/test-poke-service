import { PokeAPIPokemonColorDTO } from 'src/external/pokeapi/dto';
import { PokemonColorDTO } from '../dto';

export class ColorUtils {
  static mapColor(
    color: PokeAPIPokemonColorDTO | undefined | null,
  ): PokemonColorDTO | undefined {
    if (!color) {
      return undefined;
    }

    return {
      name: color.name,
    };
  }
}
