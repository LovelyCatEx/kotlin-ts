import {beforeEach} from "mocha";
import {registerKotlinArrayExtensions} from "../array-extensions";
import {expect} from "chai";

const testEmptyNumberArray: number[] = []
const testNumberArray = [1, 2, 3, 4, 5]
const testStringArray = ["1", null, "333", undefined, "55555"]

beforeEach(() => {
    registerKotlinArrayExtensions();
});

describe('Array take() Extensions', () => {
    const testNumberArray = [1, 2, 3, 4, 5];
    const testStringArray = ["1", null, "333", undefined, "55555"];

    beforeEach(() => {
        registerKotlinArrayExtensions();
    });

    it('should take()', () => {
        const result = testNumberArray.take(3);
        expect(result).to.deep.equal([1, 2, 3]);
    });

    it('should take() with n = 0', () => {
        const result = testNumberArray.take(0);
        expect(result).to.deep.equal([]);
    });

    it('should take() with n > array length', () => {
        const result = testNumberArray.take(10);
        expect(result).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should takeWhile() with condition it < 4', () => {
        const result = testNumberArray.takeWhile(it => it < 4);
        expect(result).to.deep.equal([1, 2, 3]);
    });

    it('should takeWhile() with includes check', () => {
        const allowedValues = [1, 2, 3];
        const result = testNumberArray.takeWhile(it => allowedValues.includes(it));
        expect(result).to.deep.equal([1, 2, 3]);
    });

    it('should takeWhile() with first element not matching', () => {
        const result = testNumberArray.takeWhile(it => it > 3);
        expect(result).to.deep.equal([]); // 第一个元素就不满足
    });

    it('should takeWhile() with all elements matching', () => {
        const result = testNumberArray.takeWhile(it => it < 10);
        expect(result).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should takeWhile() with string array', () => {
        const result = testStringArray.takeWhile(it => !!it && it.length > 0);
        expect(result).to.deep.equal(["1"]);
    });
});