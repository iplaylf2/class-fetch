import { Middleware } from "src/kit/type/middleware";

export class ClientFactory {
  public use(middlewareList: Middleware[]): ClientFactory {
    throw "todo";
  }

  public build<T>(ctor: new () => T, context: unknown): T {
    throw "todo";
  }
}
