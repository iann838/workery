[Apertum](../README.md) / adapters

# Module: adapters

## Table of contents

### Functions

- [adaptCfWorkers](adapters.md#adaptcfworkers)

## Functions

### adaptCfWorkers

▸ **adaptCfWorkers**\<`E`, `C`\>(`app`): `Object`

#### Type parameters

| Name |
| :------ |
| `E` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Apertum`](../classes/applications.Apertum.md)\<\{ `env`: `E` ; `ctx`: `C`  }\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `fetch` | (`req`: `Request`, `env`: `E`, `ctx`: `C`) => `Promise`\<`Response`\> |

#### Defined in

[src/adapters.ts:3](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/adapters.ts#L3)
