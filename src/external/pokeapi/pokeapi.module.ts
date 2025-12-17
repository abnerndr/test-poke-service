import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokeAPIService } from './pokeapi.service';
import { PokeAPIFindService } from './services/find.service';
import { PokeAPIGetAbilityService } from './services/get-ability.service';
import { PokeAPIGetColorService } from './services/get-color.service';
import { PokeAPIGetEvolutionService } from './services/get-evolution.service';
import { PokeAPIGetPokemonService } from './services/get-pokemon.service';
import { PokeAPIGetSpeciesService } from './services/get-species.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    PokeAPIService,
    PokeAPIFindService,
    PokeAPIGetAbilityService,
    PokeAPIGetPokemonService,
    PokeAPIGetSpeciesService,
    PokeAPIGetEvolutionService,
    PokeAPIGetColorService,
  ],
  exports: [
    PokeAPIService,
    PokeAPIFindService,
    PokeAPIGetAbilityService,
    PokeAPIGetPokemonService,
    PokeAPIGetSpeciesService,
    PokeAPIGetEvolutionService,
    PokeAPIGetColorService,
  ],
})
export class PokeAPIExternalModule {}
