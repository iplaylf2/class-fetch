import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { ReThrow } from "../client/type/re-throw";
import { AsyncFunction, Newable } from "../type/function";
import { MethodDecorator } from "../type/method-decorator";

export function ReThrow<T extends AsyncFunction>(
  handler: ReThrow
): ClassDecorator & MethodDecorator<T> {
  return function (target, methodName) {
    if (undefined === methodName) {
      const classMeta = getClassMeta(target as Newable);
      classMeta.reThrow.push(handler);
    } else {
      const classMeta = getClassMeta(target as Newable);
      const methodMeta = getMethodMeta(classMeta, methodName);
      methodMeta.reThrow.push(handler);
    }
  } as ClassDecorator & MethodDecorator<T>;
}
