import { Callable, Newable } from "./function";
import { IfExtends } from "./if-extends";

export type InstanceParameterDecorator<
  Target,
  Key extends keyof Target,
  Index extends number,
  Param
> = (
  target: Target,
  propertyKey: Key,
  parameterIndex: Index
) => Target extends Newable<any, any>
  ? unknown
  : Target[Key] extends Callable<infer Params, any>
  ? IfExtends<Params[Index], Param, void, Param>
  : unknown;
