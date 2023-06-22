export type UnwrapPromise<T extends Promise<any>> = T extends Promise<
  infer Value
>
  ? Value
  : never;
