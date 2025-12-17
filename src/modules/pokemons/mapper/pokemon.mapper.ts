import { PokeAPIPokemonDTO } from 'src/external/pokeapi/dto';
import { PokeAPIPokemonColorDTO } from 'src/external/pokeapi/dto/pokemon-color.dto';
import { PokemonEvolutionsDTO } from '../dto/pokemon-evolution.dto';
import { PokemonDTO } from '../dto/pokemon.dto';
import { AbilitiesUtils } from '../utils/abilities';
import { ColorUtils } from '../utils/color';
import { SvgUtils } from '../utils/svg';

export class PokemonMapper {
  static toDTO(
    pokemon: PokeAPIPokemonDTO,
    evolutions?: PokemonEvolutionsDTO,
    color?: PokeAPIPokemonColorDTO,
  ): PokemonDTO {
    const bestPictures = SvgUtils.getBestPictures(pokemon.sprites, pokemon.id);
    const abilities = AbilitiesUtils.mapAbilities(pokemon.abilities);
    const mappedColor = ColorUtils.mapColor(color);
    return {
      id: pokemon.id,
      name: pokemon.name,
      pictures: bestPictures,
      species: {
        name: pokemon.species.name,
        url: pokemon.species.url,
      },
      stats: pokemon.stats,
      weight: pokemon.weight,
      height: pokemon.height,
      base_experience: pokemon.base_experience,
      is_default: pokemon.is_default,
      order: pokemon.order,
      abilities,
      evolutions,
      color: mappedColor,
    };
  }
}
