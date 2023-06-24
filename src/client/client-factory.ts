import { AttachContext } from "src/client/type/attach-context";
import { Middleware } from "src/client/type/middleware";
import { getClassMeta } from "./client-meta/class-meta";
import { ClassFetchBuildError } from "src/error";

export class ClientFactory {
  public use(...middlewareList: Middleware[]): ClientFactory {
    throw "todo";
  }

  public build<T>(ctor: new () => T, handler: () => AttachContext): T {
    const classMeta = getClassMeta(ctor);
    if (undefined === classMeta.request) {
      throw new ClassFetchBuildError("Missing request");
    }

    throw "todo";
  }
}
