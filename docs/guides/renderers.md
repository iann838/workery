# Renderers

Module: `apertum/renderers`

List of renderers.

## renderSwagger

Renders the Swagger docs HTML.

Signature:

```ts
function renderSwagger(
    url: string,
    options?: {
        title?: string
        jsUrl?: string
        cssUrl?: string
        faviconUrl?: string
        parameters?: Record<string, any>
    }
)
```

## renderRedoc

Renders the Redoc docs HTML.

Signature:

```ts
function renderRedoc(
    url: string,
    options?: {
        title?: string
        jsUrl?: string
        faviconUrl?: string
    }
)
```
