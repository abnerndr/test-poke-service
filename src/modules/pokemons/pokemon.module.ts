import { Module } from '@nestjs/common';
import { PokeAPIExternalModule } from 'src/external/pokeapi/pokeapi.module';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [PokeAPIExternalModule],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
