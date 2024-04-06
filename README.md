# Apertum

Apertum is a modern, OpenAPI based, web framework for building APIs in Node.js and the Edge (Cloudflare Workers, AWS Lambda, etc.).

> Documentation is currently work in progress. For the meantime, use the following short guide.

## Installation

```
npm install apertum
```

## Quick Start

```ts
import { Apertum } from "apertum"
import { adaptCfWorkers } from "apertum/adapters"

const app = new Apertum({})

app.get("/hello-world", {
    parameters: {},
    handle: () => "Hello World!",
})

export adaptCfWorkers(app)
```

## Complex usage

```ts
import { z } from "zod"
import { Apertum, Dependency } from "apertum"
import { CORSMiddleware, CompressMiddleware } from "apertum/middleware"
import { Body, Depends, Header, Path, Query, Responds } from "apertum/parameters"
import { JSONResponse, PlainTextResponse } from "apertum/responses"

const app = new Apertum<{ env: {}, ctx: ExecutionContext }>({
    middleware: [CompressMiddleware("gzip"), CORSMiddleware({ origin: ["https://mysite.com"] })],
})

const requireAuthSession = new Dependency({
    parameters: {
        authorization: Header(z.string()),
    },
    handle: async ({ authorization }) => {
        return { id: 123, username: "myuser" } // Authentication logic
    },
})

app.get("/hello-world", {
    responseClass: PlainTextResponse, // Return plain text instead of JSON
    parameters: {
        testOpenAPI: Query(z.number().array()),
    },
    handle: () => "Hello World!",
})

app.post("/projects/{projectId}/todos", {
    tags: ["Todos"],
    summary: "Create project todos",
    description: "Create a todo for a project",
    deprecated: false,
    includeInSchema: true,
    statusCode: 200, // only if returns non-Response
    responseClass: JSONResponse, // only if returns non-Response
    responses: {
        // OAS purpose only
        200: Responds(z.object({ params: z.any({}) }), {
            description: "Returns received params",
        }),
        403: Responds(z.object({ detail: z.string() })),
        409: Responds(z.object({ detail: z.string() })),
    },
    parameters: {
        projectId: Path(z.number()),
        trackId: Query(z.string()),
        X_Rate_Limit: Header(z.string()),
        todoItem: Body(
            z.object({
                id: z.string(),
                title: z.string(),
                description: z.string(),
            })
        ),
        session: Depends(requireAuthSession),
    },
    handle: ({ req, projectId, trackId, X_Rate_Limit, todoItem, session }) => {
        // Handler implementation here
    },
})

export adaptCfWorkers(app)
```

## Adapters

Apertum requires adapters to support different JavaScript runtimes. Available built-in adapters:

-   `adaptCfWorkers`: Exposes the `fetch` API for Cloudflare Workers.

You can write your own adapter using the `app.handle` method, for details, check implementation of `adaptCfWorkers`.

## Handlers

-   Handlers by default provides the `req` argument, `env` and `ctx` arguments typings are available if Apertum was instantiated with an env generic:

```ts
const app = new Apertum<{ VARIABLE: string }>({})
```

-   All arguments typings defined on `parameters` will be available.

## Parameters

-   For non-body parameters, an automatic coercion `options.preprocessor` is used if it detects that `isJsonCoercible(schema) == true` (from `apertum/helpers`), qualified schemas includes but not limited to:
    -   `ZodNumber`
    -   `ZodBoolean`
    -   `ZodNativeEnum`
    -   `ZodArray<ZodNumber>`
    -   `ZodArray<ZodBoolean>`
    -   `ZodArray<ZodNativeEnum>`
    -   `ZodOptional<ZodNumber>`
    -   `ZodOptional<ZodBoolean>`
    -   `ZodOptional<ZodNativeEnum>`
    -   `ZodDefault<ZodNumber>`
    -   `ZodDefault<ZodBoolean>`
    -   `ZodDefault<ZodNativeEnum>`
-   To preprocess parameters before being parsed by zod, pass the preprocessor function to `options.preprocessor`, for example: `Path(z.number(), { preprocessor: jsonCoerce })`.
-   Body parameters access 3 more values other than zod types: `String`, `Blob` and `ReadableStream` (passed as is). Here is how it interprets in OAS:
    -   `Body(String)`: Receives a text body, returns `await req.text()`.
    -   `Body(Blob)`: Receives a binary file body, returns `await req.blob()`.
    -   `Body(ReadableStream)`: Receives a binary file body, returns `req.body` without reading it.
