[Apertum](../README.md) / parameters

# Module: parameters

## Table of contents

### Functions

- [Path](parameters.md#path)
- [Query](parameters.md#query)
- [Header](parameters.md#header)
- [Cookie](parameters.md#cookie)
- [Body](parameters.md#body)
- [Depends](parameters.md#depends)
- [parseArgs](parameters.md#parseargs)
- [Responds](parameters.md#responds)

## Functions

### Path

▸ **Path**(): [`PathParameter`](types.md#pathparameter)\<`z.ZodString`\>

#### Returns

[`PathParameter`](types.md#pathparameter)\<`z.ZodString`\>

#### Defined in

[src/parameters.ts:27](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L27)

▸ **Path**\<`S`\>(`schema`, `options?`): [`PathParameter`](types.md#pathparameter)\<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `S` |
| `options?` | `Omit`\<[`RouteParameterOptions`](../interfaces/types.RouteParameterOptions.md), ``"mediaType"``\> |

#### Returns

[`PathParameter`](types.md#pathparameter)\<`S`\>

#### Defined in

[src/parameters.ts:28](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L28)

___

### Query

▸ **Query**(): [`QueryParameter`](types.md#queryparameter)\<`z.ZodString`\>

#### Returns

[`QueryParameter`](types.md#queryparameter)\<`z.ZodString`\>

#### Defined in

[src/parameters.ts:47](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L47)

▸ **Query**\<`S`\>(`schema`, `options?`): [`QueryParameter`](types.md#queryparameter)\<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `S` |
| `options?` | `Omit`\<[`RouteParameterOptions`](../interfaces/types.RouteParameterOptions.md), ``"mediaType"``\> |

#### Returns

[`QueryParameter`](types.md#queryparameter)\<`S`\>

#### Defined in

[src/parameters.ts:48](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L48)

___

### Header

▸ **Header**(): [`HeaderParameter`](types.md#headerparameter)\<`z.ZodString`\>

#### Returns

[`HeaderParameter`](types.md#headerparameter)\<`z.ZodString`\>

#### Defined in

[src/parameters.ts:67](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L67)

▸ **Header**\<`S`\>(`schema`, `options?`): [`HeaderParameter`](types.md#headerparameter)\<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `S` |
| `options?` | `Omit`\<[`RouteParameterOptions`](../interfaces/types.RouteParameterOptions.md), ``"mediaType"``\> |

#### Returns

[`HeaderParameter`](types.md#headerparameter)\<`S`\>

#### Defined in

[src/parameters.ts:68](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L68)

___

### Cookie

▸ **Cookie**(): [`CookieParameter`](types.md#cookieparameter)\<`z.ZodString`\>

#### Returns

[`CookieParameter`](types.md#cookieparameter)\<`z.ZodString`\>

#### Defined in

[src/parameters.ts:87](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L87)

▸ **Cookie**\<`S`\>(`schema`, `options?`): [`CookieParameter`](types.md#cookieparameter)\<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `S` |
| `options?` | `Omit`\<[`RouteParameterOptions`](../interfaces/types.RouteParameterOptions.md), ``"mediaType"``\> |

#### Returns

[`CookieParameter`](types.md#cookieparameter)\<`S`\>

#### Defined in

[src/parameters.ts:88](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L88)

___

### Body

▸ **Body**(): [`BodyParameter`](types.md#bodyparameter)\<`z.ZodString`\>

#### Returns

[`BodyParameter`](types.md#bodyparameter)\<`z.ZodString`\>

#### Defined in

[src/parameters.ts:107](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L107)

▸ **Body**(`schema`, `options?`): [`BodyParameter`](types.md#bodyparameter)\<`z.ZodString`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `StringConstructor` |
| `options?` | `Omit`\<[`RouteParameterOptions`](../interfaces/types.RouteParameterOptions.md), ``"altName"``\> |

#### Returns

[`BodyParameter`](types.md#bodyparameter)\<`z.ZodString`\>

#### Defined in

[src/parameters.ts:108](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L108)

▸ **Body**(`schema`, `options?`): [`BodyParameter`](types.md#bodyparameter)\<`z.ZodType`\<`Blob`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | (`blobParts?`: `BlobPart`[], `options?`: `BlobPropertyBag`) => `Blob` |
| `schema.prototype` | `Blob` |
| `options?` | `Omit`\<[`RouteParameterOptions`](../interfaces/types.RouteParameterOptions.md), ``"altName"``\> |

#### Returns

[`BodyParameter`](types.md#bodyparameter)\<`z.ZodType`\<`Blob`\>\>

#### Defined in

[src/parameters.ts:112](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L112)

▸ **Body**(`schema`, `options?`): [`BodyParameter`](types.md#bodyparameter)\<`z.ZodType`\<`ReadableStream`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | (`underlyingSource`: `UnderlyingByteSource`, `strategy?`: \{ `highWaterMark?`: `number`  }) => `ReadableStream`\<`Uint8Array`\>\<R\>(`underlyingSource`: `UnderlyingDefaultSource`\<`R`\>, `strategy?`: `QueuingStrategy`\<`R`\>) => `ReadableStream`\<`R`\>\<R\>(`underlyingSource?`: `UnderlyingSource`\<`R`\>, `strategy?`: `QueuingStrategy`\<`R`\>) => `ReadableStream`\<`R`\> |
| `schema.prototype` | `ReadableStream`\<`any`\> |
| `options?` | `Omit`\<[`RouteParameterOptions`](../interfaces/types.RouteParameterOptions.md), ``"altName"``\> |

#### Returns

[`BodyParameter`](types.md#bodyparameter)\<`z.ZodType`\<`ReadableStream`\>\>

#### Defined in

[src/parameters.ts:116](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L116)

▸ **Body**\<`S`\>(`schema`, `options?`): [`BodyParameter`](types.md#bodyparameter)\<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `S` |
| `options?` | `Omit`\<[`RouteParameterOptions`](../interfaces/types.RouteParameterOptions.md), ``"altName"``\> |

#### Returns

[`BodyParameter`](types.md#bodyparameter)\<`S`\>

#### Defined in

[src/parameters.ts:120](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L120)

___

### Depends

▸ **Depends**\<`R`\>(`dependency`): [`DependsParameter`](types.md#dependsparameter)\<`z.ZodType`\<`R`\>\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependency` | [`Dependency`](../classes/dependencies.Dependency.md)\<`R`, `any`, `any`\> |

#### Returns

[`DependsParameter`](types.md#dependsparameter)\<`z.ZodType`\<`R`\>\>

#### Defined in

[src/parameters.ts:140](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L140)

___

### parseArgs

▸ **parseArgs**\<`Ps`, `G`\>(`parameters`, `input`): `Promise`\<[`ParseArgsInfo`](../interfaces/types.ParseArgsInfo.md)\<`Ps`, `G`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ps` | extends [`RouteParameters`](types.md#routeparameters) |
| `G` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Ps` |
| `input` | `Object` |
| `input.baseArgs` | [`ArgsOf`](types.md#argsof)\<{}, `G`\> |
| `input.rawParameters?` | `Object` |
| `input.rawParameters.params?` | `Record`\<`string`, `string`\> |
| `input.rawParameters.queries?` | `Record`\<`string`, `string`[]\> |
| `input.rawParameters.cookies?` | `Record`\<`string`, `string`\> |
| `input.later` | [`Later`](types.md#later) |

#### Returns

`Promise`\<[`ParseArgsInfo`](../interfaces/types.ParseArgsInfo.md)\<`Ps`, `G`\>\>

#### Defined in

[src/parameters.ts:148](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L148)

___

### Responds

▸ **Responds**(): `ResponseConfig`

#### Returns

`ResponseConfig`

#### Defined in

[src/parameters.ts:247](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L247)

▸ **Responds**(`schema`, `options?`): `ResponseConfig`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `StringConstructor` |
| `options?` | [`RespondsOptions`](../interfaces/types.RespondsOptions.md) |

#### Returns

`ResponseConfig`

#### Defined in

[src/parameters.ts:248](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L248)

▸ **Responds**(`schema`, `options?`): `ResponseConfig`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | (`blobParts?`: `BlobPart`[], `options?`: `BlobPropertyBag`) => `Blob` |
| `schema.prototype` | `Blob` |
| `options?` | [`RespondsOptions`](../interfaces/types.RespondsOptions.md) |

#### Returns

`ResponseConfig`

#### Defined in

[src/parameters.ts:249](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L249)

▸ **Responds**(`schema`, `options?`): `ResponseConfig`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | (`underlyingSource`: `UnderlyingByteSource`, `strategy?`: \{ `highWaterMark?`: `number`  }) => `ReadableStream`\<`Uint8Array`\>\<R\>(`underlyingSource`: `UnderlyingDefaultSource`\<`R`\>, `strategy?`: `QueuingStrategy`\<`R`\>) => `ReadableStream`\<`R`\>\<R\>(`underlyingSource?`: `UnderlyingSource`\<`R`\>, `strategy?`: `QueuingStrategy`\<`R`\>) => `ReadableStream`\<`R`\> |
| `schema.prototype` | `ReadableStream`\<`any`\> |
| `options?` | [`RespondsOptions`](../interfaces/types.RespondsOptions.md) |

#### Returns

`ResponseConfig`

#### Defined in

[src/parameters.ts:250](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L250)

▸ **Responds**(`schema`, `options?`): `ResponseConfig`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `ZodType`\<`any`, `ZodTypeDef`, `any`\> |
| `options?` | [`RespondsOptions`](../interfaces/types.RespondsOptions.md) |

#### Returns

`ResponseConfig`

#### Defined in

[src/parameters.ts:251](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/parameters.ts#L251)
