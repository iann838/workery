[Apertum](../README.md) / [routing](../modules/routing.md) / Route

# Class: Route\<R, Ps, G\>

[routing](../modules/routing.md).Route

## Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |
| `G` | {} |

## Table of contents

### Constructors

- [constructor](routing.Route.md#constructor)

### Properties

- [method](routing.Route.md#method)
- [path](routing.Route.md#path)
- [name](routing.Route.md#name)
- [tags](routing.Route.md#tags)
- [summary](routing.Route.md#summary)
- [description](routing.Route.md#description)
- [deprecated](routing.Route.md#deprecated)
- [servers](routing.Route.md#servers)
- [responses](routing.Route.md#responses)
- [statusCode](routing.Route.md#statuscode)
- [includeInSchema](routing.Route.md#includeinschema)
- [responseClass](routing.Route.md#responseclass)
- [parameters](routing.Route.md#parameters)
- [handle](routing.Route.md#handle)

### Methods

- [openapi](routing.Route.md#openapi)

## Constructors

### constructor

• **new Route**\<`R`, `Ps`, `G`\>(`init`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

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
| `init.method` | [`HTTPMethod`](../modules/types.md#httpmethod) |
| `init.path` | `string` |
| `init.name?` | `string` |
| `init.tags?` | `string`[] |
| `init.summary?` | `string` |
| `init.description?` | `string` |
| `init.deprecated?` | `boolean` |
| `init.servers?` | `ServerObject`[] |
| `init.responses?` | `Record`\<`number`, `ResponseConfig`\> |
| `init.includeInSchema?` | `boolean` |
| `init.statusCode?` | `number` |
| `init.responseClass?` | [`ResponseClass`](../modules/types.md#responseclass) |
| `init.parameters` | `Ps` |
| `init.handle` | [`RouteHandler`](../modules/types.md#routehandler)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/routing.ts:36](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L36)

## Properties

### method

• **method**: [`HTTPMethod`](../modules/types.md#httpmethod)

#### Defined in

[src/routing.ts:21](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L21)

___

### path

• **path**: `string`

#### Defined in

[src/routing.ts:22](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L22)

___

### name

• `Optional` **name**: `string`

#### Defined in

[src/routing.ts:23](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L23)

___

### tags

• **tags**: `string`[]

#### Defined in

[src/routing.ts:24](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L24)

___

### summary

• **summary**: `string`

#### Defined in

[src/routing.ts:25](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L25)

___

### description

• **description**: `string`

#### Defined in

[src/routing.ts:26](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L26)

___

### deprecated

• **deprecated**: `boolean`

#### Defined in

[src/routing.ts:27](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L27)

___

### servers

• `Optional` **servers**: `ServerObject`[]

#### Defined in

[src/routing.ts:28](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L28)

___

### responses

• **responses**: `Record`\<`number`, `ResponseConfig`\>

#### Defined in

[src/routing.ts:29](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L29)

___

### statusCode

• **statusCode**: `number`

#### Defined in

[src/routing.ts:30](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L30)

___

### includeInSchema

• **includeInSchema**: `boolean`

#### Defined in

[src/routing.ts:31](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L31)

___

### responseClass

• **responseClass**: [`ResponseClass`](../modules/types.md#responseclass)

#### Defined in

[src/routing.ts:32](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L32)

___

### parameters

• **parameters**: `Ps`

#### Defined in

[src/routing.ts:33](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L33)

___

### handle

• **handle**: [`RouteHandler`](../modules/types.md#routehandler)\<`R`, `Ps`, `G`\>

#### Defined in

[src/routing.ts:34](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L34)

## Methods

### openapi

▸ **openapi**(): `RouteConfig`

#### Returns

`RouteConfig`

#### Defined in

[src/routing.ts:68](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/routing.ts#L68)
