import { Attach } from "src/kit/type/attach";
import { ClientFactory } from "./client-factory";

export function build<T>(ctor: new () => T, attach: Attach = new Map()): T {
  return factory.build(ctor, attach);
}

const factory = new ClientFactory();
