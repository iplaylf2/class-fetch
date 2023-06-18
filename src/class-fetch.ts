import { build } from "./client/build";
import { Body } from "./decorator/body";
import { Fetch } from "./decorator/fetch";
import { Headers } from "./decorator/headers";
import { Method } from "./decorator/method";
import { Middleware } from "./decorator/middleware";
import { Param } from "./decorator/param";
import { RawBody } from "./decorator/raw-body";
import { RequestInit } from "./decorator/request-init";
import { Return } from "./decorator/return";
import { ReturnType } from "./decorator/return-type";
import { autoImplement } from "./kit/utility/auto-implement";

@Fetch("")
@Middleware([])
class Foo {
  @Method("post", "xxx/${aa}")
  @Return((response, context) => {
    throw "todo remove";
  })
  @ReturnType(Number)
  @Middleware([])
  public method1(
    @Param("aa") aa: string,
    @RequestInit() init: RequestInit,
    @RawBody() rawBody: BodyInit,
    @Body("application/json") body: unknown,
    @Headers("xxx") header: string
  ): Promise<number> {
    autoImplement();
  }
}

const foo = build(Foo);

type x = PropertyDecorator;
