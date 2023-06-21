import { AttachContext } from "./attach-context";

export type FetchContext = {
  request: Request;
  response: Response;
  context: AttachContext;
};
