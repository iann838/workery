<div style="text-align: center; font-size: 60px; margin: 32px 0 64px 0">
    <img src="/icon.svg" style="height: 60px; display: inline; margin-bottom: -8px; margin-right: 16px" />
    <b>Workery</b>
</div>

## Create App

Create a new Workery app using NPM, Yarn, or PNPM.

::: code-group
```sh [npm]
npm create workery
```
```sh [yarn]
yarn create workery
```
```sh [pnpm]
pnpm create workery
```
:::

::: info About Templates
Some templates requires extra setup after creation, each template has a set of script commands, detailed docs for each template is located at [Templates](/templates/). Available templates:
```md
* hello-world
* d1-drizzle
* do-sql-drizzle
```
:::

Now, you app is set up, `cd` into the new folder.

## Run Server

Run local development server:

::: code-group
```sh [npm]
npm run dev
```
```sh [yarn]
yarn run dev
```
```sh [pnpm]
pnpm run dev
```
:::


## Check Output

Open your browser at http://127.0.0.1:8787.

You will see the JSON response as:

```json
{"message":"Hello World"}
```

## Add Routes

Let's add a new route:

```ts
import { Path, Query } from "workery/parameters"
import z from "zod"

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

## Interactive Docs

Now go to http://127.0.0.1:8787/docs.

You will see the interactive API documentation (provided by [Swagger UI](https://github.com/swagger-api/swagger-ui)), **try it out**:

![Swagger UI Docs](/swaggerdocs.jpg)

## Alternative Docs

And now, go to http://127.0.0.1:8787/redoc.

You will see the static API documentation (provided by [ReDoc](https://github.com/Rebilly/ReDoc)):

![ReDoc Docs](/redocdocs.jpg)

## Deploy App

Deploy your app to Cloudflare Workers:

::: code-group
```sh [npm]
npm run deploy
```
```sh [yarn]
yarn run deploy
```
```sh [pnpm]
pnpm run deploy
```
:::


## OpenAPI Spec

Workery generates a "schema" with all your API using the **OpenAPI** standard for defining APIs.

A "schema" is a definition or description of something. Not the code that implements it, but just an abstract description. This schema definition includes your API paths, the possible parameters they take, etc.

The term "schema" might also refer to the shape of some data, like a JSON content. In that case, it would mean the JSON attributes, and data types they have, etc.

If you are curious about how the raw OpenAPI schema looks like, Workery automatically generates a JSON (schema) with the descriptions of all your API.

You can see directly at: http://127.0.0.1:8787/openapi.json.

## License

This project is licensed under the terms of the [MIT license](https://github.com/iann838/workery/?tab=MIT-1-ov-file#readme).
