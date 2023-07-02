import { Method } from "../../decorator/method";
import { AsyncFunction } from "../../type/function";
import { MethodDecorator } from "../../type/method-decorator";
import { Format } from "../../utility/string";

export const Delete = defineMethod("delete");
export const Get = defineMethod("get");
export const Post = defineMethod("post");
export const Put = defineMethod("put");

export type FixedMethod = {
  <T extends AsyncFunction>(path?: string | Format): MethodDecorator<T>;
  <T extends AsyncFunction>(init?: RequestInit): MethodDecorator<T>;
  <T extends AsyncFunction>(
    path: string | Format,
    init: RequestInit
  ): MethodDecorator<T>;
};

function defineMethod(method: string): FixedMethod {
  return (...args: any[]) => Method(method, ...args);
}
