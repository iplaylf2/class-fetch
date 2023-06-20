import { Attach } from "./attach";

export type Middleware = (
  request: Request,
  next: (request: Request) => Promise<Response>,
  attach: Attach
) => Promise<Response>;
