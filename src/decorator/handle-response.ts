import { AsyncFunction } from "src/kit/type/async-function";
import { MethodDecorator } from "src/type/method-decorator";

export function HandleResponse<T extends AsyncFunction>(
  handler: (response: Response) => ReturnType<T>
): MethodDecorator<T> {
  throw "todo";
}
