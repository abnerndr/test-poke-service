import { Injectable } from '@nestjs/common';
import { PokeAPIPokemonColorDTO } from 'src/external/pokeapi/dto';
import { PokeAPIService } from 'src/external/pokeapi/pokeapi.service';
import { GetPokemonQueryDTO, PokemonDTO, PokemonEvolutionsDTO } from '../dto';
import { PokemonMapper } from '../mapper/pokemon.mapper';
import { EvolutionUtils } from '../utils/evolution';
import { UrlUtils } from '../utils/url';

@Injectable()
export class GetPokemonService {
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
        evolutions = await EvolutionUtils.mapEvolutions(
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
}
