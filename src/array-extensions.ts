import {registerArrayIteratorFunctions} from "./array-iterator-extensions";
import {registerArraySearchAndStatisticFunctions} from "./array-statistic-extensions";
import {registerArrayTransformFunctions} from "./array-transform-extensions";

export function registerKotlinArrayExtensions() {
    registerArrayIteratorFunctions()
    registerArrayTransformFunctions()
    registerArraySearchAndStatisticFunctions()
}