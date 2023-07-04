import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { getParameterMeta } from "../client/client-meta/method-meta";
import { ParameterMetaOrder } from "../client/client-meta/parameter-meta";
import { PrettyRequest } from "../client/type/pretty-request";
import { InstanceParameterDecorator } from "../type/instance-parameter-decorator";
import { getConstructor } from "../utility/class";

export function RawBody<
  Target,
  Key extends keyof Target,
  Index extends number
>(): InstanceParameterDecorator<Target, Key, Index, BodyInit | null> {
  return function (target, propertyKey, parameterIndex) {
    const classMeta = getClassMeta(getConstructor(target));
    const methodMeta = getMethodMeta(classMeta, propertyKey as string);
    const parameterMeta = getParameterMeta(
      methodMeta,
      ParameterMetaOrder.Body,
      parameterIndex
    );

    const handler: PrettyRequest<BodyInit | null> = (arg, request) =>
      new Request(request, { body: arg });

    parameterMeta.push(handler);
  } as InstanceParameterDecorator<Target, Key, Index, BodyInit | null>;
}
