declare global {
  interface Array<T> {
    mapIndexed<R>(transform: (index: number, it: T) => R): Array<R>

    mapNotNull<R>(transform: (it: T) => R | undefined | null): Array<R>

    flatMapIndexed<R>(this: T[], transform: (index: number, it: T) => R[]): R[]

    flatMapNotNull<R>(this: T[], transform: (it: T) => R[] | undefined | null): R[]

    flatten(this: T[]): T

    associateBy<K>(transform: (it: T) => K): Map<K, T>

    associateWith<V>(transform: (it: T) => V): Map<T, V>

    groupBy<K>(transform: (it: T) => K): Map<K, T[]>
  }
}

export function registerArrayTransformFunctions() {
  if (Array.prototype.mapIndexed === undefined) {
    Array.prototype.mapIndexed = function<T, R>(this: T[], transform: (index: number, it: T) => R): R[] {
      const result: R[] = []
      for (let i = 0; i < this.length; i++) {
        result.push(transform(i, this[i]))
      }
      return result
    }
  }

  if (Array.prototype.mapNotNull === undefined) {
    Array.prototype.mapNotNull = function<T, R>(transform: (it: T) => R | undefined | null): R[] {
      const result: R[] = []
      for (let i = 0; i < this.length; i++) {
        const t = transform(this[i])
        if (t != null) {
          result.push(t)
        }
      }
      return result
    }
  }

  if (Array.prototype.flatMapIndexed === undefined) {
    Array.prototype.flatMapIndexed = function<T, R>(this: T[][], transform: (index: number, it: T[]) => R[]): R[] {
      const result: R[] = []
      for (let i = 0; i < this.length; i++) {
        result.push(...transform(i, this[i]))
      }
      return result
    }
  }

  if (Array.prototype.flatMapNotNull === undefined) {
    Array.prototype.flatMapNotNull = function<T, R>(this: T[][], transform: (it: T[]) => R[] | undefined | null): R[] {
      const result: R[] = []
      for (let i = 0; i < this.length; i++) {
        const t = transform(this[i])
        if (t != null) {
          result.push(...t)
        }
      }
      return result
    }
  }

  if (Array.prototype.flatten === undefined) {
    Array.prototype.flatten = function<T>(this: T[][]): T[] {
      return this.flatMap(it => it)
    }
  }

  if (Array.prototype.associateBy === undefined) {
    Array.prototype.associateBy = function<T, K>(this: T[], transform: (it: T) => K): Map<K, T> {
      const result = new Map<K, T>();
      for (let i = 0; i < this.length; i++) {
        result.set(transform(this[i]), this[i])
      }
      return result;
    }
  }

  if (Array.prototype.associateWith === undefined) {
    Array.prototype.associateWith = function<T, V>(this: T[], transform: (it: T) => V): Map<T, V> {
      const result = new Map<T, V>();
      for (let i = 0; i < this.length; i++) {
        result.set(this[i], transform(this[i]))
      }
      return result;
    }
  }

  if (Array.prototype.groupBy === undefined) {
    Array.prototype.groupBy = function<T, K>(this: T[], transform: (it: T) => K): Map<K, T[]> {
      const result = new Map<K, T[]>();

      for (let i = 0; i < this.length; i++) {
        const element = this[i];
        const key = transform(element);
        const list = result.get(key) ?? [] as T[];
        list.push(element);
        result.set(key, list);
      }

      return result;
    }
  }

}