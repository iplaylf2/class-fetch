import { Middleware } from "src/kit/type/middleware";

export function Middleware<T extends Middleware[]>(
  middlewareList: T
): ClassDecorator & MethodDecorator {
  throw "todo";
}
