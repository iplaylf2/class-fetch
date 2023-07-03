import { getConstructor } from "src/utility/class";
import {
  ParamContext,
  ParamRecord,
  paramContextSymbol,
} from "../client/client-meta/attach-context-item";
import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { getParameterMeta } from "../client/client-meta/method-meta";
import { ParameterMetaOrder } from "../client/client-meta/parameter-meta";
import { PrettyRequest } from "../client/type/pretty-request";
import { appendPath } from "../client/utility/append-path";
import { InstanceParameterDecorator } from "../type/instance-parameter-decorator";

export function Param<
  Target,
  Key extends keyof Target,
  Index extends number
>(): InstanceParameterDecorator<Target, Key, Index, ParamRecord>;
export function Param<Target, Key extends keyof Target, Index extends number>(
  key: string
): InstanceParameterDecorator<Target, Key, Index, string>;
export function Param<Target, Key extends keyof Target, Index extends number>(
  key?: string
): InstanceParameterDecorator<Target, Key, Index, any> {
  return function (target, propertyKey, parameterIndex) {
    const classMeta = getClassMeta(getConstructor(target));
    const methodMeta = getMethodMeta(classMeta, propertyKey as string);
    const parameterMeta = getParameterMeta(
      methodMeta,
      ParameterMetaOrder.Param,
      parameterIndex
    );

    const handleRecord: PrettyRequest<ParamRecord> = (
      arg,
      request,
      context
    ) => {
      const param = context.get(paramContextSymbol) as ParamContext | undefined;

      if (undefined === param) {
        return request;
      }

      const { pathFormat, paramRecord, finishHandler } = param;

      Object.assign(paramRecord, arg);

      if (handler === finishHandler) {
        const path = pathFormat(paramRecord);

        const url = appendPath(request.url, path);

        return new Request(url, request);
      } else {
        return request;
      }
    };

    const handler: PrettyRequest<string & ParamRecord> =
      undefined === key
        ? handleRecord
        : (arg: string, request, context) =>
            handleRecord({ [key]: arg }, request, context);

    parameterMeta.push(handler);
  } as InstanceParameterDecorator<Target, Key, Index, any>;
}
