import {d3} from "../d3service";

export class BD2ColorPalette {

  static extendPalette(palette: string[], size: number): string[] {

    if (!palette || palette.length === 0) {
      palette = ['black'];
    }

    let out = [];
    for (let i = 0; i < size; i++) {
      out.push(palette[i % palette.length]);
    }
    return out;

  }

  static palette(size: number): string[] {

    if (size <= d3.schemeCategory10.length) {
      return BD2ColorPalette.extendPalette(d3.schemeCategory10, size);
    } else {
      return BD2ColorPalette.extendPalette(d3.schemeCategory20, size);
    }

  }
}
