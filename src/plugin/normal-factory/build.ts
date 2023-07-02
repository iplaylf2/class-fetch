import { factory } from "./factory";

export function build<T extends {}>(ctor: new () => T): T {
  return factory.build(ctor);
}
