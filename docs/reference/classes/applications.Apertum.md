[Apertum](../README.md) / [applications](../modules/applications.md) / Apertum

# Class: Apertum\<G\>

[applications](../modules/applications.md).Apertum

## Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

## Table of contents

### Constructors

- [constructor](applications.Apertum.md#constructor)

### Properties

- [basePath](applications.Apertum.md#basepath)
- [title](applications.Apertum.md#title)
- [description](applications.Apertum.md#description)
- [version](applications.Apertum.md#version)
- [tags](applications.Apertum.md#tags)
- [servers](applications.Apertum.md#servers)
- [contact](applications.Apertum.md#contact)
- [license](applications.Apertum.md#license)
- [termsOfService](applications.Apertum.md#termsofservice)
- [openapiUrl](applications.Apertum.md#openapiurl)
- [swaggerUrl](applications.Apertum.md#swaggerurl)
- [redocUrl](applications.Apertum.md#redocurl)
- [middleware](applications.Apertum.md#middleware)
- [defaultResponseClass](applications.Apertum.md#defaultresponseclass)
- [exceptionHandler](applications.Apertum.md#exceptionhandler)
- [router](applications.Apertum.md#router)

### Methods

- [get](applications.Apertum.md#get)
- [post](applications.Apertum.md#post)
- [put](applications.Apertum.md#put)
- [delete](applications.Apertum.md#delete)
- [patch](applications.Apertum.md#patch)
- [head](applications.Apertum.md#head)
- [trace](applications.Apertum.md#trace)
- [options](applications.Apertum.md#options)
- [route](applications.Apertum.md#route)
- [openapi](applications.Apertum.md#openapi)
- [handle](applications.Apertum.md#handle)

## Constructors

### constructor

• **new Apertum**\<`G`\>(`init`): [`Apertum`](applications.Apertum.md)\<`G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `init` | `Object` |
| `init.basePath?` | `string` |
| `init.title?` | `string` |
| `init.description?` | `string` |
| `init.version?` | `string` |
| `init.tags?` | `TagObject`[] |
| `init.servers?` | `ServerObject`[] |
| `init.contact?` | `ContactObject` |
| `init.license?` | `LicenseObject` |
| `init.termsOfService?` | `string` |
| `init.openapiUrl?` | ``null`` \| `string` |
| `init.swaggerUrl?` | ``null`` \| `string` |
| `init.redocUrl?` | ``null`` \| `string` |
| `init.middleware?` | [`Middleware`](middleware.Middleware.md)\<`G`\>[] |
| `init.defaultResponseClass?` | [`ResponseClass`](../modules/types.md#responseclass) |
| `init.exceptionHandler?` | [`ExceptionHandler`](../modules/types.md#exceptionhandler)\<`G`\> |

#### Returns

[`Apertum`](applications.Apertum.md)\<`G`\>

#### Defined in

[src/applications.ts:45](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L45)

## Properties

### basePath

• **basePath**: `string`

#### Defined in

[src/applications.ts:26](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L26)

___

### title

• **title**: `string`

#### Defined in

[src/applications.ts:27](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L27)

___

### description

• **description**: `string`

#### Defined in

[src/applications.ts:28](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L28)

___

### version

• **version**: `string`

#### Defined in

[src/applications.ts:29](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L29)

___

### tags

• **tags**: `TagObject`[]

#### Defined in

[src/applications.ts:30](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L30)

___

### servers

• `Optional` **servers**: `ServerObject`[]

#### Defined in

[src/applications.ts:31](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L31)

___

### contact

• `Optional` **contact**: `ContactObject`

#### Defined in

[src/applications.ts:32](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L32)

___

### license

• `Optional` **license**: `LicenseObject`

#### Defined in

[src/applications.ts:33](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L33)

___

### termsOfService

• `Optional` **termsOfService**: `string`

#### Defined in

[src/applications.ts:34](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L34)

___

### openapiUrl

• **openapiUrl**: ``null`` \| `string`

#### Defined in

[src/applications.ts:35](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L35)

___

### swaggerUrl

• **swaggerUrl**: ``null`` \| `string`

#### Defined in

[src/applications.ts:36](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L36)

___

### redocUrl

• **redocUrl**: ``null`` \| `string`

#### Defined in

[src/applications.ts:37](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L37)

___

### middleware

• **middleware**: [`Middleware`](middleware.Middleware.md)\<`G`\>[]

#### Defined in

[src/applications.ts:38](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L38)

___

### defaultResponseClass

• **defaultResponseClass**: [`ResponseClass`](../modules/types.md#responseclass)

#### Defined in

[src/applications.ts:39](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L39)

___

### exceptionHandler

• **exceptionHandler**: [`ExceptionHandler`](../modules/types.md#exceptionhandler)\<`G`\>

#### Defined in

[src/applications.ts:40](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L40)

___

### router

• **router**: [`Router`](routing.Router.md)\<`G`\>

#### Defined in

[src/applications.ts:42](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L42)

## Methods

### get

▸ **get**\<`R`, `Ps`\>(`path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:110](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L110)

___

### post

▸ **post**\<`R`, `Ps`\>(`path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:116](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L116)

___

### put

▸ **put**\<`R`, `Ps`\>(`path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:122](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L122)

___

### delete

▸ **delete**\<`R`, `Ps`\>(`path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:128](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L128)

___

### patch

▸ **patch**\<`R`, `Ps`\>(`path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:134](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L134)

___

### head

▸ **head**\<`R`, `Ps`\>(`path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:140](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L140)

___

### trace

▸ **trace**\<`R`, `Ps`\>(`path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:146](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L146)

___

### options

▸ **options**\<`R`, `Ps`\>(`path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:152](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L152)

___

### route

▸ **route**\<`R`, `Ps`\>(`method`, `path`, `headlessRoute`): [`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](../modules/types.md#routeparameters) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | [`HTTPMethod`](../modules/types.md#httpmethod) |
| `path` | `string` |
| `headlessRoute` | [`HeadlessRoute`](../modules/types.md#headlessroute)\<`R`, `Ps`, `G`\> |

#### Returns

[`Route`](routing.Route.md)\<`R`, `Ps`, `G`\>

#### Defined in

[src/applications.ts:159](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L159)

___

### openapi

▸ **openapi**(): `OpenAPIObject`

#### Returns

`OpenAPIObject`

#### Defined in

[src/applications.ts:175](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L175)

___

### handle

▸ **handle**(`baseArgs`): `Promise`\<`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseArgs` | [`ArgsOf`](../modules/types.md#argsof)\<{}, `G`\> |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/applications.ts:198](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/applications.ts#L198)
