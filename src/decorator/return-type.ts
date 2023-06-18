import { AsyncFunction } from "src/kit/type/async-function";
import { UnwrapPromise } from "src/type/async-functions";
import { Callable, Newable } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export type Constructor<T> = Newable<any, T> | Callable<any, T>;

export function ReturnType<T extends AsyncFunction>(
  type: Constructor<UnwrapPromise<ReturnType<T>>>
): MethodDecorator<T> {
  throw "todo";
}
