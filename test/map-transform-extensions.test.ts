import {beforeEach} from "mocha";
import {expect} from "chai";
import {registerKotlinMapExtensions} from "../src/map-extensions";

const testNumberMap = new Map<number, number>([
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4]
]);

beforeEach(() => {
  registerKotlinMapExtensions();
});

describe('Array Map Transform Extensions', () => {
  it('should mapKeys()', () => {
    const result = testNumberMap.mapKeys(it => `#${it}`)
    expect(result.get('#1')).to.eq(1)
    expect(result.get('#2')).to.eq(2)
    expect(result.get('#3')).to.eq(3)
    expect(result.get('#4')).to.eq(4)
  });

  it('should mapValues()', () => {
    const result = testNumberMap.mapValues(it => `#${it}`)
    expect(result.get(1)).to.eq('#1')
    expect(result.get(2)).to.eq('#2')
    expect(result.get(3)).to.eq('#3')
    expect(result.get(4)).to.eq('#4')
  });
});