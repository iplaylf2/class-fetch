import { Request, Headers } from "cross-fetch";
import {
  getClassMeta,
  getMethodMeta,
} from "../../client/client-meta/class-meta";
import { getParameterMeta } from "../../client/client-meta/method-meta";
import { ParameterMetaOrder } from "../../client/client-meta/parameter-meta";
import { PrettyRequest } from "../../client/type/pretty-request";
import { PrettyRequestError } from "../../error";
import { InstanceParameterDecorator } from "../../type/instance-parameter-decorator";
import { getConstructor } from "../../utility/class";
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
  return function (target, propertyKey, parameterIndex) {
    const classMeta = getClassMeta(getConstructor(target));
    const methodMeta = getMethodMeta(classMeta, propertyKey as string);
    const parameterMeta = getParameterMeta(
      methodMeta,
      ParameterMetaOrder.Body,
      parameterIndex
    );

    const handler: PrettyRequest<unknown> = async (arg, request, context) => {
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
            throw new PrettyRequestError(
              request,
              "Missing default BodyEncoder."
            );
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

      return new Request(request, { headers, body });
    };

    parameterMeta.push(handler);
  } as InstanceParameterDecorator<Target, Key, Index, any>;
}
