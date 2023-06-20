import { ParameterDecorator } from "src/type/parameter-decorator";

export function Header<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, HeadersInit>;
export function Header<Target, Key extends keyof Target, Index extends number>(
  header: string
): ParameterDecorator<Target, Key, Index, string>;
export function Header<Target, Key extends keyof Target, Index extends number>(
  header?: string
): ParameterDecorator<Target, Key, Index, any> {
  throw "todo";
}
