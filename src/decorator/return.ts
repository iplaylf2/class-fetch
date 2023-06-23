import { getMethodMeta } from "src/client/client-meta/method-meta";
import { ClientDecoratorError } from "src/client/error";
import { Return } from "src/client/type/return";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Return<T extends AsyncFunction>(
  handler: Return
): MethodDecorator<T> {
  return function (target, propertyKey) {
    const meta = getMethodMeta((target as any)[propertyKey]);
    if (undefined === meta.return) {
      meta.return = handler;
    } else {
      throw new ClientDecoratorError("Return cannot be redefined.");
    }
  };
}
