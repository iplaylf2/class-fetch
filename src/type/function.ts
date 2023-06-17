export type Callable<Args extends unknown[] = [], ReturnType = any> = (
  ...args: Args
) => ReturnType;
