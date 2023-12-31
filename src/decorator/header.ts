import { Request, Headers } from "cross-fetch";
import { InstanceParameterDecorator } from "../type/instance-parameter-decorator";
import { Apply } from "./apply";

export function Header<
  Target,
  Key extends keyof Target,
  Index extends number
>(): InstanceParameterDecorator<Target, Key, Index, HeadersInit>;
export function Header<Target, Key extends keyof Target, Index extends number>(
  name: string
): InstanceParameterDecorator<Target, Key, Index, string>;
export function Header<Target, Key extends keyof Target, Index extends number>(
  name?: string
): InstanceParameterDecorator<Target, Key, Index, any> {
  if (undefined === name) {
    return Apply((arg: Record<string, string>, request) => {
      const headers = new Headers(request.headers);

      for (const [name, value] of Object.entries(arg)) {
        headers.append(name, value);
      }

      return new Request(request, { headers });
    });
  } else {
    return Apply((arg: string, request) => {
      const headers = new Headers(request.headers);

      headers.append(name, arg);

      return new Request(request, { headers });
    });
  }
}
