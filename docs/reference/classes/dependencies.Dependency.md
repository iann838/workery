[Apertum](../README.md) / [dependencies](../modules/dependencies.md) / Dependency

# Class: Dependency\<R, Ps, G\>

[dependencies](../modules/dependencies.md).Dependency

## Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |
| `G` | {} |

## Table of contents

### Constructors

- [constructor](dependencies.Dependency.md#constructor)

### Properties

- [of](dependencies.Dependency.md#of)
- [name](dependencies.Dependency.md#name)
- [parameters](dependencies.Dependency.md#parameters)
- [handle](dependencies.Dependency.md#handle)

## Constructors

### constructor

• **new Dependency**\<`R`, `Ps`, `G`\>(`init`): [`Dependency`](dependencies.Dependency.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |
| `G` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `init` | `Object` |
| `init.of?` | [`Apertum`](applications.Apertum.md)\<`G`\> |
| `init.name?` | `string` |
| `init.parameters` | `Ps` |
| `init.handle` | [`DependencyHandler`](../modules/types.md#dependencyhandler)\<`R`, `Ps`, `G`\> |

#### Returns

[`Dependency`](dependencies.Dependency.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/dependencies.ts:10](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/dependencies.ts#L10)

## Properties

### of

• `Optional` **of**: [`Apertum`](applications.Apertum.md)\<`G`\>

#### Defined in

[src/dependencies.ts:5](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/dependencies.ts#L5)

___

### name

• `Optional` **name**: `string`

#### Defined in

[src/dependencies.ts:6](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/dependencies.ts#L6)

___

### parameters

• **parameters**: `Ps`

#### Defined in

[src/dependencies.ts:7](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/dependencies.ts#L7)

___

### handle

• **handle**: [`DependencyHandler`](../modules/types.md#dependencyhandler)\<`R`, `Ps`, `G`\>

#### Defined in

[src/dependencies.ts:8](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/dependencies.ts#L8)
