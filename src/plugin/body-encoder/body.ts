import { Apply } from "../../decorator/apply";
import { PrettyRequestError } from "../../error";
import { InstanceParameterDecorator } from "../../type/instance-parameter-decorator";
import { expression } from "../../utility/expression";
import {
  BodyEncoder,
  ContentTypeXBodyEncoder,
  bodyEncoderSymbol,
  defaultBodyEncoderSymbol,
} from "./attach-context-item";

export function Body<Target, Key extends keyof Target, Index extends number>(
  contentType: string
): InstanceParameterDecorator<Target, Key, Index, any> {
  return Apply(async (arg: unknown, request, context) => {
    const contentTypeXBodyEncoder = context.get(bodyEncoderSymbol) as
      | ContentTypeXBodyEncoder
      | undefined;

    if (undefined === contentTypeXBodyEncoder) {
      throw new PrettyRequestError(request, "Missing BodyEncoder.");
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
          throw new PrettyRequestError(request, "Missing default BodyEncoder.");
        }
      }
    });

    const body = await expression(async () => {
      try {
        return (await encoder(arg)) as BodyInit;
      } catch (e) {
        throw new PrettyRequestError(request, "Encode failed.", {
          cause: e,
        });
      }
    });

    const headers = new Headers(request.headers);
    headers.append("content-type", contentType);
    // get encoder from context
    // encode(contentType,arg)
    return new Request(request, { headers, body });
  });
}
