import { getClassMeta, getMethodMeta } from "src/client/client-meta/class-meta";
import { Middleware } from "src/client/type/middleware";
import { AsyncFunction, Newable } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Middleware<T extends AsyncFunction>(
  ...middlewareList: Middleware[]
): ClassDecorator & MethodDecorator<T> {
  return function (target, methodKey) {
    if (undefined === methodKey) {
      const meta = getClassMeta(target as Newable);
      meta.middleware.push(...middlewareList);
    } else {
      const meta = getMethodMeta(target as Newable, methodKey);
      meta.middleware.push(...middlewareList);
    }
  } as ClassDecorator & MethodDecorator<T>;
}
