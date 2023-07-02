import { Method } from "src/decorator/method";
import { AsyncFunction } from "src/type/function";
import { Format } from "src/utility/string";
import { MethodDecorator } from "src/type/method-decorator";

export const Delete = defineMethod("delete");
export const Get = defineMethod("get");
export const Post = defineMethod("post");
export const Put = defineMethod("put");

function defineMethod(method: string): FixedMethod {
  return (...args: any[]) => Method(method, ...args);
}

type FixedMethod = {
  <T extends AsyncFunction>(path?: string | Format): MethodDecorator<T>;
  <T extends AsyncFunction>(init?: RequestInit): MethodDecorator<T>;
  <T extends AsyncFunction>(
    path: string | Format,
    init: RequestInit
  ): MethodDecorator<T>;
};
