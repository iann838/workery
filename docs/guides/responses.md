# Responses

A **response** is the data sent back from the server to the client after an HTTP request. It includes a status code, headers, and the body.

**Workery** provides built-in response classes for different body types: **JSON**, **HTML**, and **plain text**. All response classes are extended from the `Response` class.

```ts
import { HTMLResponse } from "workery/responses"
import { JSONResponse } from "workery/responses"
import { PlainTextResponse } from "workery/responses"

```

## Implicit Response

By default, you are not required to return a response instance, when the return value of route handlers is not a response, it is **implicitly** used as the body to create a `JSONResponse` with status code `200`.

```ts{4}
app.get("/", {
    parameters: {},
    handle: () => {
        return { message: "Hello World" }
    },
})
```

is implicitly the same as:

```ts{4}
app.get("/", {
    parameters: {},
    handle: () => {
        return new JSONResponse({ message: "Hello World" })
    },
})
```

You can modify the default response class that is used to instantiate the implicit response at multiple level of your application.

- On the app level:

```ts{2}
const app = new App<Env>({
	defaultResponseClass: PlainTextResponse
})
```

- On the route level:

```ts{2}
app.get("/", {
	responseClass: PlainTextResponse,
    parameters: {},
    handle: () => {
        return { message: "Hello World" }
    },
})
```

## Status and Headers

You can provide status code, and headers on the second optional argument when instantiating responses.

```ts
new JSONResponse({ message: "Hello World" }, { status: 200 })
```

```ts
new JSONResponse({ message: "Hello World" }, {
    headers: {
        "Header-Key": "headerValue"
    }
})
```

## Custom Responses

If none of the response classes fit your need, you can:

- Return a `Response` (base class) instance, and manually declaring headers such as `Content-Type`.
- Extend a new class from `Response`, pre-processing the body and pre-setting the needed headers in the constructor.

```ts {3,4}
export class HTMLResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(String(body), init)
        this.headers.set("Content-Type", "text/html;charset=utf-8")
    }
}
```

## Accept Header

While it is rare, you may want to return different response formats based on the `Accept` header provided on request:

```ts
accept: Header(z.enum(["application/json", /* ... */]), { includeInSchema: false })
```

You may have noticed the `{ includeInSchema: false }`. That is because in Swagger, this header is controlled by the response schemas (see below OpenAPI Schemas). Therefore, it has to be excluded from the generated OpenAPI document.

## OpenAPI Schemas

By default the generated OpenAPI document does not include response schemas in routes.

To declare response schemas for the generated OpenAPI document, specify an OAS3.1 `ResponseConfig` object in routes, this **does not manipulate the route handler nor validate** the return value.

There is a shortcut function provided by the `workery/parameters` module to make declaring response schemas easier:

```ts{5}
import { Responds } from "workery/parameters"

app.get("/", {
	responses: {
		200: Responds(z.object({ message: z.string() }))
	},
    parameters: {},
    handle: () => {
        return { message: "Hello World" }
    },
})
```

You can specify the media type, description and headers info on the second optional argument of `Responds`:

```ts
Responds(z.object({ message: z.string() }), {
    mediaType: "application/json"
    description: "Sample description"
    headers: { Date: z.string() }
})
```

The `Responds` shortcut only supports single media type per status code, if you need multiple media types, you need to manually provide the OAS3.1 `ResponseConfig` object.
