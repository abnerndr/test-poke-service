import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeminiModule } from 'src/external/gemini/gemini.module';
import { OpenAIModule } from 'src/external/openai/openai.module';
import { PokeAPIExternalModule } from 'src/external/pokeapi/pokeapi.module';
import { Battle } from 'src/shared/entities/battles.entity';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { CreateBattleService } from './services/create.service';
import { FindBattleService } from './services/find.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Battle]),
    OpenAIModule,
    GeminiModule,
    PokeAPIExternalModule,
  ],
  controllers: [BattleController],
  providers: [BattleService, CreateBattleService, FindBattleService],
  exports: [BattleService, CreateBattleService, FindBattleService],
})
export class BattleModule {}
