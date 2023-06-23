import { AttachContext } from "./attach-context";

export type PrettyRequest = (
  arg: unknown,
  request: Request,
  context: AttachContext
) => Request;
