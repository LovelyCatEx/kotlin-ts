import {UnsupportedOperationException} from "./exception/UnsupportedOperationException";

declare global {
  interface Array<T> {
    isEmpty(): boolean

    isNotEmpty(): boolean

    count(): number

    count(predicate: (it: T) => boolean): number

    sum(): number

    sumOf(predicate: (it: T) => number): number
  }
}

export function registerArraySearchAndStatisticFunctions() {
  if (Array.prototype.isEmpty === undefined) {
    Array.prototype.isEmpty = function (): boolean {
      return this.length == 0
    }
  }

  if (Array.prototype.isNotEmpty === undefined) {
    Array.prototype.isNotEmpty = function (): boolean {
      return this.length > 0
    }
  }

  if (Array.prototype.count === undefined) {
    Array.prototype.count = function<T>(this: T[], predicate?: (it: T) => boolean): number {
      if (predicate === undefined) {
        return this.length
      }

      if (typeof predicate === 'function') {
        let count = 0
        for (let i = 0; i < this.length; i++) {
          if (predicate(this[i])) {
            count++
          }
        }
        return count
      }

      throw new UnsupportedOperationException("incorrect usage of Array.count()");
    }
  }

  if (Array.prototype.sum === undefined) {
    Array.prototype.sum = function<T>(this: T[]): number {
      if (this.length > 0 && typeof this[0] != 'number') {
        throw new UnsupportedOperationException(`incorrect usage of Array.sum(), the element type must be a number instead of ${typeof this[0]}.`);
      }

      if (this.length == 0) {
        return 0;
      }

      let count = 0
      for (let i = 0; i < this.length; i++) {
        count += this[i] as number
      }
      return count
    }
  }

  if (Array.prototype.sumOf === undefined) {
    Array.prototype.sumOf = function<T>(this: T[], predicate: (it: T) => number): number {
      if (this.length == 0) {
        return 0;
      }

      let count = 0
      for (let i = 0; i < this.length; i++) {
        count += predicate(this[i])
      }
      return count
    }
  }
}