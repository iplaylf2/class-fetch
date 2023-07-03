import { getClassMeta, getMethodMeta } from "../client/client-meta/class-meta";
import { DecoratorError } from "../error";
import { AsyncFunction } from "../type/function";
import { InstanceMethodDecorator } from "../type/instance-method-decorator";
import { getConstructor } from "../utility/class";
import { expression } from "../utility/expression";
import { Format } from "../utility/string";

export function Method<T, M extends AsyncFunction>(
  method: string,
  path?: string | Format
): InstanceMethodDecorator<T, M>;
export function Method<T, M extends AsyncFunction>(
  method: string,
  init?: RequestInit
): InstanceMethodDecorator<T, M>;
export function Method<T, M extends AsyncFunction>(
  method: string,
  path: string | Format,
  init: RequestInit
): InstanceMethodDecorator<T, M>;
export function Method<T, M extends AsyncFunction>(
  method: string,
  param1?: string | Format | RequestInit,
  param2?: RequestInit
): InstanceMethodDecorator<T, M> {
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
    const classMeta = getClassMeta(getConstructor(target));
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
