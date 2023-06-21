import { AttachContext } from "src/kit/type/attach-context";
import { ParameterDecorator } from "src/type/parameter-decorator";

export function Apply<
  Target,
  Key extends keyof Target,
  Index extends number,
  T
>(
  handler: (arg: T, request: Request, context: AttachContext) => Request
): ParameterDecorator<Target, Key, Index, T> {
  throw "todo";
}
