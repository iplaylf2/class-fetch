import { AttachContext } from "src/client/type/attach-context";
import { Middleware } from "src/client/type/middleware";
import { getClassMeta } from "./client-meta/class-meta";
import { ClassFetchBuildError } from "src/error";

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

    throw "todo";
  }
}
