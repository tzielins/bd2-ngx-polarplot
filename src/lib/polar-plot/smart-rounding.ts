
export class SmartRounder {

  static round(value: number, base?: number): number {

    base = base || value;
    base = Math.abs(base);

    if (base < 1) {
      return value;
    }

    if (base < 1000) {
      return Math.round(value * 100) / 100;
    }
    return Math.round(value);
  }


}
