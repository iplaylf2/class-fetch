import { getMethodMeta } from "src/client/client-meta/method-meta";
import { ClientDecoratorError } from "src/client/error";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";
import { expression } from "src/utility/expression";
import { Format } from "src/utility/string";

export function Method<T extends AsyncFunction>(
  method: string,
  path?: string | Format
): MethodDecorator<T>;
export function Method<T extends AsyncFunction>(
  method: string,
  init?: RequestInit
): MethodDecorator<T>;
export function Method<T extends AsyncFunction>(
  method: string,
  path?: string | Format,
  init?: RequestInit
): MethodDecorator<T>;
export function Method<T extends AsyncFunction>(
  method: string,
  param1?: string | Format | RequestInit,
  param2?: RequestInit
): MethodDecorator<T> {
  const [path, init] = expression(() => {
    if (undefined === param1) {
      return [];
    } else {
      if (undefined === param2) {
        return [param1 as string | Format];
      } else {
        return [param1 as string | Format, param2 as RequestInit];
      }
    }
  });

  return function (target, propertyKey) {
    const meta = getMethodMeta((target as any)[propertyKey]);

    if (undefined === method) {
      meta.method = method;
    } else {
      throw new ClientDecoratorError("Method cannot be redefined.");
    }

    meta.path = path as any;
    meta.init = init as any;
  };
}
