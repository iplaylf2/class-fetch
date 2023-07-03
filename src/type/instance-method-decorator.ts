import { Newable } from "./function";

export type InstanceMethodDecorator<T, M> = (
  target: T,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<M>
) => T extends Newable<any, any> ? unknown : TypedPropertyDescriptor<M> | void;
