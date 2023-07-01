import { getClassMeta, getMethodMeta } from "src/client/client-meta/class-meta";
import { DecoratorError } from "src/error";
import { AsyncFunction, Newable } from "src/type/function";
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
      return [null, null];
    } else {
      if (undefined === param2) {
        return [param1 as string | Format, null];
      } else {
        return [param1 as string | Format, param2 as RequestInit];
      }
    }
  });

  return function (target, propertyKey) {
    const classMeta = getClassMeta(target as Newable);
    const methodMeta = getMethodMeta(classMeta, propertyKey);

    if (null === methodMeta.method) {
      methodMeta.method = method;
    } else {
      throw new DecoratorError("Method cannot be redefined.");
    }

    methodMeta.path = path;
    methodMeta.init = init;
  };
}
