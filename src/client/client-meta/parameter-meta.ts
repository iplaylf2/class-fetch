import { PrettyRequest } from "../type/pretty-request";

export type ParameterMeta = PrettyRequest<any>[];

export enum ParameterMetaOrder {
  Param = 0,
  Apply = 1,
  Body = 2,
}
