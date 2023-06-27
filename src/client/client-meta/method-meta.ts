import { Middleware } from "src/client/type/middleware";
import { Format } from "src/utility/string";
import { ReThrow } from "../type/re-throw";
import { Return } from "../type/return";
import { expression } from "src/utility/expression";
import { ParameterMeta } from "./parameter-meta";

export function createMethodMeta(): MethodMeta {
  return {
    method: null,
    path: null,
    init: null,
    return: null,
    reThrow: [],
    middleware: [],
    parameterMeta: [],
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
    parameterMeta: x.parameterMeta.map((order) =>
      order.map((index) => Array.from(index))
    ),
  };
}

export function getParameterMeta(
  methodMeta: MethodMeta,
  order: number,
  index: number
): ParameterMeta {
  const parameterMetaList = expression(() => {
    const parameterMetaList = methodMeta.parameterMeta[order];
    if (parameterMetaList) {
      return parameterMetaList;
    } else {
      const parameterMetaList: ParameterMeta[] = [];
      methodMeta.parameterMeta[order] = parameterMetaList;
      return parameterMetaList;
    }
  });

  const parameterMeta = expression(() => {
    const parameterMeta = parameterMetaList[index];
    if (parameterMeta) {
      return parameterMeta;
    } else {
      const parameterMeta: ParameterMeta = [];
      parameterMetaList[index] = parameterMeta;
      return parameterMeta;
    }
  });

  return parameterMeta;
}

export type MethodMeta = {
  method: string | null;
  path: string | Format | null;
  init: RequestInit | null;
  return: Return | null;
  reThrow: ReThrow[];
  middleware: Middleware[];
  parameterMeta: ParameterMeta[][];
};
