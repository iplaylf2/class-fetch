import { Format } from "src/utility/string";

export const paramSymbol = Symbol("param");
export type ParamRecord = Record<string, string>;
export type ParamType = {
  pathFormat: Format;
  paramRecord: ParamRecord;
  finishHandler: unknown;
};
