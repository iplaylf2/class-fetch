import { AsyncFunction } from "src/kit/type/async-function";
import { ResponseContext } from "src/kit/type/response-context";
import { MethodDecorator } from "src/type/method-decorator";

export function ReThrow<T extends AsyncFunction>(
  handler: (
    error: unknown,
    context: ResponseContext
  ) => unknown | Promise<unknown>
): ClassDecorator & MethodDecorator<T> {
  throw "todo";
}
