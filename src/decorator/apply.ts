import { getClassMeta, getMethodMeta } from "src/client/client-meta/class-meta";
import { getParameterMeta } from "src/client/client-meta/method-meta";
import { ParameterMetaOrder } from "src/client/client-meta/parameter-meta";
import { PrettyRequest } from "src/client/type/pretty-request";
import { Newable } from "src/type/function";
import { ParameterDecorator } from "src/type/parameter-decorator";

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
