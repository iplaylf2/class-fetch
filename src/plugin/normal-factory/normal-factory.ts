import { ClientFactory } from "src/client/client-factory";
import { Middleware } from "src/client/type/middleware";
import {
  bodyDecoderSymbol,
  defaultBodyDecoderSymbol,
} from "../body-decoder/attach-context-item";
import { bodyDecoder, defaultBodyDecoder } from "../body-decoder/body-decoder";
import {
  bodyEncoderSymbol,
  defaultBodyEncoderSymbol,
} from "../body-encoder/attach-context-item";
import { bodyEncoder, defaultBodyEncoder } from "../body-encoder/body-encoder";

export function use(...middleware: Middleware[]): ClientFactory {
  return factory.use(...middleware);
}

export function append(context: Map<unknown, unknown>): ClientFactory {
  return factory.append(context);
}

export function build<T extends {}>(ctor: new () => T): T {
  return factory.build(ctor);
}

const factory = new ClientFactory(
  [],
  new Map<unknown, unknown>([
    [bodyDecoderSymbol, new Map(Object.entries(bodyDecoder))],
    [defaultBodyDecoderSymbol, defaultBodyDecoder],
    [bodyEncoderSymbol, new Map(Object.entries(bodyEncoder))],
    [defaultBodyEncoderSymbol, defaultBodyEncoder],
  ])
);
