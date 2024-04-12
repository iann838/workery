[Apertum](../README.md) / [routing](../modules/routing.md) / Router

# Class: Router\<G\>

[routing](../modules/routing.md).Router

## Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

## Table of contents

### Constructors

- [constructor](routing.Router.md#constructor)

### Properties

- [routes](routing.Router.md#routes)

### Accessors

- [length](routing.Router.md#length)

### Methods

- [[iterator]](routing.Router.md#[iterator])
- [push](routing.Router.md#push)
- [match](routing.Router.md#match)

## Constructors

### constructor

• **new Router**\<`G`\>(): [`Router`](routing.Router.md)\<`G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

#### Returns

[`Router`](routing.Router.md)\<`G`\>

#### Defined in

[src/routing.ts:175](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L175)

## Properties

### routes

• **routes**: [`Route`](routing.Route.md)\<`any`, `any`, `G`\>[]

#### Defined in

[src/routing.ts:172](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L172)

## Accessors

### length

• `get` **length**(): `number`

#### Returns

`number`

#### Defined in

[src/routing.ts:186](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L186)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<[`Route`](routing.Route.md)\<`any`, `any`, `G`\>\>

#### Returns

`IterableIterator`\<[`Route`](routing.Route.md)\<`any`, `any`, `G`\>\>

#### Defined in

[src/routing.ts:180](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L180)

___

### push

▸ **push**(`...routes`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...routes` | [`Route`](routing.Route.md)\<`any`, `any`, `G`\>[] |

#### Returns

`number`

#### Defined in

[src/routing.ts:190](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L190)

___

### match

▸ **match**(`method`, `path`): [`undefined` \| ``null`` \| [`Route`](routing.Route.md)\<`any`, `any`, `G`\>, `Record`\<`string`, `string`\>]

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `path` | `string` |

#### Returns

[`undefined` \| ``null`` \| [`Route`](routing.Route.md)\<`any`, `any`, `G`\>, `Record`\<`string`, `string`\>]

#### Defined in

[src/routing.ts:211](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L211)
