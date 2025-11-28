declare global {
    interface Array<T> {
        first(): T

        first(predicate: (it: T) => boolean): T

        last(): T

        last(predicate: (it: T) => boolean): T
    }
}

export function registerKotlinArrayExtensions() {
    if (Array.prototype.first === undefined) {

    }
}