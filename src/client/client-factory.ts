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
            middleware(request, (request) => next(request, context), context),
          finalFetch as Callable<[Request, AttachContext], Promise<Response>>
        );

        const reThrow = classMeta.reThrow.concat(methodMeta.reThrow);

        const method = expression(() => {
          if (pathFormat) {
          } else {
            return async (args: unknown[]) => {
              const context = handler();

              try {
                const request3 = await reduce(
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
                  request2
                );

                const response = await fetch(request3, context);
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

const finalFetch = (request: Request) => fetch(request);
