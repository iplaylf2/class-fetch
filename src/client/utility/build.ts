import { AttachContext } from "src/kit/type/attach-context";
import { ClientFactory } from "../client-factory";

export function build<T>(
  ctor: new () => T,
  handler: () => AttachContext = () => new Map()
): T {
  return factory.build(ctor, handler);
}

const factory = new ClientFactory();
