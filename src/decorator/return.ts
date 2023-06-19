import { AsyncFunction } from "src/kit/type/async-function";
import { ResponseContext } from "src/kit/type/response-context";
import { MethodDecorator } from "src/type/method-decorator";

export function Return<T extends AsyncFunction>(
  handler: (context: ResponseContext) => ReturnType<T>
): MethodDecorator<T> {
  throw "todo";
}
