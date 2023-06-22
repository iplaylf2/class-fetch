import { FetchContext } from "src/kit/type/fetch-context";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Return<T extends AsyncFunction>(
  handler: (context: FetchContext) => ReturnType<T>
): MethodDecorator<T> {
  throw "todo";
}
