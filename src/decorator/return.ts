import { getMethodMeta } from "src/client/client-meta/class-meta";
import { Return } from "src/client/type/return";
import { ClassFetchDecoratorError } from "src/error";
import { AsyncFunction, Newable } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Return<T extends AsyncFunction>(
  handle: Return
): MethodDecorator<T> {
  return function (target, propertyKey) {
    const meta = getMethodMeta(target as Newable, propertyKey);
    if (meta.return) {
      throw new ClassFetchDecoratorError("Return cannot be redefined.");
    } else {
      meta.return = handle;
    }
  };
}
