# Workery

Documentation: https://workery.iann838.com/

Workery is a Modern, OpenAPI based, fast to code, fully typed, ready for production, web framework for building APIs on Cloudflare Workers.

## Features

-   ⚡️ **Fast to code and fewer bugs.** Increase the speed to develop features and reduce developer induced errors.
-   ⚙️ **OpenAPI and Zod integrated seamlessly.** Built-in integration of Zod validators and OpenAPI schema generators.
-   🏷️ **Fully typed schemas and parameters.** All parameters and schemas are typed when implementing route handlers.
-   📖 **Interactive API documentation.** Swagger and Redoc pages are available by default at `/docs` and `/redoc`.
-   🪝 **Dependencies over complicated middleware.** Prepare variables, enforce authentication, and run other tasks before processing a request.
-   🔩 **Highly flexible and adaptable.** Designed for effortless addition, removal, and replacement of modules or components.

## Installation

```
yarn add workery
```

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

## Star me!

Star this repo if you find it helpful!
