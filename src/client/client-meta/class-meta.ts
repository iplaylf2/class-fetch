import { Middleware } from "src/client/type/middleware";
import { Newable } from "src/type/function";
import { getSuperClass } from "src/utility/class";
import { ReThrow } from "../type/re-throw";

export function getClassMeta(x: Newable): ClassMeta {
  const meta = classXMeta.get(x);
  if (meta) {
    return meta;
  } else {
    const superClass = getSuperClass(x);
    if (superClass) {
      const meta = getClassMeta(superClass);
      return cloneMeta(meta);
    } else {
      const meta: ClassMeta = {
        request: null,
        reThrow: [],
        middleware: [],
        method: [],
      };
      classXMeta.set(x, meta);
      return meta;
    }
  }
}

export type ClassMeta = {
  request: Request | null;
  reThrow: ReThrow[];
  middleware: Middleware[];
  method: (string | symbol)[];
};

function cloneMeta(x: ClassMeta): ClassMeta {
  return {
    request: x.request,
    reThrow: Array.from(x.reThrow),
    middleware: Array.from(x.middleware),
    method: Array.from(x.method),
  };
}

const classXMeta = new WeakMap<Newable, ClassMeta>();
