import { PokeAPIPokemonDTO } from 'src/external/pokeapi/dto/pokemon.dto';

export interface BattleResult {
  winnerId: number;
  reason: string;
}

export class BattlePrompt {
  private static getHp(pokemon: PokeAPIPokemonDTO): number {
    const hpStat = pokemon.stats.find((stat) => stat.stat.name === 'hp');
    return hpStat?.base_stat ?? 0;
  }

  private static getAbilities(pokemon: PokeAPIPokemonDTO): string[] {
    return pokemon.abilities.map((ability) => ability.ability.name);
  }

  private static formatPokemonData(
    pokemon: PokeAPIPokemonDTO,
    position: 'first' | 'second',
  ): string {
    const hp = this.getHp(pokemon);
    const height = pokemon.height;
    const abilities = this.getAbilities(pokemon).join(', ');

    return `
    ${position === 'first' ? 'POKÉMON 1' : 'POKÉMON 2'}:
    - ID: ${pokemon.id}
    - Nome: ${pokemon.name}
    - Vida (HP): ${hp}
    - Tamanho (altura): ${height} decímetros
    - Habilidades: ${abilities || 'Nenhuma habilidade registrada'}`;
  }

  static create(
    pokemon1: PokeAPIPokemonDTO,
    pokemon2: PokeAPIPokemonDTO,
  ): string {
    const pokemon1Data = this.formatPokemonData(pokemon1, 'first');
    const pokemon2Data = this.formatPokemonData(pokemon2, 'second');

    return `Simule uma batalha Pokémon entre os dois Pokémon abaixo. Analise os dados de cada um (vida, tamanho, habilidades) e determine o vencedor baseado em uma análise estratégica realista.

    ${pokemon1Data}

    ${pokemon2Data}

    Considere:
    - A vida (HP) de cada Pokémon
    - O tamanho pode influenciar na agilidade e força
    - As habilidades podem dar vantagens estratégicas
    - Tipos e compatibilidades (se disponíveis)

    Retorne APENAS um JSON válido com:
    - winnerId: o ID numérico do Pokémon vencedor (${pokemon1.id} ou ${pokemon2.id})
    - reason: uma explicação curta e clara (2-3 frases) do porquê esse Pokémon venceu`;
  }

  static getSchemaHint(): string {
    return JSON.stringify({
      winnerId: 'number',
      reason: 'string',
    });
  }
}
