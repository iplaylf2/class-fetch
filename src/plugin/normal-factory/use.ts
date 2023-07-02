import { ClientFactory } from "src/client/client-factory";
import { Middleware } from "src/client/type/middleware";
import { factory } from "./factory";

export function use(...middleware: Middleware[]): ClientFactory {
  return factory.use(...middleware);
}
