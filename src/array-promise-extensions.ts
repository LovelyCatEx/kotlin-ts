declare global {
  interface Array<T> {
    promiseAll(): Promise<T extends Promise<infer U> ? U[] : T[]>;

    promiseAllSettled(): Promise<PromiseSettledResult<T>[]>;

    promiseRace(): Promise<T extends Promise<infer U> ? U : T>;
  }
}

export function registerArrayPromiseFunctions() {
  if (Array.prototype.promiseAll === undefined) {
    Array.prototype.promiseAll = async function<T>(this: Promise<T>[]): Promise<T[]> {
      return Promise.all(this);
    };
  }

  if (Array.prototype.promiseAllSettled === undefined) {
    Array.prototype.promiseAllSettled = async function() {
      const promises = this.map(item =>
        item instanceof Promise ? item : Promise.resolve(item)
      );
      return Promise.allSettled(promises);
    };
  }

  if (Array.prototype.promiseRace === undefined) {
    Array.prototype.promiseRace = async function() {
      return Promise.race(this);
    };
  }
}