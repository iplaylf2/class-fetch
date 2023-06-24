export type CanBeArray<T> = T extends (infer T)[] ? T : T;
