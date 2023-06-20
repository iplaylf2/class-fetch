## order

preprocess -> middleware -> prettyRequest -> middleware -> transformResponse

- preprocess: Fetch，Method, Param.
- middleware: before next.
- prettyRequest: Header, Query, RawBody, Body, RequestInit, Apply.
- middleware: after next.
- transformResponse: ReThrow, Return, ReturnType.

### middleware order

use -> class -> method

## exclusive

- Fetch.
- Method.
- Return, ReturnType.