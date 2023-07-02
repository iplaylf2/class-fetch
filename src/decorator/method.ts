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
  path: string | Format,
  init: RequestInit
): MethodDecorator<T>;
export function Method<T extends AsyncFunction>(
  method: string,
  param1?: string | Format | RequestInit,
  param2?: RequestInit
): MethodDecorator<T> {
  const [path, init] = expression(() => {
    switch (typeof param1) {
      case "undefined":
        return [null, null];
      case "object":
        return [null, param1];
      default:
        return [param1, param2 ?? null];
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
