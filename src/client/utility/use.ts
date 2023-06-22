import { Middleware } from "src/kit/type/middleware";
import { ClientFactory } from "../client-factory";

export function use(...middlewareList: Middleware[]): ClientFactory {
  return factory.use(...middlewareList);
}

const factory = new ClientFactory();
