import { Injectable } from '@nestjs/common';
import { PokeAPIAbilityDTO } from './dto/ability.dto';
import { PokeAPIEvolutionChainDTO } from './dto/evolution-chain.dto';
import { PokeAPIPokemonColorDTO } from './dto/pokemon-color.dto';
import { PokeAPIPokemonListDTO } from './dto/pokemon-list.dto';
import { PokeAPIPokemonSpeciesDTO } from './dto/pokemon-species.dto';
import { PokeAPIPokemonDTO } from './dto/pokemon.dto';
import { PokeAPIFindService } from './services/find.service';
import { PokeAPIGetAbilityService } from './services/get-ability.service';
import { PokeAPIGetColorService } from './services/get-color.service';
import { PokeAPIGetEvolutionService } from './services/get-evolution.service';
import { PokeAPIGetPokemonService } from './services/get-pokemon.service';
import { PokeAPIGetSpeciesService } from './services/get-species.service';

@Injectable()
export class PokeAPIService {
  constructor(
    private readonly pokeAPIFindService: PokeAPIFindService,
    private readonly pokeAPIGetAbilityService: PokeAPIGetAbilityService,
    private readonly pokeAPIGetPokemonService: PokeAPIGetPokemonService,
    private readonly pokeAPIGetSpeciesService: PokeAPIGetSpeciesService,
    private readonly pokeAPIGetEvolutionService: PokeAPIGetEvolutionService,
    private readonly pokeAPIGetColorService: PokeAPIGetColorService,
  ) {}

  async getAbilityByNameOrId(nameOrId: string): Promise<PokeAPIAbilityDTO> {
    return await this.pokeAPIGetAbilityService.getAbilityByNameOrId(nameOrId);
  }

  async getPokemonByNameOrId(nameOrId: string): Promise<PokeAPIPokemonDTO> {
    return await this.pokeAPIGetPokemonService.getPokemonByNameOrId(nameOrId);
  }

  async listPokemons(
    limit: number = 20,
    offset: number = 0,
    name?: string,
  ): Promise<PokeAPIPokemonListDTO> {
    return await this.pokeAPIFindService.listPokemons(limit, offset, name);
  }

  async getPokemonSpeciesByNameOrId(
    nameOrId: string,
  ): Promise<PokeAPIPokemonSpeciesDTO> {
    return await this.pokeAPIGetSpeciesService.getPokemonSpeciesByNameOrId(
      nameOrId,
    );
  }

  async getEvolutionChainById(id: number): Promise<PokeAPIEvolutionChainDTO> {
    return await this.pokeAPIGetEvolutionService.getEvolutionChainById(id);
  }

  async getPokemonColorByNameOrId(
    nameOrId: string,
  ): Promise<PokeAPIPokemonColorDTO> {
    return await this.pokeAPIGetColorService.getPokemonColorByNameOrId(
      nameOrId,
    );
  }
}
