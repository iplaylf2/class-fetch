import { ClientError } from "../error";

export function autoImplement(): never {
  throw new ClientError("This method should be automatically implemented.");
}
