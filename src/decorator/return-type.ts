import { AsyncFunction, Callable, Newable } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";
import { UnwrapPromise } from "src/type/promise";

export type Constructor<T> = Newable<any, T> | Callable<any, T>;

export function ReturnType<T extends AsyncFunction>(
  type: Constructor<UnwrapPromise<ReturnType<T>>[number]>,
  isArray: true
): MethodDecorator<T>;
export function ReturnType<T extends AsyncFunction>(
  type: Constructor<UnwrapPromise<ReturnType<T>>>,
  isArray?: false
): MethodDecorator<T>;
export function ReturnType<T extends AsyncFunction>(
  type: Constructor<UnwrapPromise<ReturnType<T>>>,
  isArray = false
): MethodDecorator<T> {
  throw "todo";
}
