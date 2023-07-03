import { Method } from "../../decorator/method";
import { AsyncFunction } from "../../type/function";
import { InstanceMethodDecorator } from "../../type/instance-method-decorator";
import { Format } from "../../utility/string";

export const Delete = defineMethod("delete");
export const Get = defineMethod("get");
export const Post = defineMethod("post");
export const Put = defineMethod("put");

export type FixedMethod = {
  <T, M extends AsyncFunction>(path?: string | Format): InstanceMethodDecorator<
    T,
    M
  >;
  <T, M extends AsyncFunction>(init?: RequestInit): InstanceMethodDecorator<
    T,
    M
  >;
  <T, M extends AsyncFunction>(
    path: string | Format,
    init: RequestInit
  ): InstanceMethodDecorator<T, M>;
};

function defineMethod(method: string): FixedMethod {
  return (...args: any[]) => Method(method, ...args);
}
