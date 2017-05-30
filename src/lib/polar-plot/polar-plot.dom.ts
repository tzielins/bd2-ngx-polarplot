
export class PetalNode {

  peak: number;
  roundedPeak: number;
  width: number;
  radiusScale: number;
  polarAngle: number;
  polarCoordinates: number[];
  petalPath: number[][];

  label: string;
  color: string;
}

export class PolarPoint {
  constructor(public xy: number[], public color: string) {};
}
