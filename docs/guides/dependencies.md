# Dependencies

**Dependency Injection** means, in programming, that there is a way for your code (in this case, your route handlers) to declare things that it requires to work and use: "dependencies".

And then, that system (in this case **Workery**) will take care of doing what is needed to provide your code with those declared dependencies ("inject" the dependencies).

This is very useful when you need to:

- Have shared logic (the same code logic again and again).
- Share database connections.
- Enforce security, authentication, role requirements, etc.
- And many other things...
- All these, while minimizing code repetition.

## Declaration

To create a dependency you use the `Dependency` class to create a dependency instance.

The dependency init receives:

- `of`: (optional) instance from which to inherit the `env` type (see [Dependency Env](./fetch_args.md#dependency-env)).
- `name`: (optional) name of the middleware, this does not have any functional effect.
- `parameters`: the usual parameters declaration, these parameters will also be part of the generated OpenAPI document for the routes that uses this dependency.
- `handle`: the usual handler function, but with a **second optional positional argument**:
    - `later`: after-request hook, void function receiving a response, [see details below](#after-request-hook).

Example:

```ts {11-14}
import { App, Dependency } from "workery"

const app = new App<Env>({})

const requireAuth = new Dependency({
    of: app,
    parameters: {
        authorization: Header(z.string()),
    },
    handle: async ({ authorization, env }) => {
        const user = /* authenticate user with header content */
        if (!user)
            throw new JSONResponse({ detail: "Unauthenticated" }, { status: 401 })
        return user
    },
})
```

This example creates a dependency that requires an `authorization` header, that is then used for authenticating the user, return the user object if it was successfully authenticated, otherwise throw an HTTP 401 response.

To inject this dependency to routes, declare it as a `Depends` parameter:

```ts {5,7-8}
import { Depends } from "workery/parameters"

app.get("/", {
    parameters: {
		user: Depends(requireAuth),
	},
    handle: ({ user }) => {
        return { message: `Hello ${user}` }
    },
})
```

## Nested Dependencies

You can create **dependencies** that have sub-dependencies.

They can be as **deep** as you need them to be.

```ts
const requireNestedNest = new Dependency({
    parameters: {
        one: Query(z.string()),
        two: Query(z.string())
    },
    handle: ({ one, two }) => {
        return { one, two }
    }
})

const requireNested = new Dependency({
    parameters: {
        three: Depends(requireNestedNest),
        zero: Query(z.number())
    },
    handle: ({ three, zero }) => {
        return { three, zero }
    }
})

// Inferred type:
// { zero: number, three: { one: string, two: string } }
```

All declared parameters in nested dependencies will be also be rendered on the OpenAPI document.

## After-Request Hook

Dependency handlers has a second optional argument, this argument is an after-request hook named `later`, this hook performs actions after the request has been processed an a response has been returned.

Example:

```ts{9-12}
const requireAuth = new Dependency({
    parameters: {
        authorization: Header(z.string()),
    },
    handle: async ({ authorization, env }, later) => {
        const user = /* authenticate user with header content */
        if (!user)
            throw new JSONResponse({ detail: "Unauthenticated" }, { status: 401 })
        later(async (res) => {
            if (res.status >= 400)
                // do something to user if the response status is >= 400.
        })
        return user
    },
})
```
