import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../src/array-extensions";
import {expect} from "chai";

const testEmptyNumberArray: number[] = []
const testNumberArray = [1, 2, 3, 4, 5]
const testStringArray = ["1", "22", "333", "4444", "55555"]

beforeEach(() => {
  registerKotlinArrayExtensions();
});

describe('Array Statistic Extensions', () => {
  it('should isEmpty()', () => {
    expect(testEmptyNumberArray.isEmpty()).to.eq(true)
  });

  it('should isNotEmpty()', () => {
    expect(testNumberArray.isNotEmpty()).to.eq(true)
    expect(testEmptyNumberArray.isNotEmpty()).to.eq(false)
  });

  it('should count()', () => {
    expect(testNumberArray.count()).to.eq(testNumberArray.length)
    expect(testEmptyNumberArray.count()).to.eq(0)
  });

  it('should count(predicate)', () => {
    expect(testNumberArray.count(it => it % 2 == 0)).to.eq(2)
    expect(testEmptyNumberArray.count(it => it == 100)).to.eq(0)
  });
});