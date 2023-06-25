import { autoImplement } from "./client/utility/auto-implement";
import { Apply } from "./decorator/apply";
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
import { ReturnType } from "./plugin/body-decoder/return-type";
import { Body } from "./plugin/body-encoder/body";
import { build } from "./plugin/normal-factory/build";
import { t } from "./utility/string";

@Fetch("https://github.com")
@ReThrow((error, context) => error)
@Middleware()
class Foo {
  @Method("post", t`xxx/${"aa"}`)
  @Return((context) => {
    throw "todo remove";
  })
  @ReturnType(Number)
  @ReThrow((error, context) => error)
  @Middleware()
  public method1(
    @Param("aa") aa: string,
    @Query("bb") bb: string,
    @RequestInit() init: RequestInit,
    @RawBody() rawBody: BodyInit,
    @Body("application/json") body: unknown,
    @Header("xxx") header: string,
    @Apply((arg: number, request, context) => request) xxx: number
  ): Promise<number> {
    autoImplement();
  }
}

const foo = build(Foo);
