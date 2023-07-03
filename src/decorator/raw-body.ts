import { InstanceParameterDecorator } from "../type/instance-parameter-decorator";
import { Apply } from "./apply";

export function RawBody<
  Target,
  Key extends keyof Target,
  Index extends number
>(): InstanceParameterDecorator<Target, Key, Index, BodyInit | null> {
  return Apply((arg: BodyInit | null, request) => {
    return new Request(request, { body: arg });
  });
}
