import { ParameterDecorator } from "../type/parameter-decorator";
import { Apply } from "./apply";

export function RequestInit<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, RequestInit> {
  return Apply((arg: RequestInit, request) => {
    return new Request(request, arg);
  });
}
