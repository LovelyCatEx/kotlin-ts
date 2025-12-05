import {UnsupportedOperationException} from "./exception/UnsupportedOperationException";

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
}