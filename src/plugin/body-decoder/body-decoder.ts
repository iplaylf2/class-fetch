import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { BodyDecoder } from "./attach-context-item";

const decodeFormData = (async (body, type) => {
  const formData = await body.formData();

  return transform(type as any, Object.fromEntries(formData.entries()));
}) satisfies BodyDecoder;

export const bodyDecoder = {
  async ["application/json"](body, type) {
    const json = await body.json();
    return transform(type as any, json);
  },
  ["application/x-www-form-urlencoded"]: decodeFormData,
  ["multipart/form-data"]: decodeFormData,
} satisfies Record<string, BodyDecoder>;

export const defaultBodyDecoder = ((body) => body.text()) satisfies BodyDecoder;

export function transform<Instance extends object>(
  constructor: ClassConstructor<Instance>,
  x: {}
): Instance {
  const toValidate = plainToInstance(constructor, x, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(toValidate, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw errors;
  } else {
    return toValidate;
  }
}
