import { Newable } from "src/type/function";

export function superClassOf(x: Newable): Newable | null {
  const prototype = Object.getPrototypeOf(x);
  return endOfSuperClass === prototype ? null : prototype;
}

const endOfSuperClass = Object.getPrototypeOf(Function);
