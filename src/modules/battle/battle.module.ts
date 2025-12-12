import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeminiModule } from 'src/external/gemini/gemini.module';
import { PokeAPIExternalModule } from 'src/external/pokeapi/pokeapi.module';
import { Battle } from 'src/shared/entities/battles.entity';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Battle]),
    GeminiModule,
    PokeAPIExternalModule,
  ],
  controllers: [BattleController],
  providers: [BattleService],
  exports: [BattleService],
})
export class BattleModule {}
