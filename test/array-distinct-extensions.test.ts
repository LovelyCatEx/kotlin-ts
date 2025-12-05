import {beforeEach} from "mocha";
import {expect} from "chai";
import {registerAllKotlinModules} from "../src";

const testEmptyNumberArray: number[] = []
const testNumberArray = [1, 2, 3, 4, 5, 5, 2, 1, 6, 8, 9, 9, 7]
const testObjectArray = [
  {
    id: 1,
    name: 'Alice'
  },
  {
    id: 2,
    name: 'Bob'
  },
  {
    id: 2,
    name: 'Bob Copy'
  },
  {
    id: 3,
    name: 'Brown'
  }
]
const testEmptyObjectArray: {id: number; name: string}[] = []

beforeEach(() => {
  registerAllKotlinModules();
});

describe('Array distinct() Extensions', () => {
  it('should distinct()', () => {
    const result = testNumberArray.distinct()
    expect(result.length).to.eq(9)
    expect(result[5]).to.eq(6)
    expect(result[6]).to.eq(8)
  });

  it('should distinct() empty array', () => {
    const result = testEmptyNumberArray.distinct()
    expect(result.length).to.eq(0)
  });

  it('should distinctBy()', () => {
    const result = testObjectArray.distinctBy(it => it.id)
    expect(result.length).to.eq(3)
    expect(result[2].name).to.eq(testObjectArray[3].name)
  });

  it('should distinctBy() empty array', () => {
    const result = testEmptyObjectArray.distinctBy(it => it.id)
    expect(result.length).to.eq(0)
  });
});