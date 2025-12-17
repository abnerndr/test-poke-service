import { Injectable } from '@nestjs/common';
import {
  GetPokemonQueryDTO,
  GetPokemonsQueryDTO,
  PokemonDTO,
  PokemonsDTO,
} from './dto';
import { FindPokemonsService } from './services/find-pokemons.service';
import { GetPokemonService } from './services/get-pokemon.service';

@Injectable()
export class PokemonService {
  constructor(
    private readonly getPokemonService: GetPokemonService,
    private readonly findPokemonsService: FindPokemonsService,
  ) {}

  async getPokemon(query: GetPokemonQueryDTO): Promise<PokemonDTO> {
    return await this.getPokemonService.getPokemon(query);
  }

  async listPokemons(query: GetPokemonsQueryDTO): Promise<PokemonsDTO> {
    return await this.findPokemonsService.listPokemons(query);
  }
}
