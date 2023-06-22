import { FetchContext } from "src/kit/type/fetch-context";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function ReThrow<T extends AsyncFunction>(
  handler: (error: unknown, context: FetchContext) => unknown | Promise<unknown>
): ClassDecorator & MethodDecorator<T> {
  throw "todo";
}
