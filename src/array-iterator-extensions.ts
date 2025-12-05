import {UnsupportedOperationException} from "./exception/UnsupportedOperationException";
import {NullPointerException} from "./exception/NullPointerException";
import {IllegalArgumentException} from "./exception/IllegalArgumentException";

declare global {
  interface Array<T> {
    distinct(): Array<T>

    distinctBy<S>(selector: (it: T) => S): Array<T>

    all(predicate: (it: T) => boolean): boolean

    any(predicate: (it: T) => boolean): boolean

    forEachIndexed(block: (index: number, it: T) => void): void

    filterIndexed(predicate: (index: number, it: T) => boolean): Array<T>

    filterNot(predicate: (it: T) => boolean): Array<T>

    filterNotIndexed(predicate: (index: number, it: T) => boolean): Array<T>

    filterNotNull(): Array<NonNullable<T>>

    filterNotNull(predicate: (index: number, it: T) => boolean): Array<NonNullable<T>>

    take(n: number): Array<T>

    takeLast(n: number): Array<T>

    takeWhile(predicate: (it: T) => boolean): Array<T>

    takeLastWhile(predicate: (it: T) => boolean): Array<T>

    drop(n: number): Array<T>

    dropLast(n: number): Array<T>

    dropWhile(predicate: (it: T) => boolean): Array<T>

    dropLastWhile(predicate: (it: T) => boolean): Array<T>

    first(): T

    first(predicate: (it: T) => boolean): T

    firstOrNull(): T | null

    firstOrNull(predicate: (it: T) => boolean): T | null

    last(): T

    last(predicate: (it: T) => boolean): T

    lastOrNull(): T | null

    lastOrNull(predicate: (it: T) => boolean): T | null

    single(): T

    single(predicate: (it: T) => boolean): T

    singleOrNull(): T | null

    singleOrNull(predicate: (it: T) => boolean): T | null
  }
}

export function registerArrayIteratorFunctions() {
  if (Array.prototype.forEachIndexed === undefined) {
    Array.prototype.forEachIndexed = function<T>(block: (index: number, it: T) => void) {
      for (let i = 0; i < this.length; i++) {
        block(i, this[i])
      }
    }
  }

  if (Array.prototype.all === undefined) {
    Array.prototype.all = function<T>(predicate: (it: T) => boolean): boolean {
      for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i])) {
          return false
        }
      }
      return true
    }
  }

  if (Array.prototype.any === undefined) {
    Array.prototype.any = function<T>(predicate: (it: T) => boolean): boolean {
      for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
          return true
        }
      }
      return false
    }
  }

  registerArrayFilterFunctions()

  registerArrayFirstFunctions()
  registerArrayLastExtensions()
  registerArraySingleExtensions()

  registerArrayTakeFunctions()
  registerArrayDropFunctions()

  registerArrayDistinctFunctions()
}

function registerArrayFilterFunctions() {
  if (Array.prototype.filterIndexed === undefined) {
    Array.prototype.filterIndexed = function<T>(predicate: (index: number, it: T) => boolean): Array<T> {
      const result: T[] = []
      for (let i = 0; i < this.length; i++) {
        if (predicate(i, this[i])) {
          result.push(this[i])
        }
      }
      return result
    }
  }

  if (Array.prototype.filterNotIndexed === undefined) {
    Array.prototype.filterNotIndexed = function<T>(predicate: (index: number, it: T) => boolean): Array<T> {
      const result: Array<NonNullable<T>> = []
      for (let i = 0; i < this.length; i++) {
        if (!predicate(i, this[i])) {
          result.push(this[i])
        }
      }
      return result
    }
  }

  if (Array.prototype.filterNot === undefined) {
    Array.prototype.filterNot = function <T>(predicate: (it: T) => boolean): Array<T> {
      return this.filterNotIndexed((_, it) => predicate(it))
    }
  }


  if (Array.prototype.filterNotNull === undefined) {
    Array.prototype.filterNotNull = function<T>(predicate?: (index: number, it: T) => boolean): Array<NonNullable<T>> {
      const result: Array<NonNullable<T>> = []

      this.forEach((item: T, index: number) => {
        if (item !== null && item !== undefined) {
          const nonNullItem = item as NonNullable<T>;

          if (!predicate || predicate(index, nonNullItem)) {
            result.push(nonNullItem);
          }
        }
      });

      return result
    }
  }
}

