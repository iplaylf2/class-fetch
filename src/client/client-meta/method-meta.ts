import { Middleware } from "src/client/type/middleware";
import { Format } from "src/utility/string";
import { PrettyRequest } from "../type/pretty-request";
import { ReThrow } from "../type/re-throw";
import { Return } from "../type/return";

export function createMethodMeta(): MethodMeta {
  return {
    method: null,
    path: null,
    init: null,
    return: null,
    reThrow: [],
    middleware: [],
    parameterMeta: [[], []],
  };
}

export function cloneMethodMeta(x: MethodMeta): MethodMeta {
  return {
    method: x.method,
    path: x.path,
    init: x.init,
    return: x.return,
    reThrow: Array.from(x.reThrow),
    middleware: Array.from(x.middleware),
    parameterMeta: [
      Array.from(x.parameterMeta[0]),
      Array.from(x.parameterMeta[1]),
    ],
  };
}

export type MethodMeta = {
  method: string | null;
  path: string | Format | null;
  init: RequestInit | null;
  return: Return | null;
  reThrow: ReThrow[];
  middleware: Middleware[];
  parameterMeta: [ParameterMetaItem[], ParameterMetaItem[]];
};

export type ParameterMetaItem = {
  index: number;
  handle: PrettyRequest<any>;
};
