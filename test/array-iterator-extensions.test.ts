import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../src";
import {expect} from "chai";

const testEmptyNumberArray: number[] = []
const testNumberArray = [1, 2, 3, 4, 5]
const testNullableStringArray = ["1", "22", "333", null, "55555"]

beforeEach(() => {
  registerKotlinArrayExtensions();
});

describe('Array Iterator Extensions', () => {
  it('should all() returns true', () => {
    const result = testNumberArray.all(it => it > 0)
    expect(result).to.eq(true)
  });

  it('should all() returns false', () => {
    const result = testNumberArray.all(it => it < 3)
    expect(result).to.eq(false)
  });

  it('should any() returns true', () => {
    const result = testNullableStringArray.any(it => it == null)
    expect(result).to.eq(true)
  });

  it('should any() returns false', () => {
    const result = testNumberArray.any(it => it < 0)
    expect(result).to.eq(false)
  });
});