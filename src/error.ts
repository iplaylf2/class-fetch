export class ClassFetchError extends Error {}

export class DecoratorError extends ClassFetchError {}

export class PrettyRequestError extends ClassFetchError {
  public constructor(
    public readonly request: Request,
    message?: string,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}

export class MiddlewareError extends ClassFetchError {
  public constructor(
    public readonly request: Request,
    public readonly response: Response | null,
    message?: string,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}

export class TransformResponseError extends ClassFetchError {
  public constructor(
    public readonly request: Request,
    public readonly response: Response,
    message?: string,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}

export class BuildError extends ClassFetchError {}
