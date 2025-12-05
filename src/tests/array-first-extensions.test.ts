import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../array-extensions";
import {expect} from "chai";
import {NullPointerException} from "../exception/NullPointerException";

const testEmptyNumberArray: number[] = []
const testNumberArray = [1, 2, 3, 4, 5]
const testStringArray = ["1", "22", "333", "4444", "55555"]

beforeEach(() => {
  registerKotlinArrayExtensions();
});

describe('Array first() Extensions', () => {
  it('should first()', () => {
    expect(testNumberArray.first()).to.eq(testNumberArray[0])
  });

  it('should first() throws NullPointerException', () => {
    expect(() => testEmptyNumberArray.first())
      .to.throw(NullPointerException)
  });


  it('should first(predicate)', () => {
    expect(testNumberArray.first(it => it == 3))
      .to.eq(testNumberArray[2])
  });

  it('should first(predicate) throws NullPointerException', () => {
    expect(() => testNumberArray.first(it => it == testNumberArray.length + 1))
      .to.throw(NullPointerException)
  });

  it('should firstOrNull()', () => {
    expect(testNumberArray.firstOrNull()).to.eq(testNumberArray[0])
  });

  it('should firstOrNull() returns null', () => {
    expect(testEmptyNumberArray.firstOrNull()).to.eq(null)
  });

  it('should firstOrNull(predicate)', () => {
    expect(testStringArray.firstOrNull(it => it.length == 5))
      .to.eq(testStringArray[4])
  });

  it('should firstOrNull(predicate) returns null', () => {
    expect(testStringArray.firstOrNull(it => it.length == 0))
      .to.eq(null)
  });
});