import { AsyncFunction } from "src/kit/type/async-function";
import { MethodDecorator } from "src/type/method-decorator";

export function Method<T extends AsyncFunction>(
  method: string,
  path?: string
): MethodDecorator<T>;
export function Method<T extends AsyncFunction>(
  method: string,
  init?: RequestInit
): MethodDecorator<T>;
export function Method<T extends AsyncFunction>(
  method: string,
  path?: string,
  init?: RequestInit
): MethodDecorator<T>;
export function Method<T extends AsyncFunction>(
  method: string,
  param1?: string | RequestInit,
  param2?: RequestInit
): MethodDecorator<T> {
  throw "todo";
}