function registerArrayTakeFunctions() {
  if (Array.prototype.take === undefined) {
    Array.prototype.take = function<T>(this: T[], n: number): T[] {
      if (n <= 0) return [];
      if (n >= this.length) return [...this];
      return this.slice(0, n);
    };
  }

  if (Array.prototype.takeWhile === undefined) {
    Array.prototype.takeWhile = function<T>(this: T[], predicate: (it: T) => boolean): T[] {
      const result: T[] = [];
      for (const item of this) {
        if (predicate(item)) {
          result.push(item);
        } else {
          break;
        }
      }
      return result;
    };
  }

  if (Array.prototype.takeLast === undefined) {
    Array.prototype.takeLast = function<T>(this: T[], n: number): T[] {
      if (n <= 0) return [];
      if (n >= this.length) return [...this];
      return this.slice(-n);
    };

  }

  if (Array.prototype.takeLastWhile === undefined) {
    Array.prototype.takeLastWhile = function<T>(this: T[], predicate: (it: T) => boolean): T[] {
      const result: T[] = [];
      for (let i = this.length - 1; i >= 0; i--) {
        if (predicate(this[i])) {
          result.unshift(this[i]);
        } else {
          break;
        }
      }
      return result;
    };

  }
}

function registerArrayDropFunctions() {
  if (Array.prototype.drop == undefined) {
    Array.prototype.drop = function<T>(this: T[], n: number): T[] {
      if (n <= 0) return [...this];
      if (n >= this.length) return [];
      return this.slice(n);
    };
  }

  if (Array.prototype.dropWhile == undefined) {
    Array.prototype.dropWhile = function<T>(this: T[], predicate: (it: T) => boolean): T[] {
      let startIndex = 0;
      for (const item of this) {
        if (!predicate(item)) break;
        startIndex++;
      }
      return this.slice(startIndex);
    };
  }

  if (Array.prototype.dropLast == undefined) {
    Array.prototype.dropLast = function<T>(this: T[], n: number): T[] {
      if (n <= 0) return [...this];
      if (n >= this.length) return [];
      return this.slice(0, -n);
    };
  }

  if (Array.prototype.dropLastWhile == undefined) {
    Array.prototype.dropLastWhile = function<T>(this: T[], predicate: (it: T) => boolean): T[] {
      let endIndex = this.length;
      for (let i = this.length - 1; i >= 0; i--) {
        if (!predicate(this[i])) break;
        endIndex--;
      }
      return this.slice(0, endIndex);
    }
  }
}


function registerArrayFirstFunctions() {
  if (Array.prototype.firstOrNull === undefined) {
    Array.prototype.firstOrNull = function <T>(predicate?: (it: T) => boolean): T | null {
      // firstOrNull(): T | null
      if (predicate === undefined) {
        if (this.length > 0) {
          return this[0];
        } else {
          return null;
        }
      }

      // firstOrNull(predicate: (it: T) => boolean): T | null
      if (typeof predicate === 'function') {
        for (let i = 0; i < this.length; i++) {
          if (predicate(this[i])) {
            return this[i];
          }
        }
        return null;
      }

      throw new UnsupportedOperationException("incorrect usage of Array.firstOrNull()");
    };
  }

  if (Array.prototype.first === undefined) {
    Array.prototype.first = function <T>(predicate?: (it: T) => boolean): T {
      // first(): T
      if (predicate === undefined) {
        const result = this.firstOrNull()
        if (result != null) {
          return result
        } else {
          throw new NullPointerException("First element not found in array because of empty array.");
        }
      }

      // first(predicate: (it: T) => boolean): T
      if (typeof predicate === 'function') {
        const result = this.firstOrNull(predicate)
        if (result != null) {
          return result
        } else {
          throw new NullPointerException("First element not found in array, all conditions were dismissed.")
        }
      }

      throw new UnsupportedOperationException("incorrect usage of Array.first()");
    };
  }
}

