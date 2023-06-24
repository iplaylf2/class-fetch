export class ClassFetchError extends Error {
  public constructor(source: Error);
  public constructor(message?: string, options?: ErrorOptions);
  public constructor(arg1?: string | Error, arg2?: ErrorOptions) {
    if (arg1 instanceof Error) {
      super();
      this.source = arg1;
    } else {
      super(arg1, arg2);
    }
  }

  public readonly source?: Error;
}

export class ClassFetchDecoratorError extends ClassFetchError {}

export class ClassFetchPrettyRequestError extends ClassFetchError {}

export class ClassFetchTransformResponseError extends ClassFetchError {}

export class ClassFetchBuildError extends ClassFetchError {}
