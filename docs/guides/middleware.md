# Middleware

You can add middleware to **Workery** applications.

A "middleware" is a function that works with every **request** before it is processed by any route handler function regardless of the state and content. And also with every **response** before returning it.

- It takes each **request** that comes to your application.
- It can then do something with that request or run any needed code.
- Then it passes the **request** to be processed by route handlers.
- It then takes the **response** returned by route handlers.
- It can do something to that **response** or run any needed code.
- Then it returns the **response**.

## Definition

To create a middleware you use the `Middleware` class to create a middleware instance.

The middleware init receives:

- `name`: (optional) name of the middleware, this does not have any functional effect.
- `handle`: the usual handler function, but with a **second positional argument**:
    - `next`: async function for calling the next handler in line, this could be the next middleware handler or the route handler itself. Returns a response.

Example:

```ts {5-7}
import { Middleware } from "workery"

const responseAddDate = new Middleware<Env>({
    handle: async ({}, next) => {
        const res = await next()
		res.headers.set("Date", new Date().toISOString())
		return res
    },
})
```

This example adds a `Date` header to all responses of the app. Remember to add the middleware to the app init for it to take effect.

```ts {2-4}
const app = new App<Env>({
	middleware: [
		responseAddDate,
	]
})
```

::: tip Middleware Order
The order of your middleware array is also the call order, the first middleware in the array is the first one to be called before route handlers and last one to be called after route handlers have returned a response.
:::

## Before & After Request

You can add code to be run before the request is processed by any route handler.

And also after the response is generated, before returning it.

```ts {3-6}
const myMiddleware = new Middleware<Env>({
    handle: async ({ req, env, ctx }, next) => {
        // code executed before route handlers
        const res = await next()
        // code executed after route handlers
		return res
    },
})
```

::: warning Runtime Gotchas
In Cloudflare Workers, `Request` (unpack arg `req`) objects are immutable, modifying this object results in error. Also, [performance and timers](https://developers.cloudflare.com/workers/runtime-apis/performance/) only advance or increment after I/O occurs.
:::

## Lower middleware

You may choose to have middleware to only a subset of your routes. You can do so by [grouping them in a router](./bigger-apps) and defining middleware on that level, or directly on route handlers.

```ts{2}
const router = new Router<Env>({
    middleware: [...]
})

router.get(...)

// later included to main app
app.include("/subroute", router)
```

or

```ts{2}
app.get("/", {
    middleware: [...],
    parameters: {},
    handle: () => { ... },
})
```

Middleware defined on routers (sub apps) and route handlers, are **merged** when included to higher level objects (main app, and other sub apps) respecting the following middleware execution order:

```ts
// middleware execution order
defined on main app -> defined on routers -> defined on route handlers
```

## Built-in Middleware

**Workery** provides built-in middleware for common use-cases (even though they are not necessarily common in the context of Cloudflare Workers):

- [CORS (Cross-Origin Resource Sharing)](./cors.md)
- [Compression](./compression.md)
