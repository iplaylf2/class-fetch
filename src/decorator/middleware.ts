import { getClassMeta } from "src/client/client-meta/class-meta";
import { getMethodMeta } from "src/client/client-meta/method-meta";
import { Middleware } from "src/client/type/middleware";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Middleware<T extends AsyncFunction>(
  ...middlewareList: Middleware[]
): ClassDecorator & MethodDecorator<T> {
  return function (target, methodKey) {
    if (undefined === methodKey) {
      const meta = getClassMeta(target as any);
      meta.middleware.push(...middlewareList);
    } else {
      const meta = getMethodMeta((target as any)[methodKey]);
      meta.middleware.push(...middlewareList);
    }
  } as ClassDecorator & MethodDecorator<T>;
}
