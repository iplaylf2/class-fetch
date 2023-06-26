import { getClassMeta, getMethodMeta } from "src/client/client-meta/class-meta";
import { ReThrow } from "src/client/type/re-throw";
import { AsyncFunction, Newable } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function ReThrow<T extends AsyncFunction>(
  handle: ReThrow
): ClassDecorator & MethodDecorator<T> {
  return function (target, methodKey) {
    if (undefined === methodKey) {
      const meta = getClassMeta(target as Newable);
      meta.reThrow.push(handle);
    } else {
      const meta = getMethodMeta(target as Newable, methodKey);
      meta.reThrow.push(handle);
    }
  } as ClassDecorator & MethodDecorator<T>;
}
