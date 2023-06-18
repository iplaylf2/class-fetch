export type Middleware<T, R> = (
  request: Request,
  next: <T, R>(request: Request, context: T) => Promise<[Response, R]>,
  context: T
) => Promise<R>;
