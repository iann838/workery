# Handling Errors

There are many situations in which you need to notify an error to a client using your API.

This client could be a browser with a frontend, someone else's code, an IoT device, etc.

You could need to tell the client that:

- The client doesn't have enough privileges for that operation.
- The client doesn't have access to that resource.
- The item the client was trying to access doesn't exist.
- etc.

In these cases, you would normally return an HTTP status code in the range of **400** (from 400 to 499) and probably with a body explaining the issues.

## Throw a Response

Unlike other frameworks, there are no tailored classes or exceptions for HTTP errors.

In **Workery**, you can simply throw responses like errors, it will immediately exit the route handler and return the thrown response.

```ts{6}
import { JSONResponse } from "workery/responses"

app.get("/item", {
    parameters: {},
    handle: () => {
		throw new JSONResponse({ detail: "Item not found" }, { status: 404 })
    },
})
```

You can throw responses at any point within any route and dependency handlers. E.g. Throwing `401 Unauthenticated` in a `requireAuth` dependency after failed authentication.

:::warning Middleware
You can't do this in `Middleware` handlers. Instead, you should return a response.
:::

## Return a Response

You don't have to always throw them, returning responses with a status code in route handlers is totally fine.

```ts{6}
import { JSONResponse } from "workery/responses"

app.get("/item", {
    parameters: {},
    handle: () => {
		return new JSONResponse({ detail: "Item not found" }, { status: 404 })
    },
})
```

:::warning Dependencies
Return values of `Dependency` handlers are the arguments of your route handlers, do not return responses in dependencies unless you actually mean it.

If you have an error to inform inside dependency handlers, **throw** it.
:::
