import {registerKotlinExtensions} from "./kotlin-extensions";
import {registerKotlinArrayExtensions} from "./array-extensions";

export function registerAllKotlinModules() {
  registerKotlinExtensions()
  registerKotlinArrayExtensions()
}

export default { registerAllKotlinModules }