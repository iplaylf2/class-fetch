import { Attach } from "./attach";

export type FetchContext = {
  request: Request;
  response: Response;
  attach: Attach;
};
