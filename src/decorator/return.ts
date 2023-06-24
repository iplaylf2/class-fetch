import { getMethodMeta } from "src/client/client-meta/method-meta";
import { Return } from "src/client/type/return";
import { ClassFetchDecoratorError } from "src/error";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Return<T extends AsyncFunction>(
  handler: Return
): MethodDecorator<T> {
  return function (target, propertyKey) {
    const meta = getMethodMeta((target as any)[propertyKey]);
    if (meta.return) {
      throw new ClassFetchDecoratorError("Return cannot be redefined.");
    } else {
      meta.return = handler;
    }
  };
}
