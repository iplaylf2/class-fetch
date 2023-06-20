import { build } from "./client/build";
import { Apply } from "./decorator/apply";
import { Body } from "./decorator/body";
import { Fetch } from "./decorator/fetch";
import { Header } from "./decorator/header";
import { Method } from "./decorator/method";
import { Middleware } from "./decorator/middleware";
import { Param } from "./decorator/param";
import { Query } from "./decorator/query";
import { RawBody } from "./decorator/raw-body";
import { ReThrow } from "./decorator/re-throw";
import { RequestInit } from "./decorator/request-init";
import { Return } from "./decorator/return";
import { ReturnType } from "./decorator/return-type";
import { autoImplement } from "./kit/utility/auto-implement";
import { t } from "./utility/string";

@Fetch("xx.com")
@ReThrow((e, context) => e)
@Middleware([])
class Foo {
  @Method("post", t`xxx/${"aa"}`)
  @Return((context) => {
    throw "todo remove";
  })
  @ReturnType(Number)
  @ReThrow((e, context) => e)
  @Middleware([])
  public method1(
    @Param("aa") aa: string,
    @Query("bb") bb: string,
    @RequestInit() init: RequestInit,
    @RawBody() rawBody: BodyInit,
    @Body("application/json") body: unknown,
    @Header("xxx") header: string,
    @Apply((arg: number, request, attach) => request) xxx: number
  ): Promise<number> {
    autoImplement();
  }
}

const foo = build(Foo);
