export type Middleware = (
  request: Request,
  next: (request: Request, context: unknown) => Promise<[Response, unknown]>,
  context: unknown
) => Promise<unknown>;
