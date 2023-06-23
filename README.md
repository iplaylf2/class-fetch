## order

initRequest -> prettyRequest -> middleware -> transformResponse

- initRequest: Fetch -> Method.
- prettyRequest: Param -> Apply( Header, Query, RawBody, Body, RequestInit ).
- middleware.
- transformResponse: Return, ReturnType, ReThrow.

### middleware order

use -> class -> method

## exclusive

- Fetch.
- Method.
- Return, ReturnType.
