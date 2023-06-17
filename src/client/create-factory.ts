export function createFactory(config: {
  handleRequest?: (request: Request) => Request | Promise<Request>;
  injectResponse?: (response: Response) => unknown | Promise<unknown>;
}): <T>(ctor: new () => T) => T {
  throw "todo";
}
