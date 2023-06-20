import { RequestContext } from "./request-context";
import { ResponseContext } from "./response-context";

export type FetchContext = RequestContext & ResponseContext;
