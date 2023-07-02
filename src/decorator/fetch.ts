import { getClassMeta } from "../client/client-meta/class-meta";
import { DecoratorError } from "../error";

export function Fetch(
  info: RequestInfo | URL,
  init?: RequestInit
): ClassDecorator {
  const request = new Request(info, init);
  return (target) => {
    const meta = getClassMeta(target as any);
    if (meta.request) {
      throw new DecoratorError("Request cannot be redefined.");
    } else {
      meta.request = request;
    }
  };
}
