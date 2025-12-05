import {registerKotlinExtensions} from "./kotlin-extensions";
import {registerKotlinArrayExtensions} from "./array-extensions";
import {registerKotlinMapExtensions} from "./map-extensions";

export function registerAllKotlinModules() {
  registerKotlinExtensions()
  registerKotlinArrayExtensions()
  registerKotlinMapExtensions()
}

export default { registerAllKotlinModules }