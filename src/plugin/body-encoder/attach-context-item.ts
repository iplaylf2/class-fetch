export const bodyEncoderSymbol = Symbol("body-encoder");
export type BodyEncoder = (body: unknown) => unknown;
export type ContentTypeXBodyEncoder = Map<string, BodyEncoder>;

export const defaultBodyEncoderSymbol = Symbol("body-encoder");
