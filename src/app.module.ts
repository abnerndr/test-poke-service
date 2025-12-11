import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './config/database/database.config';
import { PokemonModule } from './modules/pokemons/pokemon.module';

@Module({
  imports: [DatabaseConfigModule, PokemonModule],
})
export class AppModule {}
