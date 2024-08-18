# Parameters

Module: `workery/parameters`

Parameter definition is directly integrated with Zod validators and the corresponding OpenAPI schema is generated when required.

Options:

| Key | Type | Applies | Description |
| :---- | :-----| :------ | :------- |
| `altName` | `string` | Non-body | Alternative name used for field lookup, used if orginal name is reserved or taken. | 
| `mediaType` | `string` | Body | Media type to be rendered on the OAS. |
| `description` | `string` | All | Description of the schema to be rendered on the OAS. |
| `includeInSchema` | `boolean` | All | Include in OAS rendering, but validation will remain active. Default: `true` |
| `preprocessor` | `<Out = any, In = any>(value: In) => Out \| In` | All | Preprocessor function, invoked with input before validation (e.g. coercion, transformation). |


## Path, Query, Header, Cookie

Defines non-body parameters.

Example:

```ts
    // ...
    parameters: {
        projectId: Path(z.number()),
        timestamp: Query(z.datetime()),
        X_Rate_Limit: Header(z.string()),
        trackId: Cookie(z.string()),
    },
    handle: ({ projectId, timestamp, X_Rate_Limit, trackId }) => {
        // ...
    }
```

Header parameter keys automatically replaces `_` with `-` to ease definition of dash separated headers such as `X-Rate-Limit`.

An automatic coercion `options.preprocessor` is used if it detects that `isJsonCoercible(schema) == true` (from `workery/helpers`), qualified schemas includes but not limited to:
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

## Body

Defines the body parameter.

Example:

```ts
    // ...
    parameters: {
        // ...
        item: Body(
            z.object({
                id: z.string(),
                title: z.string(),
                description: z.string(),
            })
        ),
    }
```

It accepts values other than Zod schemas and behaves differently:
-   `Body(String)`: Receives a text body, returns `await req.text()`.
-   `Body(Blob)`: Receives a binary file body, returns `await req.blob()`.
-   `Body(ReadableStream)`: Receives a binary file body, returns `req.body` without reading it.

Body parameters can specify `options.mediaType`, defaults to `application/json`.

## Depends

Defines a dependency parameter, the return value of the dependency is assigned to this parameter during request validation and made accessible as arguments for the handler.

Example:

```ts
const doubleNumber = new Dependency({
    parameters: {
        number: Query(z.number()),
    },
    handle: ({ number }) => {
        return number * 2
    },
})
```

```ts
    // ...
    parameters: {
        doubled: Depends(doubleNumber)
    }
    handle: ({ doubled }) => {
        // ...
    }

```

The parameter specifications in dependencies will be validated and rendered on the OAS of the route automatically. However, if you wish to use a parameter belonging to a dependency and for its typings to work, you must manually include it on the route's parameters using `...dependency.parameters`.

## Responds

Defines a response config, it specifies a OpenAPI response object for the route, it **does not** manipulate the route handler nor validate the return value. Returns an OAS3.1 `ResponseConfig` and works interchangeably.

Example:

```ts
    // ...
    responses: {
        200: Responds(z.object({
            id: z.number()
        }), { description: "Returns an item" }),
        403: Responds(z.object({ detail: z.string() })),
        409: Responds(z.object({ detail: z.string() })),
    },
```
