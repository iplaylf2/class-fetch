import { ParameterDecorator } from "src/type/parameter-decorator";
import { Apply } from "./apply";

export function Body<Target, Key extends keyof Target, Index extends number>(
  contentType: string
): ParameterDecorator<Target, Key, Index, any> {
  return Apply((arg: unknown, request, context) => {
    const headers = new Headers(request.headers);
    headers.append("Content-type", contentType);
    // get encoder from context
    // encode(contentType,arg)
    return new Request(request, { headers, body });
  });
}
