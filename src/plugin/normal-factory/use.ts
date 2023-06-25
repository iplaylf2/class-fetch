import { ClientFactory } from "src/client/client-factory";
import { Middleware } from "src/client/type/middleware";

export function use(...middlewareList: Middleware[]): ClientFactory {
  return factory.use(...middlewareList);
}

const factory = new ClientFactory();
