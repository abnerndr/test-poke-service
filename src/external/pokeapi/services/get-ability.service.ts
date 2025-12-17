import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CONFIG } from 'src/shared/constants/env';
import { PokeAPIAbilityDTO } from '../dto';
import { PokeAPIErrorHandler } from '../utils/error-handler';

@Injectable()
export class PokeAPIGetAbilityService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = CONFIG.POKEAPI_BASE_URL;
  }

  async getAbilityByNameOrId(nameOrId: string): Promise<PokeAPIAbilityDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PokeAPIAbilityDTO>(
          `${this.baseUrl}/ability/${nameOrId.toLowerCase()}`,
        ),
      );

      return response.data;
    } catch (error: unknown) {
      PokeAPIErrorHandler.handle(
        error,
        `A habilidade "${nameOrId}" não foi encontrada`,
        'Erro ao buscar dados da habilidade da PokeAPI',
      );
    }
  }
}
