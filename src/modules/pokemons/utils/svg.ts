import { PokeAPIPokemonDTO } from 'src/external/pokeapi/dto';
import { PokemonPictureDTO } from '../dto';

export class SvgUtils {
  private readonly svgUrl: string;

  constructor() {
    this.svgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world`;
  }

  public getSvgUrl(pokemonId: number): string {
    return `${this.svgUrl}/${pokemonId}.svg`;
  }

  public isSvg(url: string): boolean {
    return url.toLowerCase().endsWith('.svg');
  }

  public getBestPictures(
    sprites: PokeAPIPokemonDTO['sprites'],
    pokemonId: number,
  ): PokemonPictureDTO[] {
    const pictures: PokemonPictureDTO[] = [];

    // Sempre incluir SVG do dream-world
    const svgUrl = this.getSvgUrl(pokemonId);
    pictures.push({ url: svgUrl });

    // Buscar imagem da geração antiga (Red/Blue)
    const oldGenSprite =
      (sprites as any).versions?.['generation-i']?.['red-blue']
        ?.front_default ||
      (sprites as any).versions?.['generation-i']?.['red-blue']
        ?.front_gray;

    // Buscar imagem da geração nova (official-artwork ou front_default)
    const newGenSprite =
      (sprites as any).other?.['official-artwork']?.front_default ||
      sprites.front_default;

    // Adicionar imagem da geração antiga se disponível
    if (oldGenSprite && !pictures.find((p) => p.url === oldGenSprite)) {
      pictures.push({ url: oldGenSprite });
    }

    // Adicionar imagem da geração nova se disponível
    if (newGenSprite && !pictures.find((p) => p.url === newGenSprite)) {
      pictures.push({ url: newGenSprite });
    }

    // Se ainda não tiver 3 imagens, adicionar outras disponíveis
    const priorityOrder = [
      sprites.front_shiny,
      sprites.front_female,
      sprites.back_default,
      sprites.back_shiny,
      sprites.back_female,
      sprites.front_shiny_female,
      sprites.back_shiny_female,
    ];

    for (const url of priorityOrder) {
      if (url && !pictures.find((p) => p.url === url) && !this.isSvg(url)) {
        pictures.push({ url });
        if (pictures.length >= 3) {
          break;
        }
      }
    }

    return pictures.slice(0, 3);
  }
}
