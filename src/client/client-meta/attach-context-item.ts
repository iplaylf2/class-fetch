import { Format } from "../../utility/string";

export const paramContextSymbol = Symbol("param");
export type ParamRecord = Record<string, string>;
export type ParamContext = {
  pathFormat: Format;
  paramRecord: ParamRecord;
  finishHandler: unknown;
};
