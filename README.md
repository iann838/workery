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

## Setup

```sh
npm create cloudflare@latest -- --template iann838/workery/templates/hello-world
```

## Example

```ts
import { App } from "workery"
import { Path, Query } from "workery/parameters"
import z from "zod"

const app = new App<Env>({})

app.get("/items/{itemId}", {
    parameters: {
        itemId: Path(z.number().int().min(0)),
        q: Query(z.string().optional()),
    },
    handle: ({ itemId, q }) => {
        return { itemId, q }
    },
})

export default app
```

![Swagger Docs](https://workery.iann838.com/swaggerdocs.jpg)

---

Join other developers in **starring ⭐** this repository to show your support!
