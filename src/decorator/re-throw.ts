import { getClassMeta } from "src/client/client-meta/class-meta";
import { getMethodMeta } from "src/client/client-meta/method-meta";
import { ReThrow } from "src/client/type/re-throw";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function ReThrow<T extends AsyncFunction>(
  handle: ReThrow
): ClassDecorator & MethodDecorator<T> {
  return function (target, methodKey) {
    if (undefined === methodKey) {
      const meta = getClassMeta(target as any);
      meta.reThrow.push(handle);
    } else {
      const meta = getMethodMeta((target as any)[methodKey]);
      meta.reThrow.push(handle);
    }
  } as ClassDecorator & MethodDecorator<T>;
}
