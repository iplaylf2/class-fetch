import { ClassFetchError } from "../../error";

export function autoImplement(): never {
  throw new ClassFetchError("This method should be automatically implemented.");
}
