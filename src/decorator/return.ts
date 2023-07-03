import { getConstructor } from "src/utility/class";
import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { Return } from "../client/type/return";
import { DecoratorError } from "../error";
import { AsyncFunction } from "../type/function";
import { InstanceMethodDecorator } from "../type/instance-method-decorator";

export function Return<T, M extends AsyncFunction>(
  handler: Return
): InstanceMethodDecorator<T, M> {
  return function (target, propertyKey) {
    const classMeta = getClassMeta(getConstructor(target));
    const methodMeta = getMethodMeta(classMeta, propertyKey);
    if (methodMeta.return) {
      throw new DecoratorError("Return cannot be redefined.");
    } else {
      methodMeta.return = handler;
    }
  };
}
