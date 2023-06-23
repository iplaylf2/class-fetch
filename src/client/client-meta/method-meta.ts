import { Middleware } from "src/client/type/middleware";
import { Callable } from "src/type/function";
import { Format } from "src/utility/string";
import { PrettyRequest } from "../type/pretty-request";
import { ReThrow } from "../type/re-throw";
import { Return } from "../type/return";

export type MethodMeta = {
  method?: string;
  path?: string | Format;
  init?: RequestInit;
  return?: Return;
  reThrow: ReThrow[];
  middleware: Middleware[];
  parameterMeta: ParameterMetaItem[][];
};

export type ParameterMetaItem = {
  index: number;
  handler: PrettyRequest;
};

const methodMap = new WeakMap<Callable, MethodMeta>();
