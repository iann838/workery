# Code Duplication

If you notice that your code is starting to have repeated statements and definitions more than a few times, it is probably time to address them.

This guide will use **repeated parameters** as the context of examples, because it's the most common place to have code duplication. However, these deduplication logics can be applied to other scenarios.

```ts
app.get("/", {
    parameters: {
        q: Query(z.string().optional()),
        skip: Query(z.number().default(0)),
        limit: Query(z.number().default(100)),
    },
    handle: ({ q, skip, limit }) => {/* ... */}
})
```

Let's imagine that there are 10 routes using these same parameters, and now we want to deduplicate them for sanity.

## Good Old Destructuring

Simply define them in an object and later destructure them.

```ts
const commons = {
    q: Query(z.string().optional()),
    skip: Query(z.number().default(0)),
    limit: Query(z.number().default(100)),
}
```

```ts{4}
app.get("/items/{itemId}", {
    parameters: {
        itemId: Path(z.number().int().min(0)),
        ...commons
    },
    handle: ({ itemId, q, skip, limit }) => {/* ... */}
})
```

## Create Object Partial <Badge text="^1.1" />

Using the helper function `createObjectPartial` from the `workery/helpers` module to create an object partial callable. This is technically the same as destructuring but more readable.

```ts
import { createObjectPartial } from "workery/helpers"

const commonsPartial = createObjectPartial({
    q: Query(z.string().optional()),
    skip: Query(z.number().default(0)),
    limit: Query(z.number().default(100)),
})
```

```ts{2}
app.get("/", {
    parameters: commonsPartial({
        itemId: Path(z.number().int().min(0))
    }),
    handle: ({ itemId, q, skip, limit }) => {/* ... */}
})
```

## Pack Into Dependency

:::info Limited Scope
This only applies if you want to deduplicate parameters and nested dependencies.
:::

Define a dependency packing those parameters and later inject it to routes.

```ts
const commons = new Dependency({
    parameters: {
        q: Query(z.string().optional()),
        skip: Query(z.number().default(0)),
        limit: Query(z.number().default(100)),
    },
    handle: async (args) => args,
})
```

```ts{4}
app.get("/", {
    parameters: {
        itemId: Path(z.number().int().min(0))
        commons: Depends(commons)
    },
    handle: ({ itemId, commons }) => {/* ... */}
})
```