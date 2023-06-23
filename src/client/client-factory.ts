import { AttachContext } from "src/client/type/attach-context";
import { Middleware } from "src/client/type/middleware";

export class ClientFactory {
  public use(...middlewareList: Middleware[]): ClientFactory {
    throw "todo";
  }

  public build<T>(ctor: new () => T, handler: () => AttachContext): T {
    throw "todo";
  }
}
