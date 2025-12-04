import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../array-extensions";
import {expect} from "chai";

const testEmptyNumberArray: number[] = []
const testNumberArray = [1, 2, 3, 4, 5]
const testNullableStringArray = ["1", "22", "333", null, "55555"]

beforeEach(() => {
    registerKotlinArrayExtensions();
});

describe('Array Statistic Extensions', () => {
    it('should mapIndexed()', () => {
        const result = testNumberArray.mapIndexed((index, it) => `${index}:${it}`)
        expect(result[0]).to.eq("0:1")
    });

    it('should mapNotNull()', () => {
        const result = testNullableStringArray.mapNotNull(it => it)
        expect(result.length).to.eq(4)
    });
});