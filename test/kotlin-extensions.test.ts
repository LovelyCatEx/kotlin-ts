// src/test/kotlin-extensions.test.ts
import { beforeEach } from "mocha";
import {registerKotlinExtensions, withScope} from "../src/kotlin-extensions";
import {expect} from "chai";


beforeEach(() => {
  registerKotlinExtensions();
});

describe('Kotlin Extensions', () => {
  it('should let', () => {
    expect("abc".let(it => `#${it}#`)).to.equal("#abc#");
  });

  it('should run', () => {
    expect("abc".run(it => `#${it}#`)).to.equal("#abc#");
  });

  it('should with', () => {
    expect(withScope("abc", it => `#${it}#`)).to.equal("#abc#");
  });

  it('should also', () => {
    const arr: number[] = []
    expect("abc".also(it => {
      arr.push(233)
      return `#${it}#`;
    })).to.equal("abc");

    expect(arr[0]).to.eq(233);
  });

  it('should apply', () => {
    const arr: number[] = []
    arr.applyTo(it => {
      it.push(233);
    })
    expect(arr[0]).to.eq(233);
  });

  it('should takeIf', () => {
    const arr: number[] = [1, 2, 3]
    const r = arr.takeIf(it => it.length == 3)
    expect(r!![0]).to.eq(1)
  });

  it('should takeIf returns null', () => {
    const arr: number[] = [1, 2, 3]
    const r = arr.takeIf(it => it.length == arr.length + 1)
    expect(r).to.eq(null)
  });

  it('should takeUnless', () => {
    const arr2: number[] = [1, 2, 3, 4]
    const r2 = arr2.takeUnless(it => it.length == 2)
    expect(r2!![2]).to.eq(3)
  });

  it('should takeUnless returns null', () => {
    const arr: number[] = [1, 2, 3]
    const r = arr.takeUnless(it => it.length == 3)
    expect(r).to.eq(null)
  });

  it('should withScope', () => {
    const result = withScope("test", it => `#${it}#`)
    expect(result).to.eq("#test#")
  });

  it('should withScope returns undefined(void)', () => {
    expect(withScope("test", () => { return undefined })).to.eq(undefined)
  });
});