import { Module } from '@nestjs/common';
import { PokeAPIExternalModule } from 'src/external/pokeapi/pokeapi.module';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { FindPokemonsService } from './services/find-pokemons.service';
import { GetPokemonService } from './services/get-pokemon.service';

@Module({
  imports: [PokeAPIExternalModule],
  controllers: [PokemonController],
  providers: [PokemonService, GetPokemonService, FindPokemonsService],
  exports: [PokemonService, GetPokemonService, FindPokemonsService],
})
export class PokemonModule {}
