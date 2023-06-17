import { Body } from "./decorator/body";
import { HandleResponse } from "./decorator/handle-response";
import { Headers } from "./decorator/headers";
import { Method } from "./decorator/method";
import { Param } from "./decorator/param";
import { RawBody } from "./decorator/raw-body";
import { RequestBase } from "./decorator/request-base";
import { RequestInit } from "./decorator/request-init";
import { autoImplement } from "./kit/utility/auto-implement";

@RequestBase("")
class Foo {
  @Method("post", "${x}")
  @HandleResponse((response) => {
    throw "todo remove";
  })
  public method1(
    @Param("x") x: string,
    @RequestInit() init: RequestInit,
    @RawBody() rawBody: BodyInit,
    @Body("application/json") body: unknown,
    @Headers("aa") header: string
  ): Promise<number> {
    autoImplement();
  }
}
