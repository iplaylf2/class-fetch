import { AsyncFunction } from "src/kit/type/async-function";
import { Middleware } from "src/kit/type/middleware";
import { MethodDecorator } from "src/type/method-decorator";

export function Middleware<T extends AsyncFunction>(
  ...middlewareList: Middleware[]
): ClassDecorator & MethodDecorator<T> {
  throw "todo";
}
