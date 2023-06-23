import { AttachContext } from "./attach-context";

export type PrettyRequest<T> = (
  arg: T,
  request: Request,
  context: AttachContext
) => Request;
