import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../src/array-extensions";
import {expect} from "chai";

const testNumberArray = [1, 2, 3, 4, 5]
const testNullableStringArray = ["1", "22", "333", null, "55555"]

beforeEach(() => {
  registerKotlinArrayExtensions();
});

describe('Array Array Transform Extensions', () => {
  it('should mapIndexed()', () => {
    const result = testNumberArray.mapIndexed((index, it) => `${index}:${it}`)
    expect(result[0]).to.eq("0:1")
  });

  it('should mapNotNull()', () => {
    const result = testNullableStringArray.mapNotNull(it => it)
    expect(result.length).to.eq(4)
  });

  it('should associateBy()', () => {
    const result = testNumberArray.associateBy(it => `#${it}`)
    expect(result.get('#1')).to.eq(1)
    expect(result.get('#2')).to.eq(2)
    expect(result.get('#3')).to.eq(3)
  });

  it('should associateWith()', () => {
    const result = testNumberArray.associateWith(it => `#${it}`)
    expect(result.get(1)).to.eq('#1')
    expect(result.get(2)).to.eq('#2')
    expect(result.get(3)).to.eq('#3')
  });
});