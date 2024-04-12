[Apertum](../README.md) / middleware

# Module: middleware

## Table of contents

### Classes

- [Middleware](../classes/middleware.Middleware.md)

### Functions

- [CORSMiddleware](middleware.md#corsmiddleware)
- [CompressMiddleware](middleware.md#compressmiddleware)

## Functions

### CORSMiddleware

▸ **CORSMiddleware**(`options?`): [`Middleware`](../classes/middleware.Middleware.md)\<{}\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.origin` | `string` \| `string`[] \| (`origin`: `string`) => `undefined` \| ``null`` \| `string` |
| `options.allowMethods?` | `string`[] |
| `options.allowHeaders?` | `string`[] |
| `options.maxAge?` | `number` |
| `options.credentials?` | `boolean` |
| `options.exposeHeaders?` | `string`[] |

#### Returns

[`Middleware`](../classes/middleware.Middleware.md)\<{}\>

#### Defined in

[src/middleware.ts:16](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/middleware.ts#L16)

___

### CompressMiddleware

▸ **CompressMiddleware**(`format`): [`Middleware`](../classes/middleware.Middleware.md)\<{}\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `CompressionFormat` |

#### Returns

[`Middleware`](../classes/middleware.Middleware.md)\<{}\>

#### Defined in

[src/middleware.ts:105](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/middleware.ts#L105)
