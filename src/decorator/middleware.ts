import { Middleware } from "src/kit/type/middleware";

export function Middleware<T extends Middleware<any, any>[]>(
  middlewareList: T
): ClassDecorator & MethodDecorator {
  throw "todo";
}
