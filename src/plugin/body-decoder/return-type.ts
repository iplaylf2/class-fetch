import { Return } from "../../decorator/return";
import { TransformResponseError } from "../../error";
import { AsyncFunction } from "../../type/function";
import { MethodDecorator } from "../../type/method-decorator";
import { UnwrapPromise } from "../../type/promise";
import { expression } from "../../utility/expression";
import {
  BodyDecoder,
  Constructor,
  ContentTypeXBodyDecoder,
  bodyDecoderSymbol,
  defaultBodyDecoderSymbol,
} from "./attach-context-item";
import { CanBeArray } from "./type";

export function ReturnType<T extends AsyncFunction>(
  type: Constructor<CanBeArray<UnwrapPromise<ReturnType<T>>>>
): MethodDecorator<T> {
  return Return(async (context) => {
    const contentTypeXBodyDecoder = context.context.get(bodyDecoderSymbol) as
      | ContentTypeXBodyDecoder
      | undefined;

    if (undefined === contentTypeXBodyDecoder) {
      throw new TransformResponseError(
        context.request,
        context.response,
        "Missing BodyDecoder."
      );
    }

    const contentType = context.response.headers.get("content-type");
    if (null === contentType) {
      throw new TransformResponseError(
        context.request,
        context.response,
        "Missing content-type."
      );
    }

    const decoder = expression(() => {
      const decoder = contentTypeXBodyDecoder.get(contentType);
      if (decoder) {
        return decoder;
      } else {
        const decoder = context.context.get(defaultBodyDecoderSymbol) as
          | BodyDecoder
          | undefined;

        if (decoder) {
          return decoder;
        } else {
          throw new TransformResponseError(
            context.request,
            context.response,
            "Missing default BodyDecoder."
          );
        }
      }
    });

    try {
      return await decoder(context.response, type);
    } catch (e) {
      throw new TransformResponseError(
        context.request,
        context.response,
        "Decode failed.",
        {
          cause: e,
        }
      );
    }
  });
}
