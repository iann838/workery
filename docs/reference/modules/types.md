[Apertum](../README.md) / types

# Module: types

## Table of contents

### Interfaces

- [RouteParameterOptions](../interfaces/types.RouteParameterOptions.md)
- [RespondsOptions](../interfaces/types.RespondsOptions.md)
- [RouteParameter](../interfaces/types.RouteParameter.md)
- [ParseArgsError](../interfaces/types.ParseArgsError.md)
- [ParseArgsInfo](../interfaces/types.ParseArgsInfo.md)

### Type Aliases

- [HTTPMethod](types.md#httpmethod)
- [HTTPMethodLower](types.md#httpmethodlower)
- [ResponseClass](types.md#responseclass)
- [Next](types.md#next)
- [Later](types.md#later)
- [Preprocessor](types.md#preprocessor)
- [ZodBodyable](types.md#zodbodyable)
- [RouteParameterLocation](types.md#routeparameterlocation)
- [PathParameter](types.md#pathparameter)
- [QueryParameter](types.md#queryparameter)
- [HeaderParameter](types.md#headerparameter)
- [CookieParameter](types.md#cookieparameter)
- [BodyParameter](types.md#bodyparameter)
- [DependsParameter](types.md#dependsparameter)
- [RouteParameters](types.md#routeparameters)
- [TypeOf](types.md#typeof)
- [ArgsOf](types.md#argsof)
- [InitOf](types.md#initof)
- [ExceptionHandler](types.md#exceptionhandler)
- [RouteHandler](types.md#routehandler)
- [DependencyHandler](types.md#dependencyhandler)
- [MiddlewareHandler](types.md#middlewarehandler)
- [HeadlessRoute](types.md#headlessroute)

## Type Aliases

### HTTPMethod

Ƭ **HTTPMethod**: ``"GET"`` \| ``"POST"`` \| ``"PUT"`` \| ``"PATCH"`` \| ``"DELETE"`` \| ``"HEAD"`` \| ``"OPTIONS"`` \| ``"TRACE"``

#### Defined in

[src/types.ts:6](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L6)

___

### HTTPMethodLower

Ƭ **HTTPMethodLower**: ``"get"`` \| ``"post"`` \| ``"put"`` \| ``"patch"`` \| ``"delete"`` \| ``"head"`` \| ``"options"`` \| ``"trace"``

#### Defined in

[src/types.ts:7](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L7)

___

### ResponseClass

Ƭ **ResponseClass**: (`body`: `any`, `init?`: `ResponseInit`) => `Response`

#### Type declaration

• (`body`, `init?`): `Response`

##### Parameters

| Name | Type |
| :------ | :------ |
| `body` | `any` |
| `init?` | `ResponseInit` |

##### Returns

`Response`

#### Defined in

[src/types.ts:17](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L17)

___

### Next

Ƭ **Next**: () => `Promise`\<`Response`\>

#### Type declaration

▸ (): `Promise`\<`Response`\>

##### Returns

`Promise`\<`Response`\>

#### Defined in

[src/types.ts:19](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L19)

___

### Later

Ƭ **Later**: (`fn`: (`res`: `Response` \| `Error`) => `void`) => `void`

#### Type declaration

▸ (`fn`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`res`: `Response` \| `Error`) => `void` |

##### Returns

`void`

#### Defined in

[src/types.ts:21](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L21)

___

### Preprocessor

Ƭ **Preprocessor**: \<Out, In\>(`value`: `In`) => `Out` \| `In`

#### Type declaration

▸ \<`Out`, `In`\>(`value`): `Out` \| `In`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Out` | `any` |
| `In` | `any` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `In` |

##### Returns

`Out` \| `In`

#### Defined in

[src/types.ts:23](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L23)

___

### ZodBodyable

Ƭ **ZodBodyable**: `z.ZodType` \| typeof `String` \| typeof `Blob` \| typeof `ReadableStream`

#### Defined in

[src/types.ts:40](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L40)

___

### RouteParameterLocation

Ƭ **RouteParameterLocation**: ``"path"`` \| ``"query"`` \| ``"header"`` \| ``"cookie"`` \| ``"body"`` \| ``"$depends"``

#### Defined in

[src/types.ts:42](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L42)

___

### PathParameter

Ƭ **PathParameter**\<`S`\>: [`RouteParameter`](../interfaces/types.RouteParameter.md)\<`S`\> & \{ `location`: ``"path"`` ; `schema`: `S`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `z.ZodType` |

#### Defined in

[src/types.ts:52](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L52)

___

### QueryParameter

Ƭ **QueryParameter**\<`S`\>: [`RouteParameter`](../interfaces/types.RouteParameter.md)\<`S`\> & \{ `location`: ``"query"`` ; `schema`: `S`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `z.ZodType` |

#### Defined in

[src/types.ts:56](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L56)

___

### HeaderParameter

Ƭ **HeaderParameter**\<`S`\>: [`RouteParameter`](../interfaces/types.RouteParameter.md)\<`S`\> & \{ `location`: ``"header"`` ; `schema`: `S`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `z.ZodType` |

#### Defined in

[src/types.ts:60](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L60)

___

### CookieParameter

Ƭ **CookieParameter**\<`S`\>: [`RouteParameter`](../interfaces/types.RouteParameter.md)\<`S`\> & \{ `location`: ``"cookie"`` ; `schema`: `S`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `z.ZodType` |

#### Defined in

[src/types.ts:64](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L64)

___

### BodyParameter

Ƭ **BodyParameter**\<`S`\>: [`RouteParameter`](../interfaces/types.RouteParameter.md)\<`S`\> & \{ `location`: ``"body"`` ; `schema`: `S` ; `options`: \{ `mediaType`: `string`  }  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `z.ZodType` |

#### Defined in

[src/types.ts:68](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L68)

___

### DependsParameter

Ƭ **DependsParameter**\<`S`\>: [`RouteParameter`](../interfaces/types.RouteParameter.md)\<`S`\> & \{ `location`: ``"$depends"`` ; `dependency`: [`Dependency`](../classes/dependencies.Dependency.md)\<`any`, [`RouteParameters`](types.md#routeparameters), `any`\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `z.ZodType` |

#### Defined in

[src/types.ts:73](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L73)

___

### RouteParameters

Ƭ **RouteParameters**: \{ `[k: string]`: [`RouteParameter`](../interfaces/types.RouteParameter.md)\<`z.ZodType`\>;  } & \{ `req?`: `never`  }

#### Defined in

[src/types.ts:78](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L78)

___

### TypeOf

Ƭ **TypeOf**\<`T`\>: `T` extends [`RouteParameter`](../interfaces/types.RouteParameter.md)\<infer S\> ? `z.TypeOf`\<`S`\> : `T` extends `z.ZodType` ? `z.TypeOf`\<`T`\> : `T` extends [`Dependency`](../classes/dependencies.Dependency.md)\<infer R, `any`, `any`\> ? `R` : `unknown`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/types.ts:82](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L82)

___

### ArgsOf

Ƭ **ArgsOf**\<`Ps`, `G`\>: \{ `req`: `Request`  } & `G` & \{ [K in keyof Ps]: TypeOf\<Ps[K]\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ps` | extends [`RouteParameters`](types.md#routeparameters) |
| `G` | {} |

#### Defined in

[src/types.ts:91](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L91)

___

### InitOf

Ƭ **InitOf**\<`C`\>: `C` extends (`init`: infer I) => `InstanceType`\<`C`\> ? `I` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends (...`args`: `any`) => `any` |

#### Defined in

[src/types.ts:95](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L95)

___

### ExceptionHandler

Ƭ **ExceptionHandler**\<`G`\>: (`args`: [`ArgsOf`](types.md#argsof)\<{}, `G`\>, `e`: `any`) => `Promise`\<`Response`\> \| (`args`: [`ArgsOf`](types.md#argsof)\<{}, `G`\>, `e`: `any`) => `Response`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

#### Defined in

[src/types.ts:101](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L101)

___

### RouteHandler

Ƭ **RouteHandler**\<`R`, `Ps`, `G`\>: (`args`: [`ArgsOf`](types.md#argsof)\<`Ps`, `G`\>) => `Promise`\<`R`\> \| (`args`: [`ArgsOf`](types.md#argsof)\<`Ps`, `G`\>) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](types.md#routeparameters) |
| `G` | {} |

#### Defined in

[src/types.ts:105](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L105)

___

### DependencyHandler

Ƭ **DependencyHandler**\<`R`, `Ps`, `G`\>: (`args`: [`ArgsOf`](types.md#argsof)\<`Ps`, `G`\>, `later`: [`Later`](types.md#later)) => `Promise`\<`R`\> \| (`args`: [`ArgsOf`](types.md#argsof)\<`Ps`, `G`\>, `later`: [`Later`](types.md#later)) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](types.md#routeparameters) |
| `G` | {} |

#### Defined in

[src/types.ts:109](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L109)

___

### MiddlewareHandler

Ƭ **MiddlewareHandler**\<`G`\>: (`args`: [`ArgsOf`](types.md#argsof)\<{}, `G`\>, `next`: [`Next`](types.md#next)) => `Promise`\<`Response`\> \| (`args`: [`ArgsOf`](types.md#argsof)\<{}, `G`\>, `next`: [`Next`](types.md#next)) => `Response`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | {} |

#### Defined in

[src/types.ts:113](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L113)

___

### HeadlessRoute

Ƭ **HeadlessRoute**\<`R`, `Ps`, `G`\>: `Omit`\<[`InitOf`](types.md#initof)\<typeof [`Route`](../classes/routing.Route.md)\>, ``"method"`` \| ``"path"``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Ps` | extends [`RouteParameters`](types.md#routeparameters) |
| `G` | `G` |

#### Defined in

[src/types.ts:117](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/types.ts#L117)
