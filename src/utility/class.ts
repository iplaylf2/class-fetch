import { Newable } from "src/type/function";

export function getSuperClass(x: Newable): Newable | null {
  const prototype = Object.getPrototypeOf(x);
  return endOfFunction === prototype ? null : prototype;
}

const endOfFunction = Object.getPrototypeOf(Function);
