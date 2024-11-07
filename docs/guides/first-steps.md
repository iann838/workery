<div style="text-align: center; font-size: 60px; margin: 32px 0 64px 0">
    <img src="/icon.svg" style="height: 60px; display: inline; margin-bottom: -8px; margin-right: 16px" />
    <b>Workery</b>
</div>

## Installation

Install `workery` using Yarn, NPM, or PNPM.

::: code-group
```sh [yarn]
yarn add workery
```
```sh [npm]
npm install workery
```
```sh [pnpm]
pnpm add workery
```
:::

::: info About imports
You may need `"moduleResolution": "Bundler"` enabled on your `tsconfig.json` for imports to work properly.
:::

## Create app

The simplest Workery `index.ts` could look like this:

```ts
import { App } from "workery"

const app = new App<Env>({})

app.get("/", {
    parameters: {},
    handle: () => {
        return { message: "Hello World" }
    },
})
```

## Run locally

Run your app locally:

::: code-group
```sh [yarn]
yarn dev
```
```sh [npm]
npm run dev
```
```sh [pnpm]
pnpm run dev
```
:::


## Check output

Open your browser at http://127.0.0.1:8787.

You will see the JSON response as:

```json
{ "message": "Hello World" }
```

## Add routes

Let's add a new route:

```ts
app.get("/items/{itemId}", {
    parameters: {
        itemId: Path(z.number().int().min(0)),
        q: Query(z.string().optional()),
    },
    handle: ({ itemId, q }) => {
        return { itemId, q }
    },
})
```

## Interactive API docs

Now go to http://127.0.0.1:8787/docs.

You will see the interactive API documentation (provided by [Swagger UI](https://github.com/swagger-api/swagger-ui)), **try it out**:

![Swagger UI Docs](/swaggerdocs.jpg)

## Alternative API docs

And now, go to http://127.0.0.1:8787/redoc.

You will see the alternative documentation (provided by [ReDoc](https://github.com/Rebilly/ReDoc)):

![ReDoc Docs](/redocdocs.jpg)

## OpenAPI Specification

Workery generates a "schema" with all your API using the **OpenAPI** standard for defining APIs.

A "schema" is a definition or description of something. Not the code that implements it, but just an abstract description. This schema definition includes your API paths, the possible parameters they take, etc.

The term "schema" might also refer to the shape of some data, like a JSON content. In that case, it would mean the JSON attributes, and data types they have, etc.

If you are curious about how the raw OpenAPI schema looks like, Workery automatically generates a JSON (schema) with the descriptions of all your API.

You can see directly at: http://127.0.0.1:8787/openapi.json.

## License

This project is licensed under the terms of the [MIT license](https://github.com/iann838/workery/?tab=MIT-1-ov-file#readme).
