import { AttachContext } from "src/kit/type/attach-context";
import { Middleware } from "src/kit/type/middleware";

export class ClientFactory {
  public use(...middlewareList: Middleware[]): ClientFactory {
    throw "todo";
  }

  public build<T>(ctor: new () => T, handler: () => AttachContext): T {
    throw "todo";
  }
}
