import { getClassMeta, getMethodMeta } from "src/client/client-meta/class-meta";
import { Return } from "src/client/type/return";
import { ClassFetchDecoratorError } from "src/error";
import { AsyncFunction, Newable } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Return<T extends AsyncFunction>(
  handler: Return
): MethodDecorator<T> {
  return function (target, propertyKey) {
    const classMeta = getClassMeta(target as Newable);
    const methodMeta = getMethodMeta(classMeta, propertyKey);
    if (methodMeta.return) {
      throw new ClassFetchDecoratorError("Return cannot be redefined.");
    } else {
      methodMeta.return = handler;
    }
  };
}
