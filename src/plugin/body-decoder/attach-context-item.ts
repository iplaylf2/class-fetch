import { Newable, Callable } from "src/type/function";

export const bodyDecoderSymbol = Symbol("body-decoder");
export type Constructor<T> = Newable<any, T> | Callable<any, T>;
export type BodyDecoder = (
  body: Body,
  type: Constructor<unknown> | null
) => Promise<unknown>;
export type ContentTypeXBodyDecoder = Map<string, BodyDecoder>;

export const defaultBodyDecoderSymbol = Symbol("body-decoder");
