import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PokeAPIPokemonDTO } from '../../external/pokeapi/dto/pokemon.dto';
import { PokemonDTO, PokemonsDTO } from './dto';
import {
  GetPokemonQueryDTO,
  GetPokemonsQueryDTO,
} from './dto/get-pokemon-query.dto';
import { PokemonService } from './pokemon.service';

@ApiTags('Pokemon ')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name_or_id')
  @ApiResponse({
    status: 200,
    description: 'Pokémon encontrado com sucesso',
    type: PokeAPIPokemonDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon não encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar dados do Pokémon da PokeAPI',
  })
  async getPokemon(@Param() query: GetPokemonQueryDTO): Promise<PokemonDTO> {
    return this.pokemonService.getPokemon(query);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de Pokémon encontrada com sucesso',
    type: PokemonsDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar lista de Pokémon',
  })
  async listPokemons(
    @Query()
    query: GetPokemonsQueryDTO = {
      limit: 20,
      offset: 0,
    },
  ): Promise<PokemonsDTO> {
    return this.pokemonService.listPokemons(query);
  }
}
