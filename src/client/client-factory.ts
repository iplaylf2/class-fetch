import { AttachContext } from "src/client/type/attach-context";
import { Middleware } from "src/client/type/middleware";
import { ClassFetchBuildError } from "src/error";
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
          throw new ClassFetchBuildError("Missing request");
        }

        const [request, pathFormat] = expression(() => {
          if (null === methodMeta.path) {
            return [
              new Request(classMeta.request!, {
                ...methodMeta.init,
                method: methodMeta.method!,
              }),
              null,
            ];
          } else {
            if ("function" === typeof methodMeta.path) {
              return [
                new Request(classMeta.request!, {
                  ...methodMeta.init,
                  method: methodMeta.method!,
                }),
                methodMeta.path,
              ];
            } else {
              return [
                new Request(
                  {
                    ...classMeta.request!,
                    url: appendPath(classMeta.request!.url, methodMeta.path),
                  },
                  {
                    ...methodMeta.init,
                    method: methodMeta.method!,
                  }
                ),
                null,
              ];
            }
          }
        });

        const method = expression(() => {
          if (pathFormat) {
          } else {
            return async (args: unknown[]) => {
              const context = handler();

              const request1 = methodMeta.parameterMeta.reduce(
                (request, order) =>
                  order.reduce(
                    (request, parameterMeta, index) =>
                      parameterMeta.reduce(
                        (request, pretty) =>
                          pretty(args[index], request, context),
                        request
                      ),
                    request
                  ),
                request
              );
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
