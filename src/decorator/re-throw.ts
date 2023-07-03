import { getConstructor } from "src/utility/class";
import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { ReThrow } from "../client/type/re-throw";
import { AsyncFunction, Newable } from "../type/function";
import { InstanceMethodDecorator } from "../type/instance-method-decorator";

export function ReThrow<T, M extends AsyncFunction>(
  handler: ReThrow
): ClassDecorator & InstanceMethodDecorator<T, M> {
  return function (target, methodName) {
    if (undefined === methodName) {
      const classMeta = getClassMeta(target as Newable);
      classMeta.reThrow.push(handler);
    } else {
      const classMeta = getClassMeta(getConstructor(target));
      const methodMeta = getMethodMeta(classMeta, methodName);
      methodMeta.reThrow.push(handler);
    }
  } as ClassDecorator & InstanceMethodDecorator<T, M>;
}
