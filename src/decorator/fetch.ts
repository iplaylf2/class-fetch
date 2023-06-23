import { getClassMeta } from "src/client/client-meta/class-meta";
import { ClientDecoratorError } from "src/client/error";

export function Fetch(
  info: RequestInfo | URL,
  init?: RequestInit
): ClassDecorator {
  const request = new Request(info, init);
  return (target) => {
    const meta = getClassMeta(target as any);
    if (undefined === request) {
      meta.request = request;
    } else {
      throw new ClientDecoratorError("Request cannot be redefined.");
    }
  };
}
