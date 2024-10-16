# Responses

Module: `workery/responses`

All responses are extended from the `Response` class of the Global Web API.

Responses can be **thrown** in route, middleware, and dependency handlers to immediately interrupt the request flow and return itself.

By default, Workery uses `JSONResponse` to wrap return values of route handlers if it is not a `Response`.

## JSONResponse

The body is `JSON.stringify`ed and adds an `application/json` content type header.

## HTMLResponse

The body is `String` casted and adds a `text/html;charset=utf-8` content type header.

## PlainTextResponse

The body is `String` casted and adds a `text/plain;charset=utf-8` content type header.
