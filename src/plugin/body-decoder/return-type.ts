import { Return } from "src/decorator/return";
import { ClassFetchTransformResponseError } from "src/error";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";
import { UnwrapPromise } from "src/type/promise";
import { expression } from "src/utility/expression";
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
      throw new ClassFetchTransformResponseError("Missing BodyDecoder.");
    }

    const contentType = context.response.headers.get("content-type");
    if (null === contentType) {
      throw new ClassFetchTransformResponseError("Missing content-type.");
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
          throw new ClassFetchTransformResponseError(
            "Missing default BodyDecoder."
          );
        }
      }
    });

    try {
      return await decoder(context.response, type);
    } catch (e) {
      throw new ClassFetchTransformResponseError(e as Error);
    }
  });
}
