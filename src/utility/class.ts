import { Newable } from "../type/function";

export function getConstructor(prototype: any): Newable<any, any> {
  return prototype.constructor;
}

export function getSuperClass(x: Newable): Newable | null {
  const prototype = Object.getPrototypeOf(x);
  return endOfFunction === prototype ? null : prototype;
}

const endOfFunction = Object.getPrototypeOf(Function);
