import { PokeAPIPokemonDTO } from 'src/external/pokeapi/dto';
import { PokemonAbilityDTO } from '../dto/pokemon-ability.dto';
import { PokemonDTO } from '../dto/pokemon.dto';
import { SvgUtils } from '../utils/svg';

export class PokemonMapper {
  private static mapAbilities(
    abilities: PokeAPIPokemonDTO['abilities'],
  ): PokemonAbilityDTO[] {
    if (!abilities || abilities.length === 0) {
      return [];
    }

    return abilities
      .map((ability) => {
        const abilityData = ability.ability_data;
        if (!abilityData) {
          return {
            name: ability.ability.name,
            is_hidden: ability.is_hidden,
            slot: ability.slot,
          };
        }

        // Busca o efeito em inglês
        const englishEffect = abilityData.effect_entries?.find(
          (effect) => effect.language.name === 'en',
        );

        return {
          name: ability.ability.name,
          is_hidden: ability.is_hidden,
          slot: ability.slot,
          effect: englishEffect?.effect,
          short_effect: englishEffect?.short_effect,
        };
      })
      .filter((ability) => ability !== null);
  }

  static toDTO(pokemon: PokeAPIPokemonDTO): PokemonDTO {
    const svgUtils = new SvgUtils();
    const bestPictures = svgUtils.getBestPictures(pokemon.sprites, pokemon.id);
    const abilities = this.mapAbilities(pokemon.abilities);

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
    };
  }
}
