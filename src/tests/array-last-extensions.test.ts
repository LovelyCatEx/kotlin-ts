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

describe('Array last() Extensions', () => {
  it('should last()', () => {
    expect(testNumberArray.last())
      .to.eq(testNumberArray[testNumberArray.length - 1])
  });

  it('should last() throws NullPointerException', () => {
    expect(() => testEmptyNumberArray.last())
      .to.throw(NullPointerException)
  });


  it('should last(predicate)', () => {
    expect(testNumberArray.lastOrNull(it => it % 2 == 1))
      .to.eq(testNumberArray[4])
  });

  it('should last(predicate) throws NullPointerException', () => {
    expect(() => testNumberArray.first(it => it == testNumberArray.length + 1))
      .to.throw(NullPointerException)
  });

  it('should lastOrNull()', () => {
    expect(testNumberArray.lastOrNull()).to.eq(testNumberArray[testNumberArray.length - 1])
  });

  it('should lastOrNull() returns null', () => {
    expect(testEmptyNumberArray.lastOrNull()).to.eq(null)
  });

  it('should lastOrNull(predicate)', () => {
    expect(testStringArray.lastOrNull(it => it.length == 4))
      .to.eq(testStringArray[3])
  });

  it('should lastOrNull(predicate) returns null', () => {
    expect(testStringArray.lastOrNull(it => it.length == 0))
      .to.eq(null)
  });
});