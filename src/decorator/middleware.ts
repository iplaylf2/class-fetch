import { Middleware } from "src/client/type/middleware";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Middleware<T extends AsyncFunction>(
  ...middlewareList: Middleware[]
): ClassDecorator & MethodDecorator<T> {
  throw "todo";
}
