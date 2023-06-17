import { ParameterDecorator } from "src/type/parameter-decorator";

export function RequestInit<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, RequestInit> {
  throw "todo";
}
