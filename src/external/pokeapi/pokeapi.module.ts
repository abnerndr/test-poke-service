import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokeAPIService } from './pokeapi.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [PokeAPIService],
  exports: [PokeAPIService],
})
export class PokeAPIExternalModule {}
