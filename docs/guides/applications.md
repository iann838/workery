# Applications

Module: `apertum/applications`

## Apertum

Defines a standard application.

Example:

```ts
const app = new Apertum({})
```

Init:

| Name | Type | Description | Default |
| :------ | :------ | :------ | :----- |
| `basePath?` | `string` | Base path of the application. | `""` |
| `title?` | `string` | Title of the application. | `"Untitled"` |
| `description?` | `string` | Description of the application. | `""` |
| `version?` | `string` | Version of the application. | `"0.1.0"` |
| `tags?` | `TagObject[]` |  List of tags used by OpenAPI. | `[]` |
| `servers?` | `ServerObject[]` | List of target servers used by OpenAPI. | `[{ url: "/" }]` |
| `contact?` | `ContactObject` | Contact info used by OpenAPI. | |
| `license?` | `LicenseObject` | License info used by OpenAPI. | |
| `termsOfService?` | `string` | ToS info used by OpenAPI | |
| `openapiUrl?` | `null \| string` | The URL where the OpenAPI schema will be served from. If set to `null`, no OpenAPI schema will be served publicly, and the default automatic docs will also be disabled. | `"/openapi.json"` |
| `swaggerUrl?` | `null \| string` | The path to the automatic Swagger API documentation. Can be disabled by setting it to `null`. | `"/docs"` |
| `redocUrl?` | `null \| string` | The path to the automatic Redoc API documentation. Can be disabled by setting it to `null`. | `"/redoc"` |
| `middleware?` | `Middleware<G>[]` | List of middleware used by the application. | `[]` |
| `defaultResponseClass?` | `ResponseClass` | The default response class to be used. | `JSONResponse` |
| `exceptionHandler?` | `ExceptionHandler<G>` | The handler to be used in case of exception. | `baseExceptionHandler` |

The generic `G` should be manually typed, specifying the global common args except `req`, this allow global args to be typed when implementing handlers. For example for a cloudflare workers project with D1 binding:

```ts
interface Env {
    API_KEY: string
    D1: D1Database
}

const app = new Apertum<{ env: Env, ctx: ExecutionContext }>({})
```

## Adding routes

Related methods: `get`, `post`, `put`, `patch`, `delete`, `head`, `options`, `trace`

Example:

```ts
app.get("/greet", {
    parameters: {
        name: Query(z.string())
    },
    handle: ({ name }) => {
        return `Hello, ${name}!`
    },
})
```

Path follows the OAS syntax: `/path/{param}`. Does not support regex, please use zod on parameter definition instead (e.g. `Path(z.string().regex(/^prefix/))`).

When adding routes to the application, it receives headless route that later the application will use it to create the actual route internally. Headless route config:

| Key | Type | Descrition | Default |
| :-- | :--- | :--------- | :------ |
| `name?` | `string` | Identifier purpose only. |  |
| `tags?` | `string[]` | Tags to be attached to in OAS. | `[]` |
| `summary?` | `string` | Summary to be rendered. | `""` |
| `description?` | `string` | Description to be rendered. | `""` |
| `deprecated?` | `boolean` | Deprecation flag in OAS. | `false` |
| `servers?` | `ServerObject[]` | Alternative server list. |  |
| `responses?` | `Record<number, ResponseConfig>` | Response config to be rendered in OAS. | `{}` |
| `statusCode?` | `number` | Default status code of `Response` constructor if return value is not a `Response`. | `200` |
| `includeInSchema?` | `boolean` | Include in OAS rendering. | `true` |
| `responseClass?` | `ResponseClass` | Default `Response` constructor if return value is not a `Response`. | `JSONResponse` |
| `parameters` | `Ps extends RouteParameters` | Parameter specification. See [Parameters](/guides/parameters.md). |  |
| `handle` | `RouteHandler<R, Ps, G>` | Route handler function |  |

To add a route with a dynamic http method at runtime, use the `route` method instead.

## Route handlers

Route handlers is defined by a function of the following signatures:

```ts
(args: ArgsOf<Ps, G>) => Promise<R>
(args: ArgsOf<Ps, G>) => R
```

Simple handler example:

```ts
app.get("/greet", {
    parameters: {
        name: Query(z.string())
    },
    handle: ({ name }) => {
        return `Hello, ${name}!`
    },
})
```

Return text instead of JSON:

```ts
import { PlainTextResponse } from "apertum/responses"

app.get("/greet", {
    responseClass: PlainTextResponse,
    parameters: {
        name: Query(z.string())
    },
    handle: ({ name }) => {
        return `Hello, ${name}!`
    },
})
```

Directly returning a response:

```ts
import { PlainTextResponse } from "apertum/responses"

app.get("/greet", {
    responseClass: PlainTextResponse,
    parameters: {
        name: Query(z.string())
    },
    handle: ({ name }) => {
        return new PlainTextResponse(`Hello, ${name}!`)
    },
})
```

Throwing a response:

```ts
import { JSONResponse } from "apertum/responses"

app.get("/greet", {
    responseClass: PlainTextResponse,
    parameters: {
        name: Query(z.string())
    },
    handle: ({ name }) => {
        throw new JSONResponse({ detail: `Oops, ${name}!`}, { status: 400 })
        console.log("I should not log")
        return "I should not return"
    },
})
```

Accessing global args (`req` and any extras depending on adapter):

```ts
app.get("/greet", {
    parameters: {
        name: Query(z.string())
    },
    handle: ({ req, name }) => {
        return `Hello, ${name}! @ ${req.url}`
    },
})
```
