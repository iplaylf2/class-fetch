import { ParameterDecorator } from "../type/parameter-decorator";
import { Apply } from "./apply";

export function Query<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, Record<string, string>>;
export function Query<Target, Key extends keyof Target, Index extends number>(
  name: string
): ParameterDecorator<Target, Key, Index, string>;
export function Query<Target, Key extends keyof Target, Index extends number>(
  name?: string
): ParameterDecorator<Target, Key, Index, any> {
  if (undefined === name) {
    return Apply((arg: Record<string, string>, request) => {
      const url = new URL(request.url);

      for (const [name, value] of Object.entries(arg)) {
        url.searchParams.append(name, value);
      }

      return new Request(url.toString(), request);
    });
  } else {
    return Apply((arg: string, request) => {
      const url = new URL(request.url);

      url.searchParams.append(name, arg);

      return new Request(url.toString(), request);
    });
  }
}
