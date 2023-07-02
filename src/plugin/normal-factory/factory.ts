import { ClientFactory } from "src/client/client-factory";
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

export const factory = new ClientFactory(
  [],
  new Map<unknown, unknown>([
    [bodyDecoderSymbol, new Map(Object.entries(bodyDecoder))],
    [defaultBodyDecoderSymbol, defaultBodyDecoder],
    [bodyEncoderSymbol, new Map(Object.entries(bodyEncoder))],
    [defaultBodyEncoderSymbol, defaultBodyEncoder],
  ])
);
