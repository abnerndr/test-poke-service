import {
  PokeAPIEvolutionChainDTO,
  PokeAPIPokemonDTO,
} from 'src/external/pokeapi/dto';
import { PokemonAbilityDTO } from '../dto/pokemon-ability.dto';
import { PokemonDTO } from '../dto/pokemon.dto';
import {
  PokemonEvolutionDTO,
  PokemonEvolutionsDTO,
} from '../dto/pokemon-evolution.dto';
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

  private static extractEvolutionSpecies(
    chain: PokeAPIEvolutionChainDTO['chain'],
  ): string[] {
    const species: string[] = [];
    let current: PokeAPIEvolutionChainDTO['chain'] | undefined = chain;

    // Primeiro nível (base)
    if (current.species) {
      const speciesId = current.species.url
        .split('/')
        .filter(Boolean)
        .pop();
      if (speciesId) {
        species.push(speciesId);
      }
    }

    // Segundo nível (primeira evolução)
    if (current.evolves_to && current.evolves_to.length > 0) {
      const firstEvolution = current.evolves_to[0];
      if (firstEvolution.species) {
        const speciesId = firstEvolution.species.url
          .split('/')
          .filter(Boolean)
          .pop();
        if (speciesId) {
          species.push(speciesId);
        }
      }

      // Terceiro nível (segunda evolução)
      if (
        firstEvolution.evolves_to &&
        firstEvolution.evolves_to.length > 0
      ) {
        const secondEvolution = firstEvolution.evolves_to[0];
        if (secondEvolution.species) {
          const speciesId = secondEvolution.species.url
            .split('/')
            .filter(Boolean)
            .pop();
          if (speciesId) {
            species.push(speciesId);
          }
        }
      }
    }

    return species;
  }

  static async mapEvolutions(
    evolutionChain: PokeAPIEvolutionChainDTO,
    pokeAPIService: {
      getPokemonSpeciesByNameOrId: (id: string) => Promise<any>;
      getPokemonByNameOrId: (id: string) => Promise<PokeAPIPokemonDTO>;
    },
  ): Promise<PokemonEvolutionsDTO | undefined> {
    if (!evolutionChain || !evolutionChain.chain) {
      return undefined;
    }

    const speciesIds = this.extractEvolutionSpecies(evolutionChain.chain);
    if (speciesIds.length === 0) {
      return undefined;
    }

    const svgUtils = new SvgUtils();
    const evolutions: PokemonEvolutionsDTO = {};

    try {
      // Buscar dados de cada espécie na cadeia de evolução
      const evolutionPromises = speciesIds.map(async (speciesId) => {
        const species = await pokeAPIService.getPokemonSpeciesByNameOrId(
          speciesId,
        );
        // Pegar o primeiro variety (forma padrão)
        const defaultVariety = species.varieties?.find(
          (v: any) => v.is_default === true,
        ) || species.varieties?.[0];

        if (!defaultVariety) {
          return null;
        }

        const pokemonId = defaultVariety.pokemon.url
          .split('/')
          .filter(Boolean)
          .pop();

        if (!pokemonId) {
          return null;
        }

        const pokemon = await pokeAPIService.getPokemonByNameOrId(pokemonId);
        const pictures = svgUtils.getBestPictures(pokemon.sprites, pokemon.id);

        return {
          id: pokemon.id,
          name: pokemon.name,
          pictures,
        } as PokemonEvolutionDTO;
      });

      const evolutionResults = await Promise.all(evolutionPromises);
      const validEvolutions = evolutionResults.filter(
        (e) => e !== null,
      ) as PokemonEvolutionDTO[];

      if (validEvolutions.length > 0) {
        evolutions.first = validEvolutions[0];
      }
      if (validEvolutions.length > 1) {
        evolutions.second = validEvolutions[1];
      }
      if (validEvolutions.length > 2) {
        evolutions.third = validEvolutions[2];
      }

      return Object.keys(evolutions).length > 0 ? evolutions : undefined;
    } catch {
      return undefined;
    }
  }

  static toDTO(
    pokemon: PokeAPIPokemonDTO,
    evolutions?: PokemonEvolutionsDTO,
  ): PokemonDTO {
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
      evolutions,
    };
  }
}
