import { FetchContext } from "./fetch-context";

export type ReThrow = (
  error: unknown,
  context: FetchContext
) => unknown | Promise<unknown>;
