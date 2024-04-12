[Apertum](../README.md) / routing

# Module: routing

## Table of contents

### Classes

- [Route](../classes/routing.Route.md)
- [RouteNode](../classes/routing.RouteNode.md)
- [Router](../classes/routing.Router.md)

### Functions

- [fixPathSlashes](routing.md#fixpathslashes)
- [searchParamsToQueries](routing.md#searchparamstoqueries)

## Functions

### fixPathSlashes

▸ **fixPathSlashes**(`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[src/routing.ts:14](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L14)

___

### searchParamsToQueries

▸ **searchParamsToQueries**(`searchParams`): `Record`\<`string`, `string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchParams` | `URLSearchParams` |

#### Returns

`Record`\<`string`, `string`[]\>

#### Defined in

[src/routing.ts:162](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L162)