function registerArrayLastExtensions() {
  if (Array.prototype.lastOrNull === undefined) {
    Array.prototype.lastOrNull = function <T>(predicate?: (it: T) => boolean): T | null {
      // lastOrNull(): T | null
      if (predicate === undefined) {
        if (this.length > 0) {
          return this[this.length - 1];
        } else {
          return null;
        }
      }

      // firstOrNull(predicate: (it: T) => boolean): T | null
      if (typeof predicate === 'function') {
        for (let i = this.length - 1; i >= 0; i--) {
          if (predicate(this[i])) {
            return this[i];
          }
        }
        return null;
      }

      throw new UnsupportedOperationException("incorrect usage of Array.lastOrNull()");
    };
  }

  if (Array.prototype.last === undefined) {
    Array.prototype.last = function <T>(predicate?: (it: T) => boolean): T {
      // first(): T
      if (predicate === undefined) {
        const result = this.lastOrNull()
        if (result != null) {
          return result
        } else {
          throw new NullPointerException("Last element not found in array because of empty array.");
        }
      }

      // first(predicate: (it: T) => boolean): T
      if (typeof predicate === 'function') {
        const result = this.lastOrNull(predicate)
        if (result != null) {
          return result
        } else {
          throw new NullPointerException("Last element not found in array, all conditions were dismissed.")
        }
      }

      throw new UnsupportedOperationException("incorrect usage of Array.last()");
    };
  }
}

function registerArraySingleExtensions() {
  if (Array.prototype.singleOrNull === undefined) {
    Array.prototype.singleOrNull = function <T>(predicate?: (it: T) => boolean): T | null {
      if (predicate === undefined) {
        if (this.length == 1) {
          return this[0]
        } else {
          return null
        }
      }

      if (typeof predicate === 'function') {
        let single: T | null = null
        let found = false
        for (let i = 0; i < this.length; i++) {
          if (predicate(this[i])) {
            if (found) return null
            single = this[i]
            found = true
          }
        }
        if (!found) return null
        return single
      }

      throw new UnsupportedOperationException("incorrect usage of Array.singleOrNull()");
    };
  }

  if (Array.prototype.single === undefined) {
    Array.prototype.single = function <T>(predicate?: (it: T) => boolean): T {
      if (predicate === undefined) {
        if (this.length == 1) {
          return this[0]
        } else {
          throw new IllegalArgumentException("Array contains more than one matching element.")
        }
      }

      if (typeof predicate === 'function') {
        const result = this.singleOrNull(predicate)
        if (result != null) {
          return result
        } else {
          throw new IllegalArgumentException("Array contains more than one matching element.")
        }
      }

      throw new UnsupportedOperationException("incorrect usage of Array.singleOrNull()");
    };
  }
}

function registerArrayDistinctFunctions() {
  if (Array.prototype.distinct === undefined) {
    Array.prototype.distinct = function<T>(this: T[]): Array<T> {
      const result: T[] = []
      const count = new Map<T, number>()
      for (let i = 0; i < this.length; i++) {
        const c = count.get(this[i]) || 0
        if (c == 0) {
          result.push(this[i])
        }
        count.set(this[i], c + 1)
      }
      return result
    }
  }

  if (Array.prototype.distinctBy === undefined) {
    Array.prototype.distinctBy = function<T, S>(this: T[], selector: (it: T) => S): Array<T> {
      const result: T[] = []
      const count = new Map<S, number>()
      for (let i = 0; i < this.length; i++) {
        const s = selector(this[i])
        const c = count.get(s) || 0
        if (c == 0) {
          result.push(this[i])
        }
        count.set(s, c + 1)
      }
      return result
    }
  }
}