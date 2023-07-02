import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { DecoratorError } from "../error";
import { AsyncFunction, Newable } from "../type/function";
import { MethodDecorator } from "../type/method-decorator";
import { expression } from "../utility/expression";
import { Format } from "../utility/string";

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
      methodMeta.path = path;
      methodMeta.init = init;
    } else {
      throw new DecoratorError("Method cannot be redefined.");
    }
  };
}
