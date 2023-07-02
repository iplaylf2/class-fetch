import { ParameterDecorator } from "../type/parameter-decorator";
import { Apply } from "./apply";

export function RawBody<
  Target,
  Key extends keyof Target,
  Index extends number
>(): ParameterDecorator<Target, Key, Index, BodyInit | null> {
  return Apply((arg: BodyInit | null, request) => {
    return new Request(request, { body: arg });
  });
}
