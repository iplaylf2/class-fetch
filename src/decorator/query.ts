import { ParameterDecorator } from "src/type/parameter-decorator";

export function Query<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, Record<string, string>>;
export function Query<Target, Key extends keyof Target, Index extends number>(
  key: string
): ParameterDecorator<Target, Key, Index, string>;
export function Query<Target, Key extends keyof Target, Index extends number>(
  key?: string
): ParameterDecorator<Target, Key, Index, any> {
  throw "todo";
}
