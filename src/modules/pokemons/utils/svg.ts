/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PokeAPIPokemonDTO } from 'src/external/pokeapi/dto';
import { PokemonPictureDTO } from '../dto';

export class SvgUtils {
  private static readonly svgUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world`;

  static getSvgUrl(pokemonId: number): string {
    return `${SvgUtils.svgUrl}/${pokemonId}.svg`;
  }

  static isSvg(url: string): boolean {
    return url.toLowerCase().endsWith('.svg');
  }

  static getBestPictures(
    sprites: PokeAPIPokemonDTO['sprites'],
    pokemonId: number,
  ): PokemonPictureDTO[] {
    const pictures: PokemonPictureDTO[] = [];

    const svgUrl = this.getSvgUrl(pokemonId);
    pictures.push({ url: svgUrl });

    const oldGenSprite =
      (sprites as any).versions?.['generation-i']?.['red-blue']
        ?.front_default ||
      (sprites as any).versions?.['generation-i']?.['red-blue']?.front_gray;

    const newGenSprite =
      (sprites as any).other?.['official-artwork']?.front_default ||
      sprites.front_default;

    if (oldGenSprite && !pictures.find((p) => p.url === oldGenSprite)) {
      pictures.push({ url: oldGenSprite });
    }

    if (newGenSprite && !pictures.find((p) => p.url === newGenSprite)) {
      pictures.push({ url: newGenSprite });
    }

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
