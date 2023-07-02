import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { Return } from "../client/type/return";
import { DecoratorError } from "../error";
import { AsyncFunction, Newable } from "../type/function";
import { MethodDecorator } from "../type/method-decorator";

export function Return<T extends AsyncFunction>(
  handler: Return
): MethodDecorator<T> {
  return function (target, propertyKey) {
    const classMeta = getClassMeta(target as Newable);
    const methodMeta = getMethodMeta(classMeta, propertyKey);
    if (methodMeta.return) {
      throw new DecoratorError("Return cannot be redefined.");
    } else {
      methodMeta.return = handler;
    }
  };
}
