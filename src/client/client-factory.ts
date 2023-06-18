import { Middleware } from "src/kit/type/middleware";

export class ClientFactory<T> {
  public use<MiddlewareList extends Middleware<any, any>[]>(
    middlewareList: MiddlewareList
  ): ClientFactory<T> {
    throw "todo";
  }

  public build<X>(ctor: new () => X, context: T): X {
    throw "todo";
  }
}
