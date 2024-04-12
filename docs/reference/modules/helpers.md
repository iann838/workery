[Apertum](../README.md) / helpers

# Module: helpers

## Table of contents

### Functions

- [jsonCoerce](helpers.md#jsoncoerce)
- [isJsonCoercible](helpers.md#isjsoncoercible)
- [createResolveLater](helpers.md#createresolvelater)
- [baseExceptionHandler](helpers.md#baseexceptionhandler)

## Functions

### jsonCoerce

▸ **jsonCoerce**\<`Out`\>(`value`): `Out` \| `string`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Out` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Out` \| `string`

#### Defined in

[src/helpers.ts:4](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/helpers.ts#L4)

▸ **jsonCoerce**\<`Out`\>(`value`): `Out`[] \| `string`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Out` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`Out`[] \| `string`[]

#### Defined in

[src/helpers.ts:5](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/helpers.ts#L5)

___

### isJsonCoercible

▸ **isJsonCoercible**(`schema`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

#### Returns

`boolean`

#### Defined in

[src/helpers.ts:19](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/helpers.ts#L19)

___

### createResolveLater

▸ **createResolveLater**\<`T`\>(): [(`res`: `T`) => `void`, (`fn`: (`v`: `T`) => `void`) => `void`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Response` \| `Error` |

#### Returns

[(`res`: `T`) => `void`, (`fn`: (`v`: `T`) => `void`) => `void`]

#### Defined in

[src/helpers.ts:31](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/helpers.ts#L31)

___

### baseExceptionHandler

▸ **baseExceptionHandler**\<`G`\>(`_`, `e`): `Response`

#### Type parameters

| Name |
| :------ |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | [`ArgsOf`](types.md#argsof)\<{}, `G`\> |
| `e` | `any` |

#### Returns

`Response`

#### Defined in

[src/helpers.ts:44](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/helpers.ts#L44)
