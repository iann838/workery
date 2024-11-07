# App Router Options

You may have noticed the `{}` as the constructor argument when instantiating apps and routers. That is the init options of those classes, allowing you to customize or set app / router level options for routes registered under it.

:::tip Why Router First
The `App` class extends `Router`, init options in `Router` are also available in `App`. Therefore, this guide has placed the base class `Router` at the beginning.
:::

## Router Options

This class is used for structuring [big applications](./bigger-apps.md) into multiple routers that is later included in the main app.

| Name | Type | Description | Default |
| :------ | :------ | :------ | :------ |
| `tags?` | `string`[] | List of tags to be applied to all routes. | `[]` |
| `deprecated?` | `boolean` | Set the deprecated status to all routes. | `false` |
| `includeInSchema?` | `boolean` | Set to include or exclude all routes from the generated OpenAPI document. | `true` |
| `responses?` | `Record`\<`number`, `ResponseConfig`\> | Additional [response schemas](./responses.md#openapi-schemas) to all routes, shown in the generated OpenAPI document. | `{ 422: ... }` |
| `defaultResponseClass?` | [`ResponseClass`](/reference/modules/types.md#responseclass) | Default response class of all routes. | `JSONResponse` |

## App Options

Main application class. Extends `Router`.

All `Router` init options plus:


| Name | Type | Description | Default |
| :------ | :------ | :------ | :------ |
| `rootPath?` | `string` | Root path of your application, a prefix that is not seen on the application but is seen by clients, like Worker Route Patterns and Swagger. | `"/"` |
| `title?` | `string` | Title of the application (OpenAPI). | `"Workery API"` |
| `description?` | `string` | Description of the application (OpenAPI). | `""` |
| `version?` | `string` | Version of the application (OpenAPI). | `"0.1.0"` |
| `tagsInfo?` | `TagObject`[] | List of tag descriptions used by application routes. | `[]` |
| `servers?` | `ServerObject`[] | List of connectivity information of the application (OpenAPI). | `[{ url: this.rootPath }]` |
| `contact?` | `ContactObject` | Contact info of the application (OpenAPI) | `undefined` |
| `license?` | `LicenseObject` | License info of the application (OpenAPI) | `undefined` |
| `termsOfService?` | `string` | Terms of service info of the application (OpenAPI) | `undefined` |
| `openapiUrl?` | ``null`` \| `string` | Route path URL for serving the OpenAPI JSON document. | `"/openapi.json"` |
| `swaggerUrl?` | ``null`` \| `string` | Route path URL for serving the Swagger interactive documentation. | `"/docs"` |
| `redocUrl?` | ``null`` \| `string` | Route path URL for serving the ReDoc alternative documentation. | `"/redoc"` |
| `middleware?` | [`Middleware`](middleware.Middleware.md)\<`E`\>[] | List of middleware applied to the application | `[]` |
| `exceptionHandler?` | [`ExceptionHandler`](/reference/modules/types.md#exceptionhandler)\<`E`\> | Exception handler when an exception or error has occured during requests. | `baseExceptionHandler` |
