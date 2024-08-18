# Getting Started

## Installation

```
npm install workery
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
