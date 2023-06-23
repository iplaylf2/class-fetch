import { ClientFactory } from "src/client/client-factory";
import { AttachContext } from "src/client/type/attach-context";

export function build<T>(
  ctor: new () => T,
  handler: () => AttachContext = () => new Map()
): T {
  return factory.build(ctor, handler);
}

const factory = new ClientFactory();
