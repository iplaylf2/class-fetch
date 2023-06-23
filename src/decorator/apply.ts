import { getMethodMeta } from "src/client/client-meta/method-meta";
import { PrettyRequest } from "src/client/type/pretty-request";
import { ParameterDecorator } from "src/type/parameter-decorator";

export function Apply<
  Target,
  Key extends keyof Target,
  Index extends number,
  T
>(handler: PrettyRequest<T>): ParameterDecorator<Target, Key, Index, T> {
  return function (target, propertyKey, parameterIndex) {
    const meta = getMethodMeta(target[propertyKey] as any);
    const parameterMeta = meta.parameterMeta[1];
    parameterMeta.push({ handler, index: parameterIndex });
  } as ParameterDecorator<Target, Key, Index, T>;
}
