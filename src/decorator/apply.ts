import { getConstructor } from "src/utility/class";
import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { getParameterMeta } from "../client/client-meta/method-meta";
import { ParameterMetaOrder } from "../client/client-meta/parameter-meta";
import { PrettyRequest } from "../client/type/pretty-request";
import { InstanceParameterDecorator } from "../type/instance-parameter-decorator";

export function Apply<
  Target,
  Key extends keyof Target,
  Index extends number,
  T
>(
  handler: PrettyRequest<T>
): InstanceParameterDecorator<Target, Key, Index, T> {
  return function (target, propertyKey, parameterIndex) {
    const classMeta = getClassMeta(getConstructor(target));
    const methodMeta = getMethodMeta(classMeta, propertyKey as string);
    const parameterMeta = getParameterMeta(
      methodMeta,
      ParameterMetaOrder.Apply,
      parameterIndex
    );
    parameterMeta.push(handler);
  } as InstanceParameterDecorator<Target, Key, Index, T>;
}
