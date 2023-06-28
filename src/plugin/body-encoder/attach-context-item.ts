export const bodyEncoderSymbol = Symbol("body-encoder");
export type BodyEncoder = (body: unknown) => unknown | Promise<unknown>;
export type ContentTypeXBodyEncoder = Map<string, BodyEncoder>;

export const defaultBodyEncoderSymbol = Symbol("default-body-encoder");
