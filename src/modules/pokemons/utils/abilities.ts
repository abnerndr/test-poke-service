import { PokeAPIPokemonDTO } from 'src/external/pokeapi/dto';
import { PokemonAbilityDTO } from '../dto';

export class AbilitiesUtils {
  static mapAbilities(
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
}
