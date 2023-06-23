import { Return } from "src/client/type/return";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";

export function Return<T extends AsyncFunction>(
  handler: Return
): MethodDecorator<T> {
  throw "todo";
}
