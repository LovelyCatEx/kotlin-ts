import {beforeEach} from "mocha";
import {registerArrayPromiseFunctions} from "../src";
import {expect} from "chai";

beforeEach(() => {
  registerArrayPromiseFunctions()
})

describe('Array Promise', () => {
  it('should promiseAll()', async () => {
    const promises: Promise<number>[] = [1, 2, 3, 4].map(
      async (it) => Promise.resolve(it * it)
    );

    const result = await promises.promiseAll();
    expect(result[0]).to.eq(1);
    expect(result[1]).to.eq(4);
    expect(result[2]).to.eq(9);
    expect(result[3]).to.eq(16);
  });

  it('should promiseRace() - return fastest promise', async () => {
    const slowPromise = new Promise<number>((resolve) =>
      setTimeout(() => resolve(100), 100)
    );

    const fastPromise = new Promise<number>((resolve) =>
      setTimeout(() => resolve(200), 50)
    );

    const promises: Promise<number>[] = [slowPromise, fastPromise];

    const result = await promises.promiseRace();
    expect(result).to.eq(200);

    const rejectingPromise = new Promise<number>((_, reject) =>
      setTimeout(() => reject(new Error('Rejected!')), 10)
    );

    const normalPromise = new Promise<number>((resolve) =>
      setTimeout(() => resolve(300), 50)
    );

    try {
      await [rejectingPromise, normalPromise].promiseRace();
    } catch (error) {
      expect((error as Error).message).to.eq('Rejected!');
    }
  });

  it('should promiseAllSettled() - return all results', async () => {
    const promises: Promise<number>[] = [
      Promise.resolve(1),
      Promise.reject(new Error('Failed')),
      Promise.resolve(3)
    ];

    const results = await promises.promiseAllSettled();

    expect(results).to.have.lengthOf(3);

    expect(results[0].status).to.eq('fulfilled');
    if (results[0].status === 'fulfilled') {
      expect(results[0].value).to.eq(1);
    }

    expect(results[1].status).to.eq('rejected');
    if (results[1].status === 'rejected') {
      expect(results[1].reason).to.be.instanceOf(Error);
      expect(results[1].reason.message).to.eq('Failed');
    }

    expect(results[2].status).to.eq('fulfilled');
    if (results[2].status === 'fulfilled') {
      expect(results[2].value).to.eq(3);
    }
  });

  it('should handle mixed promise arrays', async () => {
    const mixedArray: Promise<string>[] = [
      Promise.resolve('success'),
      Promise.reject(new Error('failed')),
    ];

    const results = await mixedArray.promiseAllSettled();

    expect(results).to.have.lengthOf(2);

    expect(results[0].status).to.eq('fulfilled');

    expect(results[1].status).to.eq('rejected');
  });

  it('should handle race conditions correctly', async () => {
    const createDelayedPromise = (value: number, delay: number) => {
      return new Promise<number>((resolve) => {
        setTimeout(() => resolve(value), delay);
      });
    };

    const promises: Promise<number>[] = [
      createDelayedPromise(1, 100),
      createDelayedPromise(2, 50),
      createDelayedPromise(3, 150)
    ];

    const raceResult = await promises.promiseRace();
    expect(raceResult).to.eq(2);

    const allResult = await promises.promiseAll();
    expect(allResult).to.deep.eq([1, 2, 3]);
  });
});