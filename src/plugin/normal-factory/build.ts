import { ClientFactory } from "src/client/client-factory";
import { AttachContext } from "src/client/type/attach-context";

export function build<T>(
  ctor: new () => T,
  handle: () => AttachContext = () => new Map()
): T {
  return factory.build(ctor, handle);
}

const factory = new ClientFactory();
