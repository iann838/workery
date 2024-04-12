# Middleware

Module: `apertum/middleware`

A "middleware" is a function that works with every request before it is processed by any specific route handler. And also with every response before returning it.

- It takes each request that comes to your application.
- It can then do something (or replace it) to that request or run any needed code.
- Then it passes the request to be processed by the rest of the application.
- It then takes the returned response.
- It can do something to that response (or replace it) or run any needed code.
- Then it returns the response.

## Defining middleware

Middleware definition is similar to dependencies and routes, with a few differences:
- Route config is not used.
- Does not have parameter definitions.
- Provides a must call promise `next`.

Init:

| Key | Type | Descrition | Default |
| :-- | :--- | :--------- | :------ |
| `of?` | `Apertum<G>` | Type inference (generic `G`) purpose only. |  |
| `name?` | `string` | Identifier purpose only. |  |
| `handle` | `MiddlewareHandler<G>` | Middleware handler function |  |

Example:

```ts
const sampleMiddleware = new Middleware({
    name: "mymiddleware",
    handle: async ({ req }, next: Next) => {
        // do something with req
        let res = await next()
        // do something with res
        return res
    },
})
```

Accessing adapter global args:

```ts
const requireAuth = new Middleware({
    of: new Apertum<{ env: Env }>({}), // or simply pass `app`
    handle: async ({ req, env }) => {
        // ...
    },
})
```

## CORSMiddleware

Adds response CORS headers to application.

Signature:

```ts
const CORSMiddleware = (options?: {
    origin: string | string[] | ((origin: string) => string | undefined | null)
    allowMethods?: string[]
    allowHeaders?: string[]
    maxAge?: number
    credentials?: boolean
    exposeHeaders?: string[]
}) => Middleware
```

Usage:

```ts
const app = new Apertum({
    middleware: [CORSMiddleware({ origin: ["http://a.co"] })],
})
```

## CompressMiddleware

Adds response compression to application based on `Accept-Encoding` header.

Signature:

```ts
const CompressMiddleware = (format: CompressionFormat) => Middleware
```

Usage:

```ts
const app = new Apertum({
    middleware: [CompressMiddleware("gzip")],
})
```