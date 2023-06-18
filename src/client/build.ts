import { ClientFactory } from "./client-factory";

export function build<T>(ctor: new () => T, context: unknown = null): T {
  return factory.build(ctor, context);
}

const factory = new ClientFactory();