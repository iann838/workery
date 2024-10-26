# Getting Started

## Installation

```
yarn add workery
```

::: info About imports
Ensure that your `tsconfig.json` has enabled `"moduleResolution": "Bundler"` for imports to work properly.
:::

## Quick Start

```ts
import { App } from "workery"
import { Path, Query } from "workery/parameters"
import z from "zod"

const app = new App<Env>({})

app.get("/entry/{id}", {
    parameters: {
        id: Path(z.string().min(2).max(10)),
        page: Query(z.number().int().min(0).max(20)),
    },
    handle({ id, page }) {
        return { id, page }
    },
})

export default app
```
