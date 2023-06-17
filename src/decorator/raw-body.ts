import { ParameterDecorator } from "src/type/parameter-decorator";

export function RawBody<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, BodyInit | null> {
  throw "todo";
}
