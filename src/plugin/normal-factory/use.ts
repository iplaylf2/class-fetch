import { ClientFactory } from "src/client/client-factory";
import { Middleware } from "src/client/type/middleware";

export function use(...middleware: Middleware[]): ClientFactory {
  return new ClientFactory(middleware);
}
