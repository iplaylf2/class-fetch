import { createFactory } from "./create-factory";

export function build<T>(ctor: new () => T): T {
  return factory(ctor);
}

const factory = createFactory({});
