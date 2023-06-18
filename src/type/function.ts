export type Callable<Args extends unknown[] = [], ReturnType = any> = (
  ...args: Args
) => ReturnType;

export type Newable<Args extends unknown[] = [], ReturnType = any> = new (
  ...args: Args
) => ReturnType;
