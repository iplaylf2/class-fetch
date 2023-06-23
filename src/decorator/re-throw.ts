import { ReThrow } from "src/client/type/re-throw";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function ReThrow<T extends AsyncFunction>(
  handler: ReThrow
): ClassDecorator & MethodDecorator<T> {
  throw "todo";
}
