import { BodyEncoder } from "./attach-context-item";

const encodeFormData = ((body) => {
  if (body instanceof FormData) {
    return body;
  }
  if (body instanceof HTMLFormElement) {
    return body;
  }

  const form = new FormData();
  for (const [key, value] of Object.entries(body as {})) {
    form.set(key, String(value));
  }
  return form;
}) satisfies BodyEncoder;

export const bodyEncoder = {
  ["application/json"](body) {
    return JSON.stringify(body);
  },
  ["application/x-www-form-urlencoded"]: encodeFormData,
  ["multipart/form-data"]: encodeFormData,
} satisfies Record<string, BodyEncoder>;

export const defaultBodyEncoder = ((body) => body) satisfies BodyEncoder;
