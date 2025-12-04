import {registerArrayIteratorFunctions} from "./array-iterator-extensions";
import {registerArraySearchAndStatisticFunctions} from "./array-statistic-extensions";
import {registerArrayTransformFunctions} from "./array-transform-extensions";

declare global {
    interface Array<T> {
        isEmpty(): boolean

        isNotEmpty(): boolean

        count(): number

        count(predicate: (it: T) => boolean): number

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

        distinct(): Array<T>

        distinctBy(selector: (it: T) => boolean): Array<T>

        mapIndexed<R>(transform: (index: number, it: T) => R): Array<R>

        mapNotNull<R>(transform: (it: T) => R | undefined | null): Array<R>

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

export function registerKotlinArrayExtensions() {
    registerArrayIteratorFunctions()
    registerArrayTransformFunctions()
    registerArraySearchAndStatisticFunctions()
}