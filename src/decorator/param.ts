import { getMethodMeta } from "src/client/client-meta/method-meta";
import { PrettyRequest } from "src/client/type/pretty-request";
import { ParameterDecorator } from "src/type/parameter-decorator";

export function Param<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, Record<string, string>>;
export function Param<Target, Key extends keyof Target, Index extends number>(
  key: string
): ParameterDecorator<Target, Key, Index, string>;
export function Param<Target, Key extends keyof Target, Index extends number>(
  key?: string
): ParameterDecorator<Target, Key, Index, any> {
  return function (target, propertyKey, parameterIndex) {
    const meta = getMethodMeta(target[propertyKey] as any);
    const parameterMeta = meta.parameterMeta[0];

    const handleRecord: PrettyRequest<Record<string, string>> = (
      arg: Record<string, string>,
      request,
      context
    ) => {
      // get paramRecord from context
      // merge paramRecord
      // if parameterMeta.length -1 === metaIndex ; format(template,record)
      return request;
    };

    const handler: PrettyRequest<string & Record<string, string>> =
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
