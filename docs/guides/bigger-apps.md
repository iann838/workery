# Bigger Applications <Badge type="tip" text="^1.1" />

If you are building an application or a web API, it's rarely the case that you can put everything in a single file.

**Workery** provides interfaces to structure your application while keeping all the flexibility.

Let's say you have a file structure like this:

```
.
├── src
│   ├── index.ts
│   └── routers
│       ├── items.ts
│       └── users.ts
```

- The main app is located at `src/index.ts`
- There is a subdirectory `src/routers`
- Inside the subdirectory there are 2 files: `items` and `users`
- Each file consist of a sub-application (or router) with its own routes. 

## Router Declaration

Router declaration is almost the same as declaring an App, with the only exception that OpenAPI options and middleware are not available.

::: code-group
```ts [src/routers/items.ts]
import { Router } from "workery"

const router = new Router<Env>({})

router.get("/{itemId}", {
    parameters: {
        itemId: Path(z.number().int().min(0)),
        q: Query(z.string().optional()),
    },
    handle: ({ itemId, q }) => {
        return { itemId, q }
    },
})

export default router
```

```ts [src/routers/users.ts]
import { Router } from "workery"

const router = new Router<Env>({})

router.get("/", {
    parameters: {},
    handle: () => {
        return [
            { username: "Rick" },
            { username: "Morty" },
        ]
    },
})

router.get("/me", {
    parameters: {},
    handle: () => {
        return { username: "fakecurrentuser" }
    },
})

export default router
```

You can think of `Router` as a "headless `App`".

All the same path operations, parameters, dependencies are supported.

::: tip Naming
In this example, the variable is called `router`, but you can name it however you want.

It also exports the router using `export default`, but you can export it by name: `export { router }`, just make sure that import statements are correct when including in main app.
:::

## Include Routers

Now you have to include the routers into the main app, you can add a prefix so these routers are served under a sub-path.

::: code-group
```ts [src/index.ts]
import { App } from "workery"
import itemsRouter from "./routers/items.ts"
import usersRouter from "./routers/users.ts"

const app = new App<Env>({})

app.include("/items", itemsRouter)
app.include("/users", usersRouter)

export default app
```

Now all routes registered in `itemsRouter` are served under `/items`, the same is for users under `/users`. It's fine if you include multiple routers under the same prefix or even at the root level (`"/"`).

You can still do path operations and other actions on the main app even if you include routers.

## Check API Docs

Open the automatic docs in your browser, you should visually see all routes from routers registered as expected. However, in bigger applications, you might want to **group** them in tags:

::: code-group
```ts [src/routers/items.ts]
const router = new Router<Env>({
    tags: ["items"]
})
```
```ts [src/routers/users.ts]
const router = new Router<Env>({
    tags: ["users"]
})
```
:::

![Docs Router Tag](/docsroutertag.jpg)
