import { Attach } from "src/kit/type/attach";
import { ParameterDecorator } from "src/type/parameter-decorator";

export function Apply<
  Target,
  Key extends keyof Target,
  Index extends number,
  T
>(
  handler: (arg: T, request: Request, attach: Attach) => Request
): ParameterDecorator<Target, Key, Index, T> {
  throw "todo";
}
