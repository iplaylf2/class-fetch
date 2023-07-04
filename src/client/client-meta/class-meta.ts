import { Middleware } from "../../client/type/middleware";
import { Newable } from "../../type/function";
import { getSuperClass } from "../../utility/class";
import { ReThrow } from "../type/re-throw";
import { MethodMeta, cloneMethodMeta, createMethodMeta } from "./method-meta";

export function getClassMeta(x: Newable): ClassMeta {
  const meta = classXMeta.get(x);
  if (meta) {
    return meta;
  } else {
    const superClass = getSuperClass(x);

    const meta = superClass
      ? cloneClassMeta(getClassMeta(superClass))
      : createClassMeta();

    classXMeta.set(x, meta);

    return meta;
  }
}

export function getMethodMeta(
  classMeta: ClassMeta,
  name: string | symbol
): MethodMeta {
  const methodMeta = classMeta.method.get(name);
  if (methodMeta) {
    return methodMeta;
  } else {
    const meta = createMethodMeta();
    classMeta.method.set(name, meta);
    return meta;
  }
}

export type ClassMeta = {
  request: Request | null;
  reThrow: ReThrow[];
  middleware: Middleware[];
  method: Map<string | symbol, MethodMeta>;
};

function createClassMeta(): ClassMeta {
  return {
    request: null,
    reThrow: [],
    middleware: [],
    method: new Map(),
  };
}

function cloneClassMeta(x: ClassMeta): ClassMeta {
  return {
    request: x.request,
    reThrow: Array.from(x.reThrow),
    middleware: Array.from(x.middleware),
    method: new Map(
      Array.from(x.method).map(([name, meta]) => [name, cloneMethodMeta(meta)])
    ),
  };
}

const classXMeta = new WeakMap<Newable, ClassMeta>();
