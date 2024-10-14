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
import { Query } from "workery/parameters"
import { z } from "zod"

const app = new App({})

app.get("/greet", {
    parameters: {
        name: Query(z.string())
    },
    handle: ({ name }) => {
        return `Hello, ${name}!`
    },
})

export default app
```
