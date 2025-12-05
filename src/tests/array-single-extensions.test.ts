import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../array-extensions";
import {expect} from "chai";
import {NullPointerException} from "../exception/NullPointerException";
import {IllegalArgumentException} from "../exception/IllegalArgumentException";

const testEmptyNumberArray: number[] = []
const testNumberArray = [1, 2, 3, 4, 5]
const testSingleNumberArray = [233]
const testStringArray = ["1", "22", "333", "4444", "55555", "4444"]

beforeEach(() => {
  registerKotlinArrayExtensions();
});

describe('Array single() Extensions', () => {
  it('should single()', () => {
    expect(testSingleNumberArray.single())
      .to.eq(233)
  });

  it('should single() throws IllegalArgumentException', () => {
    expect(() => testEmptyNumberArray.single())
      .to.throw(IllegalArgumentException)

    expect(() => testNumberArray.single())
      .to.throw(IllegalArgumentException)
  });

  it('should single(predicate)', () => {
    expect(testNumberArray.single(it => it == 3))
      .to.eq(testNumberArray[2])
  });

  it('should single(predicate) throws IllegalArgumentException', () => {
    expect(() => testNumberArray.single(it => it % 2 == 1))
      .to.throw(IllegalArgumentException)
  });

  it('should singleOrNull()', () => {
    expect(testSingleNumberArray.singleOrNull()).to.eq(233)
  });

  it('should singleOrNull() returns null', () => {
    expect(testNumberArray.singleOrNull()).to.eq(null)
    expect(testEmptyNumberArray.singleOrNull()).to.eq(null)
  });

  it('should singleOrNull(predicate)', () => {
    expect(testStringArray.singleOrNull(it => it.length == 5))
      .to.eq(testStringArray[4])
  });

  it('should singleOrNull(predicate) returns null', () => {
    expect(testStringArray.singleOrNull(it => it.length == 4))
      .to.eq(null)
  });
});