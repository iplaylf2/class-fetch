import { use } from "./use";

export function build<T>(ctor: new () => T, context: unknown = null): T {
  return factory.build(ctor, context);
}

const factory = use([]);
