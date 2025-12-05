declare global {
  interface Map<K, V> {
    mapKeys<T>(transform: (it: K) => T): Map<T, V>;

    mapValues<T>(transform: (it: V) => T): Map<K, T>;
  }
}

export function registerMapTransformFunctions() {
  if (Map.prototype.mapKeys === undefined) {
    Map.prototype.mapKeys = function<K, V, T>(transform: (it: K) => T): Map<T, V> {
      const result = new Map<T, V>();
      for (let key of this.keys()) {
        result.set(transform(key), this.get(key))
      }
      return result
    }
  }

  if (Map.prototype.mapValues === undefined) {
    Map.prototype.mapValues = function<K, V, T>(transform: (it: K) => T): Map<K, T> {
      const result = new Map<K, T>();
      for (let key of this.keys()) {
        result.set(key, transform(this.get(key)))
      }
      return result
    }
  }
}