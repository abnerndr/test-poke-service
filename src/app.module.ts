import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './config/database/database.config';
import { BattleModule } from './modules/battle/battle.module';
import { PokemonModule } from './modules/pokemons/pokemon.module';

@Module({
  imports: [DatabaseConfigModule, PokemonModule, BattleModule],
})
export class AppModule {}
