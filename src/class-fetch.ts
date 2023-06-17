import { Body } from "./decorator/body";
import { Fetch } from "./decorator/fetch";
import { HandleResponse } from "./decorator/handle-response";
import { Headers } from "./decorator/headers";
import { Method } from "./decorator/method";
import { Param } from "./decorator/param";
import { RawBody } from "./decorator/raw-body";
import { RequestInit } from "./decorator/request-init";
import { autoImplement } from "./kit/utility/auto-implement";

@Fetch("")
class Foo {
  @Method("post", "xxx/${aa}")
  @HandleResponse((response) => {
    throw "todo remove";
  })
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
