import { getConstructor } from "src/utility/class";
import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { Middleware } from "../client/type/middleware";
import { AsyncFunction, Newable } from "../type/function";
import { InstanceMethodDecorator } from "../type/instance-method-decorator";

export function Middleware<T, M extends AsyncFunction>(
  ...middleware: Middleware[]
): ClassDecorator & InstanceMethodDecorator<T, M> {
  return function (target, methodName) {
    if (undefined === methodName) {
      const classMeta = getClassMeta(target as Newable);
      classMeta.middleware.push(...middleware);
    } else {
      const classMeta = getClassMeta(getConstructor(target));
      const methodMeta = getMethodMeta(classMeta, methodName);
      methodMeta.middleware.push(...middleware);
    }
  } as ClassDecorator & InstanceMethodDecorator<T, M>;
}
