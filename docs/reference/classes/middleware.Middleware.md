[Apertum](../README.md) / [middleware](../modules/middleware.md) / Middleware

# Class: Middleware\<G\>

[middleware](../modules/middleware.md).Middleware

## Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

## Table of contents

### Constructors

- [constructor](middleware.Middleware.md#constructor)

### Properties

- [of](middleware.Middleware.md#of)
- [name](middleware.Middleware.md#name)
- [handle](middleware.Middleware.md#handle)

## Constructors

### constructor

• **new Middleware**\<`G`\>(`init`): [`Middleware`](middleware.Middleware.md)\<`G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `init` | `Object` |
| `init.of?` | [`Apertum`](applications.Apertum.md)\<`G`\> |
| `init.name?` | `string` |
| `init.handle` | [`MiddlewareHandler`](../modules/types.md#middlewarehandler)\<`G`\> |

#### Returns

[`Middleware`](middleware.Middleware.md)\<`G`\>

#### Defined in

[src/middleware.ts:9](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/middleware.ts#L9)

## Properties

### of

• `Optional` **of**: [`Apertum`](applications.Apertum.md)\<`G`\>

#### Defined in

[src/middleware.ts:5](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/middleware.ts#L5)

___

### name

• `Optional` **name**: `string`

#### Defined in

[src/middleware.ts:6](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/middleware.ts#L6)

___

### handle

• **handle**: [`MiddlewareHandler`](../modules/types.md#middlewarehandler)\<`G`\>

#### Defined in

[src/middleware.ts:7](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/middleware.ts#L7)
