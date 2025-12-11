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

    const svgUrl = this.getSvgUrl(pokemonId);
    pictures.push({ url: svgUrl });

    const priorityOrder = [
      sprites.front_default,
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

    return pictures;
  }
}
