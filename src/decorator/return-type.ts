import { ClassFetchTransformResponseError } from "src/error";
import {
  BodyDecoder,
  Constructor,
  ContentTypeXBodyDecoder,
  bodyDecoderSymbol,
  defaultBodyDecoderSymbol,
} from "src/plugin/body-decoder/attach-context-item";
import { AsyncFunction } from "src/type/function";
import { MethodDecorator } from "src/type/method-decorator";
import { UnwrapPromise } from "src/type/promise";
import { Return } from "./return";
import { expression } from "src/utility/expression";

export function ReturnType<T extends AsyncFunction>(
  type: Constructor<UnwrapPromise<ReturnType<T>>>
): MethodDecorator<T> {
  return Return((context) => {
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
      if (undefined === decoder) {
        const decoder = context.context.get(defaultBodyDecoderSymbol) as
          | BodyDecoder
          | undefined;

        if (undefined === decoder) {
          throw new ClassFetchTransformResponseError(
            "Missing default BodyDecoder."
          );
        } else {
          return decoder;
        }
      } else {
        return decoder;
      }
    });

    try {
      return decoder(context.response, type);
    } catch (e) {
      throw new ClassFetchTransformResponseError(String(e));
    }
  });
}
