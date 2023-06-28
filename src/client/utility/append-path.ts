import { expression } from "src/utility/expression";

export function appendPath(url: string, path: string) {
  const _url = new URL(url);
  const newPath = expression(() => {
    if (_url.pathname.endsWith("/")) {
      if (path.startsWith("/")) {
        return `${_url.pathname}${path.slice(1)}`;
      } else {
        return `${_url.pathname}${path}`;
      }
    } else {
      if (path.startsWith("/")) {
        return `${_url.pathname}${path}`;
      } else {
        return `${_url.pathname}/${path}`;
      }
    }
  });

  return new URL(newPath, _url).toString();
}
