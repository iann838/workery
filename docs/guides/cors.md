# CORS (Cross-Origin Resource Sharing)

[CORS or "Cross-Origin Resource Sharing"](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) refers to the situations when a frontend running in a browser has JavaScript code that communicates with a backend, and the backend is in a different "origin" than the frontend.

::: tip Worker Route Pattern
If your project consists of frontend and backend parts, with Cloudflare, you can deploy both under the same domain and save the headache with CORS. Here is how you do it:

1. Deploy frontend on `example.com`.
2. Deploy backend (workers) configured with [route pattern](https://developers.cloudflare.com/workers/configuration/routing/routes/#set-up-a-route-in-wranglertoml) `example.com/api/*`
3. Set [`rootPath` option of `App`](./app-router-options.md#app-options) to `"/api"`.

Now, frontend and backend will be communicating in the same domain, but if you still need CORS, continue reading.
:::

## CORS Middleware

**Workery** provides built-in middleware for CORS.

```ts{5-7}
import { CORSMiddleware } from "workery/middleware"

const app = new App<Env>({
	middleware: [
		CORSMiddleware({
            origin: ["http://localhost:8080", "https://example.com"]
        }),
	]
})
```

Available options:

| Name | Type |
| :------ | :------ |
| `origin` | `string` \| `string`[] \| (`origin`: `string`) => `undefined` \| ``null`` \| `string` |
| `allowMethods?` | `string`[] |
| `allowHeaders?` | `string`[] |
| `maxAge?` | `number` |
| `credentials?` | `boolean` |
| `exposeHeaders?` | `string`[] |
