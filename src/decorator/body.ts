import { ClassFetchPrettyRequestError } from "src/error";
import {
  BodyEncoder,
  ContentTypeXBodyEncoder,
  bodyEncoderSymbol,
  defaultBodyEncoderSymbol,
} from "src/plugin/body-encoder/attach-context-item";
import { ParameterDecorator } from "src/type/parameter-decorator";
import { expression } from "src/utility/expression";
import { Apply } from "./apply";

export function Body<Target, Key extends keyof Target, Index extends number>(
  contentType: string
): ParameterDecorator<Target, Key, Index, any> {
  return Apply((arg: unknown, request, context) => {
    const contentTypeXBodyEncoder = context.get(bodyEncoderSymbol) as
      | ContentTypeXBodyEncoder
      | undefined;

    if (undefined === contentTypeXBodyEncoder) {
      throw new ClassFetchPrettyRequestError("Missing BodyEncoder.");
    }

    const encoder = expression(() => {
      const encoder = contentTypeXBodyEncoder.get(contentType);
      if (encoder) {
        return encoder;
      } else {
        const encoder = context.get(defaultBodyEncoderSymbol) as
          | BodyEncoder
          | undefined;

        if (encoder) {
          return encoder;
        } else {
          throw new ClassFetchPrettyRequestError(
            "Missing default BodyEncoder."
          );
        }
      }
    });

    const body = expression(() => {
      try {
        return encoder(arg) as BodyInit;
      } catch (e) {
        throw new ClassFetchPrettyRequestError(e as Error);
      }
    });

    const headers = new Headers(request.headers);
    headers.append("content-type", contentType);
    // get encoder from context
    // encode(contentType,arg)
    return new Request(request, { headers, body });
  });
}
