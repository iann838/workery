[Apertum](../README.md) / [routing](../modules/routing.md) / RouteNode

# Class: RouteNode\<G\>

[routing](../modules/routing.md).RouteNode

## Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

## Table of contents

### Constructors

- [constructor](routing.RouteNode.md#constructor)

### Properties

- [name](routing.RouteNode.md#name)
- [routes](routing.RouteNode.md#routes)
- [paramNames](routing.RouteNode.md#paramnames)

### Methods

- [touch](routing.RouteNode.md#touch)
- [match](routing.RouteNode.md#match)

## Constructors

### constructor

• **new RouteNode**\<`G`\>(`name`): [`RouteNode`](routing.RouteNode.md)\<`G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`RouteNode`](routing.RouteNode.md)\<`G`\>

#### Defined in

[src/routing.ts:145](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L145)

## Properties

### name

• **name**: `string`

#### Defined in

[src/routing.ts:141](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L141)

___

### routes

• **routes**: `Record`\<`string`, [`Route`](routing.Route.md)\<`any`, `any`, `G`\>\>

#### Defined in

[src/routing.ts:142](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L142)

___

### paramNames

• **paramNames**: `string`[]

#### Defined in

[src/routing.ts:143](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L143)

## Methods

### touch

▸ **touch**(`node`): [`RouteNode`](routing.RouteNode.md)\<`G`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` |

#### Returns

[`RouteNode`](routing.RouteNode.md)\<`G`\>

#### Defined in

[src/routing.ts:152](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L152)

___

### match

▸ **match**(`node`): `undefined` \| [`RouteNode`](routing.RouteNode.md)\<`G`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` |

#### Returns

`undefined` \| [`RouteNode`](routing.RouteNode.md)\<`G`\>

#### Defined in

[src/routing.ts:157](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L157)
