import { AsyncFunction } from "src/kit/type/async-function";
import { FetchContext } from "src/kit/type/fetch-context";
import { MethodDecorator } from "src/type/method-decorator";

export function Return<T extends AsyncFunction>(
  handler: (context: FetchContext) => ReturnType<T>
): MethodDecorator<T> {
  throw "todo";
}
