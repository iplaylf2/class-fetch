export type Attach = Pick<Map<unknown, unknown>, "delete" | "get" | "has"> & {
  set: (...args: Parameters<Map<unknown, unknown>["set"]>) => Attach;
};
