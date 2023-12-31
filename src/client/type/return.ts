import { FetchContext } from "./fetch-context";

export type Return = (
  context: FetchContext & { response: Response }
) => unknown;
