import {
  ParamRecord,
  paramRecordSymbol,
} from "src/client/client-meta/attach-context-item";
import { getClassMeta, getMethodMeta } from "src/client/client-meta/class-meta";
import { PrettyRequest } from "src/client/type/pretty-request";
import { Newable } from "src/type/function";
import { ParameterDecorator } from "src/type/parameter-decorator";
import { expression } from "src/utility/expression";
import { Format } from "src/utility/string";

export function Param<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, ParamRecord>;
export function Param<Target, Key extends keyof Target, Index extends number>(
  key: string
): ParameterDecorator<Target, Key, Index, string>;
export function Param<Target, Key extends keyof Target, Index extends number>(
  key?: string
): ParameterDecorator<Target, Key, Index, any> {
  return function (target, propertyKey, parameterIndex) {
    const classMeta = getClassMeta(target as Newable);
    const methodMeta = getMethodMeta(classMeta, propertyKey as string);
    const parameterMeta = methodMeta.parameterMeta[0];

    const handleRecord: PrettyRequest<ParamRecord> = (
      arg,
      request,
      context
    ) => {
      const paramRecord = context.get(paramRecordSymbol) as
        | ParamRecord
        | undefined;

      if (undefined === paramRecord) {
        return request;
      }

      Object.assign(paramRecord, arg);

      if (parameterMeta.length - 1 === metaIndex) {
        const path = (methodMeta.path as Format)(paramRecord);

        const url = new URL(request.url);
        const newPath = expression(() => {
          if (url.pathname.endsWith("/")) {
            if (path.startsWith("/")) {
              return `${url.pathname}${path.slice(1)}`;
            } else {
              return `${url.pathname}${path}`;
            }
          } else {
            if (path.startsWith("/")) {
              return `${url.pathname}${path}`;
            } else {
              return `${url.pathname}/${path}`;
            }
          }
        });

        return new Request({
          ...request,
          url: new URL(newPath, url).toString(),
        });
      } else {
        return request;
      }
    };

    const handler: PrettyRequest<string & ParamRecord> =
      undefined === key
        ? handleRecord
        : (arg: string, request, context) =>
            handleRecord({ [key]: arg }, request, context);

    const metaIndex = parameterMeta.length;

    parameterMeta.push({
      handler,
      index: parameterIndex,
    });
  } as ParameterDecorator<Target, Key, Index, any>;
}
