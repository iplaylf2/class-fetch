# class-fetch

`class-fetch` 是一个用于生成 HTTP 客户端的 js 库，使用 TypeScript 编写。

- 基于 fetch，支持浏览器和 nodejs 的运行时。
- 使用装饰器，简化请求参数和返回值的处理。
- 使用 `class-transformer` 和 `class-validator`，实现数据转换和校验。
- 具有丰富的类型约束。
- 从 [WebApiClient](https://github.com/dotnetcore/WebApiClient) 获得灵感。

## 安装

```bash
npm install class-fetch
```

注意，`class-fetch` 将以下的库作为 peerDependencies ，你的项目需要包含它们：

- `class-transformer`
- `class-validator`
- `cross-fetch`

请确保你的项目中安装了这些库。

## 使用
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

## 请求的生命周期

`class-fetch` 在发起请求时可以分成 4 个阶段：

- build：初始化请求，设置 URL 等基础 Request 配置。
- prettyRequest：修饰请求，修改路径、请求头、查询参数 和 body 等配置。
- middleware：执行中间件函数，对请求和响应进行拦截和处理。
- transformResponse：转换响应，根据返回值的类型和处理方式对 Response 进行转换并校验。

装饰器的作用贯穿在这 4 个阶段中，它们各自存在一些优先级、排他性和必需性。

### build 阶段

在这个阶段，需要使用到以下 2 个装饰器：

- `Fetch`：用于装饰将作为 HTTP 客户端模板的类，且配置基础的 Request。只能单个使用，且必须有一个。
- `Method`：用于装饰将自动实现的实例方法，且指定请求的 HTTP 方法。只能单个使用，且必须有一个。

这两个装饰器的优先级是：`Fetch` > `Method`。

`Method` 有一些便捷的封装：`Delete`, `Get`, `Post`, `Put`。

### prettyRequest 阶段

这个阶段会处理实例方法上的参数，进一步对 Request 进行修饰。受到以下装饰器影响：

- `Param`：用对应的实参实例化 `Method` 配置的模板路径。
- `Apply`：用于修饰 Request 的选项。
- `RawBody`: 用对应的实参作为原始的 body 数据。
- `Body`：使用内置的插件自动编码 body 数据。

这些装饰器的优先级是：`Param` > `Apply` > `RawBody` 或 `Body`。

`Apply` 有一些便捷的封装：`Header`, `Query`, `RequestInit`。

### middleware 阶段

这个阶段受 `Middleware` 装饰器影响。

你能在类和实例方法上使用 `Middleware` ，也通过客户端工厂的 use 方法配置 middleware。

这些 middleware 的优先级是：use > class > method。

### transformResponse 阶段

在这个阶段，需要使用以下 2 个装饰器之一：

- `Return`：用回调的方式处理请求的上下文，返回值将作为对应的实例方法的返回值。
- `ReturnType`：使用内置的插件，通过 `class-transformer` 和 `class-validator` 对 Response 的 body 进行解码和校验。

注意，Return 和 ReturnType 是互斥的，只能使用其中一个。

## 异常处理

你可以通过 `ReThrow` 装饰器装饰类和实例方法，处理在 prettyRequest, middleware, transformResponse 阶段抛出的异常，最后重新抛出。