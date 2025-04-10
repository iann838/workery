# Basic Parameters

You can declare "parameters" or "variables" under the `parameters` key on route declaration, parameter declaration involves parameter constructors and zod schemas: 

```ts {5,7}
import { Path } from "workery/parameters"
import z from "zod"

app.get("/items/{itemId}", {
    parameters: {
        itemId: Path(z.string()),
    },
    handle: ({ itemId }) => {
        return { itemId }
    },
})
```

The value of the path parameter `itemId` will be validated on request and passed to your handler function as the argument `itemId`. These arguments are **fully typed** based on the schemas provided on declaration.

So, if you run this example and go to http://127.0.0.1:8787/items/foo, you will see a response of:

```ts
{"itemId":"foo"}
```

You can define `Query`, `Header`, and `Cookie` the same way as defining a `Path` parameter above.

```ts {5-8,10}
import { Path, Query, Header, Cookie } from "workery/parameters"

app.get("/items/{itemId}", {
    parameters: {
        itemId: Path(z.string()),
        page: Query(z.number()),
        X_Rate_Limit: Header(z.string()),
        yummy: Cookie(z.string().optional()),
    },
    handle: ({ itemId, page, X_Rate_Limit, yummy }) => {
        return { itemId, page, X_Rate_Limit, yummy }
    },
})
```

:::info Schema Exclusion for Browser Enforced Headers <Badge type="tip" text="^1.2" />
Some headers are ignored, or not sent by the browser due to security or protocol enforcement. These headers under normal circumstances should be excluded from the OpenAPI parameters schema, **this does not affect route implementations**. By default, Workery sets `includeInSchema: false` to the following list of headers:
```ts
[
    "accept-encoding",
    "accept-language",
    "accept",
    "authorization",
    "connection",
    "content-length",
    "content-type",
    "cookie",
    "host",
    "if-modified-since",
    "if-none-match",
    "keep-alive",
    "origin",
    "proxy-authenticate",
    "proxy-authorization",
    "referer",
    "set-cookie",
    "transfer-encoding",
    "upgrade",
    "user-agent",
    "cf-connecting-ip",
    "cf-ipcountry",
    "cf-ray",
    "cf-visitor",
    "x-forwarded-for",
    "x-real-ip",
    "cf-pseudo-ipv4",
    "cf-connecting-ipv6",
    "cdn-loop",
    "cf-worker",
]
```
You may force these headers into the OpenAPI schema by manually setting `includeInSchema: true`.

Some of these headers may cause conflict in Swagger, as they are controlled by a different UI in Swagger (e.g. `Accept` is controlled by a dropdown menu in the response part of the UI), therefore, they are recommended to be excluded.
:::

:::warning Cookies in Swagger
At the moment, sending cookies in Swagger is [not possible](https://swagger.io/docs/specification/v3_0/authentication/cookie-authentication/). Making request to the example above in the interactive docs, `yummy` will always return `undefined`.
:::

## Parameters Behavior

`Path` parameters requires declaration on route path using `{}` annotation.

```ts
"/items/{itemId}"
```

`Header` parameters automatically replaces the `_` character with `-`, preventing syntax error when accessing a header such as `X-Rate-Limit` in the handler.

```ts
X_Rate_Limit: Header(z.string())
```

This will register a header param using the key `X-Rate-Limit` both in the OpenAPI document and request validation.

`Query` parameters can be declared with array schemas, these accepts multiple query values for the same key and return them in an array.

```ts
selectedItems: Query(z.array(z.number())) // or
selectedItems: Query(z.number().array())
```

## Complex Schemas

Sometimes, you may want schemas that are more complex than simple data types, here are some examples:

```ts
z.string().regex(/^\S*$/g) // regex no spaces
z.number().int().min(0) // positive integer
z.enum(["apple", "orange", "blueberry"]) // enums
z.nativeEnum({ a: 2, b: 3 }) // native enums
```

Optional and nullable schemas are different:

```ts
z.string().optional() // not required, can be undefined
z.string().nullable() // required! can be null
```

You can also provide a default value:

```ts
z.string().default("default") // returns "default" if not provided
```

For even more complex schemas, to the point that refinement or transformation is needed, you are required to manually declare the OpenAPI type if this is the case:

```ts
z.string().refine(/* ... */).openapi({ type: 'number' })
```

## Alternative Name

You can declare parameters that is registered on an alternative name different from your parameter key in code.

```ts
page: Query(z.number(), { altName: "pageNum" })
```

This declares a `pageNum` query parameter and the value is assigned to the `page` argument on your handler.

## Data Coercion

Data coercion is the process of automatic or implicit conversion of values from one data type to another. This is required for basic parameters because all incoming values are strings, these has to be converted to the correct data type before validation.

By default, a coercion `preprocessor` function is used if it detects that the schema meets coercion requirements, example of qualified schemas includes but not limited to:
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

The coercion is determined using `isJsonCoercible(schema)` function from the `workery/helpers` module.

You can manually set a data `preprocessor` for a parameter:

```ts
Query(z.any(), { preprocessor: /*...*/ })
```

## Other Options

You can provide a parameter description for the OpenAPI schemas:

```ts
page: Query(z.number(), { description: "Page Number" })
```

Or exclude it from the OpenAPI schemas:

```ts
page: Query(z.number(), { includeInSchema: false })
```

:::warning Exclusion
Excluding parameters from OpenAPI schemas will also remove it from the Swagger interactive docs, which may cause request to have incomplete data.
:::

## Type Annotations

All handler arguments are typed. In your editor, on your handler function you will get type annotations and code completion with their infered schema type.

![Editor Param Type Hint](/editorparamtypehint.jpg)

## Zod OpenAPI

In rare cases, you may need to manually to modify the generated OpenAPI schemas from zod schemas. Thanks to the `"@asteasolutions/zod-to-openapi"` package, a method called `openapi` is injected to all zod types. Available `.openapi()` options:

```ts
{
    discriminator?: DiscriminatorObject;
    readOnly?: boolean;
    writeOnly?: boolean;
    xml?: XmlObject;
    externalDocs?: ExternalDocumentationObject;
    example?: any;
    examples?: any[];
    deprecated?: boolean;
    type?: SchemaObjectType | SchemaObjectType[];
    format?: 'int32' | 'int64' | 'float' | 'double' | 'byte' | 'binary' | 'date' | 'date-time' | 'password' | string;
    allOf?: (SchemaObject | ReferenceObject)[];
    oneOf?: (SchemaObject | ReferenceObject)[];
    anyOf?: (SchemaObject | ReferenceObject)[];
    not?: SchemaObject | ReferenceObject;
    items?: SchemaObject | ReferenceObject;
    properties?: {
        [propertyName: string]: SchemaObject | ReferenceObject;
    };
    additionalProperties?: SchemaObject | ReferenceObject | boolean;
    propertyNames?: SchemaObject | ReferenceObject;
    description?: string;
    default?: any;
    title?: string;
    multipleOf?: number;
    maximum?: number;
    const?: any;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    enum?: any[];
    prefixItems?: (SchemaObject | ReferenceObject)[];
    contentMediaType?: string;
    contentEncoding?: string;
}
```
