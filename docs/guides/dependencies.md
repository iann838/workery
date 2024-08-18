# Dependencies

Module: `workery/dependencies`

**Dependency Injection** means, in programming, that there is a way for your code (in this case, your route handlers) to declare things that it requires to work and use: "dependencies".

And then, that workflow (in this case **Workery**) will take care of doing what is needed to provide your code with those declared dependencies ("inject" the dependencies).

This is very useful when you need to:

- Have shared logic (the same code logic again and again).
- Share database connections.
- Enforce security, authentication, role requirements, etc.
- And many other things...
- All these, while minimizing code repetition.

## Defining dependencies

Dependency definition feels similar to routes, with a few differences:
- Route config is not used.
- The return value is not a Response.
- Provides am after-request hook `later`.

Init:

| Key | Type | Descrition | Default |
| :-- | :--- | :--------- | :------ |
| `of?` | `App<E>` | Env type inference (generic `E`) purpose only. |  |
| `name?` | `string` | Identifier purpose only. |  |
| `parameters` | `Ps extends RouteParameters` | Parameter specification. See [Parameters](/guides/parameters.md). |  |
| `handle` | `DependencyHandler<R, Ps, E>` | Dependency handler function |  |


Example:

```ts
const requireAuth = new Dependency({
    parameters: {
        authorization: Header(z.string()),
    },
    handle: async ({ authorization }) => {
        const user = await authenticateUser(authorization)
        if (!user)
            throw new JSONResponse({ detail: "Unauthenticated" }, { status: 401 })
        return user
    },
})
```

```ts
    // ...
    parameters: {
        user: Depends(requireAuth)
    }
    handle: ({ user }) => {
        // User is authenticated
    }
```

What this dependency injection means:
- It expects an additional header `Authorization`.
- It attempts to authenticate a user using the header.
- If the authentication fails, throws a 401 response.
- If the authentication succeeds, return the authenticated user.
- The route handler now has access to `user` param, and is sure that the user is authenticated.

Parameter definitions of dependencies are validated and rendered on the OAS of the route.

Accessing adapter global args:

```ts
const requireAuth = new Dependency({
    of: new App<Env>({}), // or simply pass `app`
    parameters: {
        authorization: Header(z.string()),
    },
    handle: async ({ env, authorization }) => {
        // ...
    },
})
```

## After-request hook `later`

Dependency handlers provides an after-request hook called `later` as the second argument, you could use this to create a database session and close it after finishing, let's see an example:

```ts
const requireAuth = new Dependency({
    parameters: {
        authorization: Header(z.string()),
    },
    handle: async ({ authorization }, later) => {
        const user = await authenticateUser(authorization)
        if (!user)
            throw new JSONResponse({ detail: "Unauthenticated" }, { status: 401 })
        later((res) => {
            if (res.status >= 400)
                await logoutUser(user)
        })
        return user
    },
})
```

On top of the explanation made earlier in this page:
- It logs out the user if the response status is >= 400.

Responses are read-only and cannot be modified or replaced within `later`.
