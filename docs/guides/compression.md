# Compression

Compression can be applied globally to all outbound data of your app.

::: tip Value of Compression
It's best to first assess whether you need compression, two main incentives for compression are:

1. Reduce outbound data transfer costs.
2. Speed up response time for users.

For 1. Cloudflare does not charge outbound data transfer (it's free), but you might get charged a little more for compression CPU time.

For 2. Unless all your responses are bigger than 1M, it really does not make a difference.
:::

## Compress Middleware

**Workery** provides built-in middleware for compression.

```ts{5}
import { CompressMiddleware } from "workery/middleware"

const app = new App<Env>({
	middleware: [
		CompressMiddleware("gzip"),
	]
})
```

Available options:

| Name | Type |
| :------ | :------ |
| `format` | `"deflate" \| "deflate-raw" \| "gzip"` |
