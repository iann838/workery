# Getting Started

## Installation

```
npm install apertum
```

## Quick Start

```ts
import { Apertum } from "apertum"
import { adaptCfWorkers } from "apertum/adapters"
import { Query } from "apertum/parameters"
import { z } from "zod"

const app = new Apertum({})

app.get("/greet", {
    parameters: {
        name: Query(z.string())
    },
    handle: ({ name }) => {
        return `Hello, ${name}!`
    },
})

export default adaptCfWorkers(app)
```
