# Fetch Arguments

The `fetch` handler on **Cloudflare Workers** receives 3 arguments:

- `[arg0]` of type `Request`.
- `[arg1]` of type `Env`.
- `[arg2]` of type `ExecutionContext`.

These arguments are exposed on all Workery handler functions.

## Argument Unpacking

Handler functions can unpack the previously mentioned arguments with the following keys:

- `req` of type `Request`.
- `env` of type `Env`.
- `ctx` of type `ExecutionContext`.

For example:

```ts {3}
app.get("/", {
    parameters: {},
    handle: ({ req, env, ctx }) => {
        // ...
        return { message: "Hello World" }
    },
})
```

## Env Type Inference

By default, `env` is typed as `unknown`. It's the developer's job to ensure that `App` instances knows the correct type for `env`. As shown in the previous examples in this documentation, `App` receives one generic type `E`, which represents your `env` type. Therefore, your app instantiation should look like this:

```ts
const app = new App<Env>({})
```

::: tip Worker Configuration
Ensure that your `worker-configuration.d.ts` has up to date `Env` types.
:::

## Dependency Env

When declaring `Dependency`s, the recommended approach for typing `env` is a bit **different**, as this class holds additional generic types other than `E`, and TypeScript has [yet to support partial type inference](https://github.com/microsoft/TypeScript/issues/26242), providing the type for `env` can be troublesome.

A workaround and **more comfortable** way of providing the type for `env` is by passing it on the init parameter `of`:

```ts {4}
const app = new App<Env>({})

const requireAuth = new Dependency({
    of: app,
    parameters: {
        authorization: Header(z.string()),
    },
    handle: async ({ env, authorization }) => {
        //...
    },
})
```

The dependency will inherit the `env` type in `of` and use it.

If for any reason you do not want to pass the `App` instance, you can use the **helper class `Of`** to achieve the same results:

```ts{4}
import { Of } from "workery"

const requireAuth = new Dependency({
    of: new Of<Env>(),
    parameters: {
        authorization: Header(z.string()),
    },
    handle: async ({ env, authorization }) => {
        //...
    },
})
```
