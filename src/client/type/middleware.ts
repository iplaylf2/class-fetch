import { AttachContext } from "./attach-context";

export type Middleware = (
  request: Request,
  next: (request: Request) => Promise<Response>,
  context: AttachContext
) => Promise<Response>;
