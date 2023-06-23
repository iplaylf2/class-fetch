export type AttachContext = Pick<
  Map<unknown, unknown>,
  "delete" | "get" | "has"
> & {
  set: (...args: Parameters<Map<unknown, unknown>["set"]>) => AttachContext;
};
