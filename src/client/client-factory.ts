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
import {
  ParamContext,
  paramContextSymbol,
} from "./client-meta/attach-context-item";
import {
  ParameterMeta,
  ParameterMetaOrder,
} from "./client-meta/parameter-meta";
import { MethodMeta } from "./client-meta/method-meta";
import { Format } from "src/utility/string";
import { ReThrow } from "./type/re-throw";
import { Return } from "./type/return";

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

    const nameXMethod = new Map(
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

        const [request2, pathFormat] = processPath(methodMeta, request1);

        const fetch = processMiddleware(
          classMeta.middleware.concat(methodMeta.middleware)
        );

        const reThrow = classMeta.reThrow.concat(methodMeta.reThrow);

        const method = pathFormat
          ? async (args: unknown[]) => {
              const context = handler();

              try {
                const request3 = await prettyRequestWithFormat(
                  args,
                  request2,
                  context,
                  methodMeta.parameterMeta,
                  pathFormat
                );

                const response = await applyMiddleware(
                  request3,
                  fetch,
                  context
                );

                const result = await transformResponse(
                  request3,
                  response,
                  context,
                  methodMeta.return!
                );

                return result;
              } catch (error) {
                throw await prettyError(error, reThrow, context);
              }
            }
          : async (args: unknown[]) => {
              const context = handler();

              try {
                const request3 = await prettyRequest(
                  args,
                  request2,
                  context,
                  methodMeta.parameterMeta
                );

                const response = await applyMiddleware(
                  request3,
                  fetch,
                  context
                );

                const result = await transformResponse(
                  request3,
                  response,
                  context,
                  methodMeta.return!
                );

                return result;
              } catch (error) {
                throw await prettyError(error, reThrow, context);
              }
            };

        return [methodName, method];
      })
    );

    return new Proxy(new ctor(), {
      get(target, p) {
        const method = nameXMethod.get(p);
        return method ? method : (target as any)[p];
      },
    });
  }
}

function processPath(
  methodMeta: MethodMeta,
  request: Request
): [Request, Format | null] {
  return null === methodMeta.path
    ? [request, null]
    : "function" === typeof methodMeta.path
    ? [request, methodMeta.path]
    : [new Request(appendPath(request.url, methodMeta.path), request), null];
}

function processMiddleware(middleware: Middleware[]) {
  return middleware.reduceRight(
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
}

function prettyError(
  error: unknown,
  reThrow: ReThrow[],
  context: AttachContext
) {
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

  return reduce(
    from(reThrow),
    (error, reThrow) => reThrow(error, fetchContext),
    (error as Error).cause as unknown
  );
}

async function prettyRequest(
  args: unknown[],
  request: Request,
  context: AttachContext,
  parameterMeta: ParameterMeta[][]
) {
  try {
    return await reduce(
      from(parameterMeta),
      (request, order) =>
        reduce(
          from(order),
          (request, parameterMeta, index) =>
            reduce(
              from(parameterMeta),
              (request, pretty) => {
                context.set(prettyRequestContextSymbol, request);

                return pretty(args[index], request, context);
              },
              request
            ),
          request
        ),
      request
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
}

function prettyRequestWithFormat(
  args: unknown[],
  request: Request,
  context: AttachContext,
  parameterMeta: ParameterMeta[][],
  pathFormat: Format
) {
  const applyList = parameterMeta[ParameterMetaOrder.Apply] ?? [];
  context.set(paramContextSymbol, {
    pathFormat: pathFormat,
    paramRecord: {},
    finishHandler: applyList[applyList.length - 1],
  } satisfies ParamContext);

  try {
    return prettyRequest(args, request, context, parameterMeta);
  } finally {
    context.delete(paramContextSymbol);
  }
}

async function applyMiddleware(
  request: Request,
  fetch: (request: Request, context: AttachContext) => Promise<Response>,
  context: AttachContext
) {
  context.set(middlewareContextSymbol, {
    request: [request],
    response: null,
  } satisfies MiddlewareContext);

  try {
    return await fetch(request, context);
  } catch (e) {
    const middlewareContext = context.get(
      middlewareContextSymbol
    ) as MiddlewareContext;

    throw new MiddlewareError(
      middlewareContext.request[middlewareContext.request.length - 1]!,
      middlewareContext.response,
      undefined,
      { cause: e }
    );
  } finally {
    context.delete(middlewareContextSymbol);
  }
}

async function transformResponse(
  request3: Request,
  response: Response,
  context: AttachContext,
  returnX: Return
) {
  try {
    return await returnX({
      request: request3,
      response,
      context,
    });
  } catch (e) {
    throw new TransformResponseError(request3, response, undefined, {
      cause: e,
    });
  }
}

const finalFetch = (request: Request, context: AttachContext) => fetch(request);

const prettyRequestContextSymbol = Symbol("pretty-request-context");

const middlewareContextSymbol = Symbol("middleware-context");
type MiddlewareContext = {
  request: Request[];
  response: Response | null;
};
