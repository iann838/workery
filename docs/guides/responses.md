# Responses

Module: `workery/responses`

All responses are extended from the `Response` class of the Global Web API.

By default, Workery uses `JSONResponse` to wrap return values of route handlers if it is not a `Response`. Available response classes:

## JSONResponse

The body is `JSON.stringify`ed and adds an `application/json` content type header.

## HTMLResponse

The body is `String` casted and adds a `text/html;charset=utf-8` content type header.

## PlainTextResponse

The body is `String` casted and adds a `text/plain;charset=utf-8` content type header.
