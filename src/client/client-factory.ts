import fetch from "cross-fetch";
import { AttachContext } from "src/client/type/attach-context";
import { Middleware } from "src/client/type/middleware";
import { ClassFetchBuildError } from "src/error";
import { Callable } from "src/type/function";
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
      throw new ClassFetchBuildError("Missing request");
    }

    const x = new Map(
      Array.from(classMeta.method).map(([methodName, methodMeta]) => {
        if (null === methodMeta.method) {
          throw new ClassFetchBuildError("Missing method");
        }

        if (null === methodMeta.return) {
          throw new ClassFetchBuildError("Missing return");
        }

        const init = {
          ...methodMeta.init,
          method: methodMeta.method!,
        };

        const [request, pathFormat] = expression(() => {
          if (null === methodMeta.path) {
            return [new Request(classMeta.request!, init), null];
          } else {
            if ("function" === typeof methodMeta.path) {
              return [new Request(classMeta.request!, init), methodMeta.path];
            } else {
              return [
                new Request(
                  {
                    ...classMeta.request!,
                    url: appendPath(classMeta.request!.url, methodMeta.path),
                  },
                  init
                ),
                null,
              ];
            }
          }
        });

        const middleware = classMeta.middleware.concat(methodMeta.middleware);
        const fetch = middleware.reduceRight(
          (next, middleware) => (request, context) =>
            middleware(request, (request) => next(request, context), context),
          finalFetch as Callable<[Request, AttachContext], Promise<Response>>
        );

        const reThrow = classMeta.reThrow.concat(methodMeta.reThrow);

        const method = expression(() => {
          if (pathFormat) {
          } else {
            return async (args: unknown[]) => {
              const context = handler();

              const request1 = await reduce(
                from(methodMeta.parameterMeta),
                (request, order) =>
                  reduce(
                    from(order),
                    (request, parameterMeta, index) =>
                      reduce(
                        from(parameterMeta),
                        (request, pretty) =>
                          pretty(args[index], request, context),
                        request
                      ),
                    request
                  ),
                request
              );

              try {
                const response = await fetch(request1, context);
              } catch (error) {
                const e = await reduce(
                  from(reThrow),
                  (error, reThrow) => reThrow(error, {}),
                  error
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

const responseXRequest = new WeakMap<Response, Request>();
const finalFetch = (request: Request) => fetch(request);
