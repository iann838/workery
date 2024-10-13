# Getting Started

## Installation

```
yarn add workery
```

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

::: info
Ensure that your `tsconfig.json` is has enabled `"moduleResolution": "Bundler"` for imports to work properly.
:::