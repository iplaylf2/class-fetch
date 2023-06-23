import { Middleware } from "src/client/type/middleware";
import { Newable } from "src/type/function";
import { ReThrow } from "../type/re-throw";

export function setClassMeta<T extends keyof ClassMeta>(
  x: Newable,
  type: T,
  data: ClassMeta[T]
) {}

export function getClassMeta<T extends keyof ClassMeta>(
  x: Newable,
  type: T
): ClassMeta[T] | null {
  return classMap.get(x)?.[type] ?? null;
}

export type ClassMeta = {
  request?: Request;
  reThrow: ReThrow[];
  middleware: Middleware[];
};

const classMap = new WeakMap<Newable, ClassMeta>();
