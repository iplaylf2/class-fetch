import { getMethodMeta } from "src/client/client-meta/class-meta";
import { PrettyRequest } from "src/client/type/pretty-request";
import { Newable } from "src/type/function";
import { ParameterDecorator } from "src/type/parameter-decorator";

export function Apply<
  Target,
  Key extends keyof Target,
  Index extends number,
  T
>(handle: PrettyRequest<T>): ParameterDecorator<Target, Key, Index, T> {
  return function (target, propertyKey, parameterIndex) {
    const meta = getMethodMeta(target as Newable, propertyKey as string);
    const parameterMeta = meta.parameterMeta[1];
    parameterMeta.push({ handle, index: parameterIndex });
  } as ParameterDecorator<Target, Key, Index, T>;
}
