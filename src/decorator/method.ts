import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";
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
  throw "todo";
}
