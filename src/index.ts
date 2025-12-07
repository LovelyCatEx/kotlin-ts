import {registerKotlinExtensions} from "./kotlin-extensions";
import {registerKotlinArrayExtensions} from "./array-extensions";
import {registerKotlinMapExtensions} from "./map-extensions";

export function registerAllKotlinModules() {
  registerKotlinExtensions()
  registerKotlinArrayExtensions()
  registerKotlinMapExtensions()
}

export * from './kotlin-extensions'
export * from './array-extensions'
export * from './map-extensions'
export * from './promise-extensions'
export default { registerAllKotlinModules }