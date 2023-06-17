import { ParameterDecorator } from "src/type/parameter-decorator";

export function Body<Target, Key extends keyof Target, Index extends number>(
  contentType: string
): ParameterDecorator<Target, Key, Index, any> {
  throw "todo";
}
