/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  PokeAPIEvolutionChainDTO,
  PokeAPIPokemonDTO,
  PokeAPIPokemonSpeciesDTO,
} from 'src/external/pokeapi/dto';
import { PokemonEvolutionDTO, PokemonEvolutionsDTO } from '../dto';
import { SvgUtils } from './svg';

export class EvolutionUtils {
  private static extractEvolutionSpecies(
    chain: PokeAPIEvolutionChainDTO['chain'],
  ): string[] {
    const species: string[] = [];
    const current = chain;

    // Primeiro nível (base)
    if (current.species) {
      const speciesId = current.species.url.split('/').filter(Boolean).pop();
      if (speciesId) {
        species.push(speciesId);
      }
    }

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

      if (firstEvolution.evolves_to && firstEvolution.evolves_to.length > 0) {
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
      getPokemonSpeciesByNameOrId: (
        id: string,
      ) => Promise<PokeAPIPokemonSpeciesDTO>;
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

    const evolutions: PokemonEvolutionsDTO = {};

    try {
      const evolutionPromises = speciesIds.map(async (speciesId) => {
        const species =
          await pokeAPIService.getPokemonSpeciesByNameOrId(speciesId);
        const defaultVariety =
          species.varieties?.find((v: any) => v.is_default === true) ||
          species.varieties?.[0];

        if (!defaultVariety) {
          return null;
        }

        const pokemonId = defaultVariety.pokemon.url
          .split('/')
          .filter(Boolean)
          .pop();

        if (!pokemonId || typeof pokemonId !== 'string') {
          return null;
        }

        const pokemon = await pokeAPIService.getPokemonByNameOrId(pokemonId);
        const pictures = SvgUtils.getBestPictures(pokemon.sprites, pokemon.id);

        return {
          id: pokemon.id,
          name: pokemon.name,
          pictures,
        } as PokemonEvolutionDTO;
      });

      const evolutionResults = await Promise.all(evolutionPromises);
      const validEvolutions = evolutionResults.filter((e) => e !== null);

      if (validEvolutions.length > 0) {
        evolutions.first = validEvolutions[0] ?? undefined;
      }
      if (validEvolutions.length > 1) {
        evolutions.second = validEvolutions[1] ?? undefined;
      }

      if (validEvolutions.length > 2) {
        evolutions.third = validEvolutions[2] ?? undefined;
      }

      return Object.keys(evolutions).length > 0 ? evolutions : undefined;
    } catch {
      return undefined;
    }
  }
}
