# Request Body

When you need to send data from a client (let's say, a browser) to your API, you send it as a **request body**. This data is typically included in `POST`, `PUT`, `PATCH`, or `DELETE` requests.

## Declaration

To declare a **request body**, use the `Body` parameter constructor together with zod schemas:

```ts{3-7,9}
app.post("/items", {
    parameters: {
        item: Body(z.object({
			name: z.string(),
			price: z.number().min(0),
			description: z.string(),
		})),
    },
    handle: ({ item }) => {
        return item
    },
})
```

With that body parameter declaration, **Workery** will:

- Read the body of the request as JSON.
- Validate the data.
    - If the data is invalid, it will return a nice and clear error, indicating exactly where and what was the incorrect data.
- Give you the received data in the argument `item`.
    - As you declared it with the schema, the argument is fully typed.
- Those schemas will be part of the generated OpenAPI schema, and used by the automatic documentation UIs.

## Raw Body

Sometimes, you might want the request body without any processing. Workery supports this by accepting special classes on the `Body` parameter constructor:

- 
    ```ts
    json: Body(String)
    ```
    Receives a text body, passes the return value of `await req.text()`.

- 
    ```ts
    blob: Body(Blob)
    ```
    Receives a **binary file** body, passes the return value of `await req.blob()`.

- 
    ```ts
    stream: Body(ReadableStream)
    ```
    Receives a **binary file** body, passes the value of `req.body` without reading it.

::: tip Parameter Naming
In these examples, parameters are named, but you can name the parameters however you want.
:::

When the request body is no longer JSON formatted, you need to declare the media type using `options.mediaType` so the OpenAPI schemas are generated correctly.

```ts
html: Body(String, { mediaType: "text/html" })
```

## Automatic docs

The body schema will be part of your OpenAPI route, and will be shown in the interactive API docs:

![Docs Post Request](/docspostreq.jpg)

## Type Annotations

Body arguments are typed. In your editor, on your handler function you will get type hints and completion with their infered schema type.

![Editor Body Param](/editorbodyparam.png)
