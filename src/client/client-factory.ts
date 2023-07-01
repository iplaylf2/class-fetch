import fetch from "cross-fetch";
import { AttachContext } from "src/client/type/attach-context";
import { Middleware } from "src/client/type/middleware";
import {
  BuildError,
  ClassFetchError,
  MiddlewareError,
  PrettyRequestError,
  TransformResponseError,
} from "src/error";
import { from, reduce } from "src/utility/async-iterable";
import { expression } from "src/utility/expression";
import { getClassMeta } from "./client-meta/class-meta";
import { appendPath } from "./utility/append-path";

export class ClientFactory {
  public constructor(private readonly middleware: Middleware[] = []) {}

  public use(...middleware: Middleware[]): ClientFactory {
    return new ClientFactory(this.middleware.concat(middleware));
  }

  public build<T extends {}>(
    ctor: new () => T,
    handler: () => AttachContext
  ): T {
    const classMeta = getClassMeta(ctor);
    if (null === classMeta.request) {
      throw new BuildError("Missing request");
    }

    const x = new Map(
      Array.from(classMeta.method).map(([methodName, methodMeta]) => {
        if (null === methodMeta.method) {
          throw new BuildError("Missing method");
        }

        if (null === methodMeta.return) {
          throw new BuildError("Missing return");
        }

        const init = {
          ...methodMeta.init,
          method: methodMeta.method!,
        };

        const request1 = new Request(classMeta.request!, init);

        const [request2, pathFormat] = expression(() => {
          if (null === methodMeta.path) {
            return [request1, null];
          } else {
            if ("function" === typeof methodMeta.path) {
              return [request1, methodMeta.path];
            } else {
              return [
                new Request(
                  appendPath(request1.url, methodMeta.path),
                  request1
                ),
                null,
              ];
            }
          }
        });

        const middleware = classMeta.middleware.concat(methodMeta.middleware);
        const fetch = middleware.reduceRight(
          (next, middleware) => (request, context) =>
            middleware(
              request,
              async (request) => {
                const middlewareContext = context.get(
                  middlewareContextSymbol
                ) as MiddlewareContext;

                middlewareContext.request.push(request);

                const response = await next(request, context);

                middlewareContext.request.pop();
                middlewareContext.response = response;

                return response;
              },
              context
            ),
          finalFetch
        );

        const reThrow = classMeta.reThrow.concat(methodMeta.reThrow);

        const method = expression(() => {
          if (pathFormat) {
          } else {
            return async (args: unknown[]) => {
              const context = handler();

              try {
                const request3 = await expression(async () => {
                  try {
                    return await reduce(
                      from(methodMeta.parameterMeta),
                      (request, order) =>
                        reduce(
                          from(order),
                          (request, parameterMeta, index) =>
                            reduce(
                              from(parameterMeta),
                              (request, pretty) => {
                                context.set(
                                  prettyRequestContextSymbol,
                                  request
                                );

                                return pretty(args[index], request, context);
                              },
                              request
                            ),
                          request
                        ),
                      request2
                    );
                  } catch (e) {
                    throw new PrettyRequestError(
                      context.get(prettyRequestContextSymbol) as Request,
                      undefined,
                      { cause: e }
                    );
                  } finally {
                    context.delete(prettyRequestContextSymbol);
                  }
                });

                const response = await expression(async () => {
                  context.set(middlewareContextSymbol, {
                    request: [request3],
                    response: null,
                  } satisfies MiddlewareContext);
                  try {
                    return await fetch(request3, context);
                  } catch (e) {
                    const middlewareContext = context.get(
                      middlewareContextSymbol
                    ) as MiddlewareContext;

                    throw new MiddlewareError(
                      middlewareContext.request[
                        middlewareContext.request.length - 1
                      ]!,
                      middlewareContext.response,
                      undefined,
                      { cause: e }
                    );
                  } finally {
                    context.delete(middlewareContextSymbol);
                  }
                });

                return expression(async () => {
                  try {
                    return await methodMeta.return!({
                      request: request3,
                      response,
                      context,
                    });
                  } catch (e) {
                    throw new TransformResponseError(
                      request3,
                      response,
                      undefined,
                      { cause: e }
                    );
                  }
                });
              } catch (error) {
                const fetchContext = expression(() => {
                  switch (Object.getPrototypeOf(error)) {
                    case PrettyRequestError: {
                      const e = error as PrettyRequestError;
                      return { request: e.request, response: null, context };
                    }
                    case MiddlewareError: {
                      const e = error as MiddlewareError;
                      return {
                        request: e.request,
                        response: e.response,
                        context,
                      };
                    }
                    case TransformResponseError:
                      const e = error as TransformResponseError;
                      return {
                        request: e.request,
                        response: e.response,
                        context,
                      };
                    default:
                      throw new ClassFetchError("Unknown error.", {
                        cause: error,
                      });
                  }
                });

                const e = await reduce(
                  from(reThrow),
                  (error, reThrow) => reThrow(error, fetchContext),
                  (error as Error).cause as unknown
                );

                throw e;
              }
            };
          }
        });

        return [
          methodName,
          (args: unknown[]) => {
            return args;
          },
        ];
      })
    );

    throw "todo";
  }
}

const finalFetch = (request: Request, context: AttachContext) => fetch(request);

const prettyRequestContextSymbol = Symbol("pretty-request-context");

const middlewareContextSymbol = Symbol("middleware-context");
type MiddlewareContext = {
  request: Request[];
  response: Response | null;
};
