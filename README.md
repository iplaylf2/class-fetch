# class-fetch

English | [中文](https://github.com/iplaylf2/class-fetch/blob/main/doc/README.cn.md)

`class-fetch` is a js library for generating HTTP clients, written in TypeScript.

- Based on fetch, it supports browser and nodejs runtime.
- It uses decorators to simplify the handling of request parameters and return values.
- It uses `class-transformer` and  `class-validator`to implement data transformation and validation.
- It has rich type constraints.
- It is inspired by [WebApiClient](https://github.com/dotnetcore/WebApiClient).

## Installation

```bash
npm install class-fetch
```

Note that `class-fetch` has the following libraries as peerDependencies, and your project needs to include them:

- `class-transformer`
- `class-validator`
- `cross-fetch`

Please make sure these libraries are installed in your project.

## Usage
```typescript
import {
  Fetch,
  Get,
  Param,
  ReturnType,
  autoImplement,
  build,
  t,
} from "class-fetch";

class Posts {
  public id!: number;
  public title!: string;
  public body!: string;
  public userId: number;
}

@Fetch("https://jsonplaceholder.typicode.com/posts")
class Foo {
  @Get(t`${"id"}`)
  @ReturnType(Posts)
  public get(@Param("id") id: string): Promise<Posts> {
    autoImplement();
  }
}

const foo = build(Foo);

(async () => {
  console.log(await foo.get("7")); // get https://jsonplaceholder.typicode.com/posts/7
})();

```

## Request lifecycle

`class-fetch` can be divided into four stages when making a request:

- build: Initialize the request, set the URL and other basic Request configurations.
- prettyRequest: Decorate the request, modify the path, headers, query parameters and body configurations.
- middleware: Execute middleware functions, intercept and process requests and responses.
- transformResponse: Transform the response, according to the type and processing method of the return value, transform and verify the Response.

The decorators work throughout these four stages, each with some priority, exclusivity and necessity.

### build stage

In this stage, you need to use the following two decorators:：

- `Fetch`: Used to decorate the class that will serve as the HTTP client template, and configure the basic Request. It can only be used singly and must have one.
- `Method`: Used to decorate the instance method that will be automatically implemented, and specify the HTTP method of the request. It can only be used singly and must have one.

The priority of these two decorators is: `Fetch` > `Method`.

`Method` has some convenient wrappers: `Delete`, `Get`, `Post`, `Put`.

### prettyRequest stage

This stage will handle the parameters on the instance method, further decorate the Request. Affected by the following decorators:

- `Param`：Instantiate the template path configured by `Method` with the corresponding actual parameter.
- `Apply`: Used to decorate Request options.
- `RawBody`: Use the corresponding actual parameter as the raw body data.
- `Body`: Use built-in plugins to automatically encode body data.

The priority of these decorators is: `Param` > `Apply` > `RawBody` or `Body`.

`Apply`has some convenient wrappers: `Header`, `Query`, `RequestInit`.

### middleware stage

This stage is affected by the `Middleware` decorator.

You can use `Middleware` on classes and instance methods, or configure middleware through the client factory’s use method.

The priority of these middleware is: use > class > method.

### transformResponse stage

In this stage, you need to use one of the following two decorators:

- `Return`: Use a callback to handle the request context, and the return value will be used as the return value of the corresponding instance method.
- `ReturnType`: Use built-in plugins to decode and verify Response’s body using `class-transformer` and `class-validator`.

Note that `Return` and `ReturnType` are mutually exclusive and can only use one of them.

## Exception handling

You can use the `ReThrow` decorator to decorate classes and instance methods, handle exceptions thrown in prettyRequest, middleware, transformResponse stages, and finally rethrow them.