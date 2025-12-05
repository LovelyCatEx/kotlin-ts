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

}