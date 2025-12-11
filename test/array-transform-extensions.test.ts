import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../src";
import {expect} from "chai";

const testNumberArray = [1, 2, 3, 4, 5]
const testNullableStringArray = ["1", "22", "333", null, "55555"]

const testNumberMatrix = [[1, 2], [3, 4], [5, 6]]
const testNullableNumberMatrix = [null, [3, 4], [5, 6], null, [7, 8]]

beforeEach(() => {
  registerKotlinArrayExtensions();
});

describe('Array Transform Extensions', () => {
  it('should mapIndexed()', () => {
    const indexes: number[] = []
    const result = testNumberArray.mapIndexed((index, it) => {
      indexes.push(index);
      return `${index}:${it}`
    })
    expect(indexes.length).to.eq(testNumberArray.length)
    expect(indexes[3]).to.eq(3)
    expect(result[0]).to.eq("0:1")
  });

  it('should mapNotNull()', () => {
    const result = testNullableStringArray.mapNotNull(it => it)
    expect(result.length).to.eq(4)
  });

  it('should flatMapIndexed()', () => {
    const indexes: number[] = []
    const result = testNumberMatrix.flatMapIndexed((index, it) => {
      indexes.push(index);
      return it.map(it => it + 1)
    })
    expect(indexes.length).to.eq(3)
    expect(indexes[2]).to.eq(2)
    expect(result[0]).to.eq(2)
    expect(result[3]).to.eq(5)
  });

  it('should flatMapNotNull()', () => {
    const result = testNullableNumberMatrix.flatMapNotNull(it => it)
    expect(result[0]).to.eq(3)
    expect(result[1]).to.eq(4)
    expect(result[2]).to.eq(5)
    expect(result[3]).to.eq(6)
    expect(result[4]).to.eq(7)
    expect(result[5]).to.eq(8)
  });

  it('should flatten()', () => {
    const result = testNumberMatrix.flatten()
    expect(result.length).to.eq(6)
    expect(result[2]).to.eq(3)
    expect(result[5]).to.eq(6)
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

  it('should groupBy()', () => {
    const array = [
      { key: 1, content: 'A1' },
      { key: 1, content: 'A2' },
      { key: 1, content: 'A3' },
      { key: 2, content: 'B1' },
      { key: 2, content: 'B2' },
      { key: 3, content: 'C1' }
    ];

    const result = array.groupBy(it => `#${it.key}`);

    const g1 = result.get('#1')!;
    const g2 = result.get('#2')!;
    const g3 = result.get('#3')!;

    expect(g1.length).to.eq(3);
    expect(g1[1].content).to.eq('A2');

    expect(g2.length).to.eq(2);
    expect(g2[1].content).to.eq('B2');

    expect(g3.length).to.eq(1);
    expect(g3[0].content).to.eq('C1');
  });
});