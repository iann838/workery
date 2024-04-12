[Apertum](../README.md) / [types](../modules/types.md) / RouteParameter

# Interface: RouteParameter\<S\>

[types](../modules/types.md).RouteParameter

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `z.ZodType` |

## Table of contents

### Properties

- [location](types.RouteParameter.md#location)
- [schema](types.RouteParameter.md#schema)
- [schemaOr](types.RouteParameter.md#schemaor)
- [dependency](types.RouteParameter.md#dependency)
- [options](types.RouteParameter.md#options)

## Properties

### location

• **location**: [`RouteParameterLocation`](../modules/types.md#routeparameterlocation)

#### Defined in

[src/types.ts:45](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L45)

___

### schema

• `Optional` **schema**: `S`

#### Defined in

[src/types.ts:46](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L46)

___

### schemaOr

• `Optional` **schemaOr**: `any`

#### Defined in

[src/types.ts:47](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L47)

___

### dependency

• `Optional` **dependency**: [`Dependency`](../classes/dependencies.Dependency.md)\<`any`, [`RouteParameters`](../modules/types.md#routeparameters), `any`\>

#### Defined in

[src/types.ts:48](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L48)

___

### options

• **options**: [`RouteParameterOptions`](types.RouteParameterOptions.md) & \{ `includeInSchema`: `boolean`  }

#### Defined in

[src/types.ts:49](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L49)
