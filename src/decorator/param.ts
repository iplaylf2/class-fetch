import { ParameterDecorator } from "src/type/parameter-decorator";

export function Param<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, Record<string, string>>;
export function Param<Target, Key extends keyof Target, Index extends number>(
  key: string
): ParameterDecorator<Target, Key, Index, string>;
export function Param<Target, Key extends keyof Target, Index extends number>(
  key?: string
): ParameterDecorator<Target, Key, Index, any> {
  throw "todo";
}
