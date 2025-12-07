import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../src";
import {expect} from "chai";

const testEmptyNumberArray: number[] = []
const testNumberArray = [1, 2, 3, 4, 5]
const testStringArray = ["1", null, "333", undefined, "55555"]

beforeEach(() => {
  registerKotlinArrayExtensions();
});

describe('Array filter() Extensions', () => {
  it('should filterIndexed()', () => {
    const indexes: number[] = []
    const result = testNumberArray.filterIndexed((index, it) => {
      indexes.push(index)
      return it % 2 == 0
    })
    expect(indexes.length).to.eq(testNumberArray.length)
    expect(result.length).to.eq(2)
  });

  it('should filterNot()', () => {
    const result = testNumberArray.filterNot(it => {
      return it % 2 == 0
    })
    expect(result.length).to.eq(3)
  });


  it('should filterNotIndexed()', () => {
    const indexes: number[] = []
    const result = testNumberArray.filterNotIndexed((index, it) => {
      indexes.push(index)
      return it % 2 == 0
    })
    expect(indexes.length).to.eq(testNumberArray.length)
    expect(result.length).to.eq(3)
  });

  it('should filterNotNull()', () => {
    const result = testStringArray.filterNotNull()
    expect(result.length).to.eq(3)
    expect(result[2]).to.eq(testStringArray[4])
  });
});