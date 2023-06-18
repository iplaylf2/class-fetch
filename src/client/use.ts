import { Middleware } from "src/kit/type/middleware";
import { ClientFactory } from "./client-factory";

export function use<MiddlewareList extends Middleware<any, any>[]>(
  middlewareList: MiddlewareList[]
): ClientFactory<any> {
  throw "todo";
}
