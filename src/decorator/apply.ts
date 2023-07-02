import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { getParameterMeta } from "../client/client-meta/method-meta";
import { ParameterMetaOrder } from "../client/client-meta/parameter-meta";
import { PrettyRequest } from "../client/type/pretty-request";
import { Newable } from "../type/function";
import { ParameterDecorator } from "../type/parameter-decorator";

export function Apply<
  Target,
  Key extends keyof Target,
  Index extends number,
  T
>(handler: PrettyRequest<T>): ParameterDecorator<Target, Key, Index, T> {
  return function (target, propertyKey, parameterIndex) {
    const classMeta = getClassMeta(target as Newable);
    const methodMeta = getMethodMeta(classMeta, propertyKey as string);
    const parameterMeta = getParameterMeta(
      methodMeta,
      ParameterMetaOrder.Apply,
      parameterIndex
    );
    parameterMeta.push(handler);
  } as ParameterDecorator<Target, Key, Index, T>;
}
