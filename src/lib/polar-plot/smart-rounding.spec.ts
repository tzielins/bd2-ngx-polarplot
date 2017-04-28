import {SmartRounder} from "./smart-rounding";

describe('SmartRounding', () => {

  it("leaves small numbers untouched", () => {

    let d = [0.0010002, -0.001345445, -0.00000034343];
    let exp = d;

    d.forEach((v, i) => expect(SmartRounder.round(v)).toBe(exp[i]));
  });

  it("leaves numbers up to 1000 with two decimals", () => {

    let d = [1.0010002, -10.201345445, -101.12800000034343, 900, 3];
    let exp = [1, -10.2, -101.13, 900, 3];

    d.forEach((v, i) => expect(SmartRounder.round(v)).toBe(exp[i]));
  });

  it("rounds numbers over 1000 to integer", () => {

    let d = [1000.10002, -1000.201345445, -101111.800000034343, 3000];
    let exp = [1000, -1000, -101112, 3000];

    d.forEach((v, i) => expect(SmartRounder.round(v)).toBe(exp[i]));
  });

});
