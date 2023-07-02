import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { Middleware } from "../client/type/middleware";
import { AsyncFunction, Newable } from "../type/function";
import { MethodDecorator } from "../type/method-decorator";

export function Middleware<T extends AsyncFunction>(
  ...middleware: Middleware[]
): ClassDecorator & MethodDecorator<T> {
  return function (target, methodName) {
    if (undefined === methodName) {
      const classMeta = getClassMeta(target as Newable);
      classMeta.middleware.push(...middleware);
    } else {
      const classMeta = getClassMeta(target as Newable);
      const methodMeta = getMethodMeta(classMeta, methodName);
      methodMeta.middleware.push(...middleware);
    }
  } as ClassDecorator & MethodDecorator<T>;
}