-   Body parameters can specify a `options.mediaType`, defaults to `application/json`.
-   Depends parameters are in other words: unorganized middlewares that returns a value. The parameter specifications in dependencies will be rendered on the route automatically, however, if you wish to use the values of a dependency parameter and for its typings to work, you must manually include it on the route parameters using `...myDependency.parameters`.
-   Responds parameters specifies the OpenAPI response structure for the route, it returns an OAS3.1 `ResponseConfig` and works interchangeably.

## Responses

-   Returning Response instances will returned as is.
-   Returning Non-Response values will use responseClass to create a Response before returning.
-   Response instances can be thrown anywhere including dependencies and middlewares (`throw new JSONResponse({ detail: "Conflict" }, { status: 409 })`).
-   Thrown values will be catched twice:
    1. Route handle: return if value is instance of Response, otherwise throw.
    2. Fetch handle: return if value is instance of Response, otherwise invoke exceptionHandler.

## API Reference

> This reference is not complete, only accounting the main ones.

```ts
class Apertum<G = {}> {
    constructor(init: {
        basePath?: string
        title?: string
        description?: string
        version?: string
        tags?: TagObject[]
        servers?: ServerObject[]
        contact?: ContactObject
        license?: LicenseObject
        termsOfService?: string
        openapiUrl?: string | null
        swaggerUrl?: string | null
        redocUrl?: string | null
        middleware?: Middleware<G>[]
        defaultResponseClass?: ResponseClass
        exceptionHandler?: ExceptionHandler<G>
    }) {
        this.basePath = init.basePath ?? ""
        this.title = init.title ?? "Untitled"
        this.description = init.description ?? ""
        this.version = init.version ?? "0.1.0"
        this.tags = init.tags ?? []
        this.servers = init.servers ?? [{ url: "/" }]
        this.contact = init.contact
        this.license = init.license
        this.termsOfService = init.termsOfService
        this.openapiUrl = init.openapiUrl === null ? null : init.openapiUrl ?? "/openapi.json"
        this.swaggerUrl = init.swaggerUrl === null ? null : init.swaggerUrl ?? "/docs"
        this.redocUrl = init.redocUrl === null ? null : init.redocUrl ?? "/redoc"
        this.middleware = init.middleware ?? []
        this.defaultResponseClass = init.defaultResponseClass ?? JSONResponse
        this.exceptionHandler = init.exceptionHandler ?? defaultExceptionHandler
    }
}

type HeadlessRoute<R, Ps extends RouteParameters, G> = {
    name?: string
    tags?: string[]
    summary?: string
    description?: string
    deprecated?: boolean
    servers?: ServerObject[]
    responses?: Record<number, ResponseConfig>
    includeInSchema?: boolean
    statusCode?: number
    responseClass?: ResponseClass
    parameters: Ps
    handle: RouteHandler<R, Ps, G>
}

class Middleware<G = {}> {
    of?: Apertum<G> // Typing purposes only (infering G)
    name?: string
    handle: MiddlewareHandler<G>
}

class Dependency<R, Ps extends RouteParameters, G = {}> {
    of?: Apertum<G> // Typing purposes only (infering G)
    name?: string
    parameters: Ps
    handle: RouteHandler<R, Ps, G>
}

function Path(
    schema: z.ZodType = z.string(),
    options?: Omit<RouteParameterOptions, "mediaType">
): PathParameter<z.ZodType>

function Query(
    schema: z.ZodType = z.string(),
    options?: Omit<RouteParameterOptions, "mediaType">
): QueryParameter<z.ZodType>

function Header(
    schema: z.ZodType = z.string(),
    options?: Omit<RouteParameterOptions, "mediaType">
): HeaderParameter<z.ZodType>

function Cookie(
    schema: z.ZodType = z.string(),
    options?: Omit<RouteParameterOptions, "mediaType">
): CookieParameter<z.ZodType>

function Body(
    schema: ZodBodyable = String,
    options?: Omit<RouteParameterOptions, "altName">
): BodyParameter<z.ZodType>

function Depends<R>(dependency: Dependency<R, any, any>): DependsParameter<z.ZodType<R>>

function Responds(schema: ZodBodyable = String, options?: RespondsOptions): ResponseConfig

class JSONResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(JSON.stringify(body), init)
        this.headers.set("Content-Type", "application/json")
    }
}

class HTMLResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(String(body), init)
        this.headers.set("Content-Type", "text/html;charset=utf-8")
    }
}

class PlainTextResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(String(body), init)
        this.headers.set("Content-Type", "text/plain;charset=utf-8")
    }
}
```
