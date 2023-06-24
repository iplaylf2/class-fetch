import { Middleware } from "src/client/type/middleware";
import { Newable } from "src/type/function";
import { ReThrow } from "../type/re-throw";

export function getClassMeta(x: Newable): ClassMeta {
  const meta = classXMeta.get(x);
  if (meta) {
    return meta;
  } else {
    const meta: ClassMeta = { reThrow: [], middleware: [], method: [] };
    classXMeta.set(x, meta);
    return meta;
  }
}

export type ClassMeta = {
  request?: Request;
  reThrow: ReThrow[];
  middleware: Middleware[];
  method: (string | symbol)[];
};

const classXMeta = new WeakMap<Newable, ClassMeta>();
