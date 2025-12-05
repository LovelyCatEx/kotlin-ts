import {registerMapTransformFunctions} from "./map-transform-extensions";

export function registerKotlinMapExtensions() {
  registerMapTransformFunctions()
}

export * from './map-transform-extensions'