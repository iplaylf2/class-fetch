import { RequestContext } from "./request-context";
import { ResponseContext } from "./response-context";

export type Middleware = (
  context: RequestContext,
  next: (context: RequestContext) => Promise<ResponseContext>
) => Promise<ResponseContext>;
