import { getClassMeta } from "src/client/client-meta/class-meta";
import { ClassFetchDecoratorError } from "src/error";

export function Fetch(
  info: RequestInfo | URL,
  init?: RequestInit
): ClassDecorator {
  const request = new Request(info, init);
  return (target) => {
    const meta = getClassMeta(target as any);
    if (meta.request) {
      throw new ClassFetchDecoratorError("Request cannot be redefined.");
    } else {
      meta.request = request;
    }
  };
}
