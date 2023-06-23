import { Middleware } from "src/client/type/middleware";
import { Callable } from "src/type/function";
import { Format } from "src/utility/string";
import { PrettyRequest } from "../type/pretty-request";
import { ReThrow } from "../type/re-throw";
import { Return } from "../type/return";

export function getMethodMeta(x: Callable): MethodMeta {
  const meta = methodXMeta.get(x);
  if (meta) {
    return meta;
  } else {
    const meta: MethodMeta = {
      reThrow: [],
      middleware: [],
      parameterMeta: [[], []],
    };
    methodXMeta.set(x, meta);
    return meta;
  }
}

export type MethodMeta = {
  method?: string;
  path?: string | Format;
  init?: RequestInit;
  return?: Return;
  reThrow: ReThrow[];
  middleware: Middleware[];
  parameterMeta: [ParameterMetaItem[], ParameterMetaItem[]];
};

export type ParameterMetaItem = {
  index: number;
  handler: PrettyRequest<any>;
};

const methodXMeta = new WeakMap<Callable, MethodMeta>();
