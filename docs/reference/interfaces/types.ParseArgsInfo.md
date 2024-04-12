[Apertum](../README.md) / [types](../modules/types.md) / ParseArgsInfo

# Interface: ParseArgsInfo\<Ps, G\>

[types](../modules/types.md).ParseArgsInfo

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |
| `G` | {} |

## Table of contents

### Properties

- [success](types.ParseArgsInfo.md#success)
- [errors](types.ParseArgsInfo.md#errors)
- [args](types.ParseArgsInfo.md#args)

## Properties

### success

• **success**: `boolean`

#### Defined in

[src/types.ts:129](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L129)

___

### errors

• **errors**: [`ParseArgsError`](types.ParseArgsError.md)[]

#### Defined in

[src/types.ts:130](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L130)

___

### args

• **args**: [`ArgsOf`](../modules/types.md#argsof)\<`Ps`, `G`\>

#### Defined in

[src/types.ts:131](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L131)
