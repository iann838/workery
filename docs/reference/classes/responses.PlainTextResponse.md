[Apertum](../README.md) / [responses](../modules/responses.md) / PlainTextResponse

# Class: PlainTextResponse

[responses](../modules/responses.md).PlainTextResponse

## Hierarchy

- `Response`

  ↳ **`PlainTextResponse`**

## Table of contents

### Constructors

- [constructor](responses.PlainTextResponse.md#constructor)

### Properties

- [body](responses.PlainTextResponse.md#body)
- [bodyUsed](responses.PlainTextResponse.md#bodyused)
- [headers](responses.PlainTextResponse.md#headers)
- [ok](responses.PlainTextResponse.md#ok)
- [redirected](responses.PlainTextResponse.md#redirected)
- [status](responses.PlainTextResponse.md#status)
- [statusText](responses.PlainTextResponse.md#statustext)
- [type](responses.PlainTextResponse.md#type)
- [url](responses.PlainTextResponse.md#url)

### Methods

- [arrayBuffer](responses.PlainTextResponse.md#arraybuffer)
- [blob](responses.PlainTextResponse.md#blob)
- [formData](responses.PlainTextResponse.md#formdata)
- [json](responses.PlainTextResponse.md#json)
- [text](responses.PlainTextResponse.md#text)
- [clone](responses.PlainTextResponse.md#clone)
- [error](responses.PlainTextResponse.md#error)
- [json](responses.PlainTextResponse.md#json-1)
- [redirect](responses.PlainTextResponse.md#redirect)

## Constructors

### constructor

• **new PlainTextResponse**(`body`, `init?`): [`PlainTextResponse`](responses.PlainTextResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | `any` |
| `init?` | `ResponseInit` |

#### Returns

[`PlainTextResponse`](responses.PlainTextResponse.md)

#### Overrides

Response.constructor

#### Defined in

[src/responses.ts:16](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/responses.ts#L16)

## Properties

### body

• `Readonly` **body**: ``null`` \| `ReadableStream`\<`Uint8Array`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/body)

#### Inherited from

Response.body

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:3151

___

### bodyUsed

• `Readonly` **bodyUsed**: `boolean`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bodyUsed)

#### Inherited from

Response.bodyUsed

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:3153

___

### headers

• `Readonly` **headers**: `Headers`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/headers)

#### Inherited from

Response.headers

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18936

___

### ok

• `Readonly` **ok**: `boolean`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/ok)

#### Inherited from

Response.ok

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18938

___

### redirected

• `Readonly` **redirected**: `boolean`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/redirected)

#### Inherited from

Response.redirected

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18940

___

### status

• `Readonly` **status**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/status)

#### Inherited from

Response.status

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18942

___

### statusText

• `Readonly` **statusText**: `string`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/statusText)

#### Inherited from

Response.statusText

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18944

___

### type

• `Readonly` **type**: `ResponseType`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/type)

#### Inherited from

Response.type

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18946

___

### url

• `Readonly` **url**: `string`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/url)

#### Inherited from

Response.url

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18948

## Methods

### arrayBuffer

▸ **arrayBuffer**(): `Promise`\<`ArrayBuffer`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/arrayBuffer)

#### Returns

`Promise`\<`ArrayBuffer`\>

#### Inherited from

Response.arrayBuffer

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:3155

___

### blob

▸ **blob**(): `Promise`\<`Blob`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/blob)

#### Returns

`Promise`\<`Blob`\>

#### Inherited from

Response.blob

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:3157

___

### formData

▸ **formData**(): `Promise`\<`FormData`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/formData)

#### Returns

`Promise`\<`FormData`\>

#### Inherited from

Response.formData

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:3159

___

### json

▸ **json**(): `Promise`\<`any`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/json)

#### Returns

`Promise`\<`any`\>

#### Inherited from

Response.json

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:3161

___

### text

▸ **text**(): `Promise`\<`string`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/text)

#### Returns

`Promise`\<`string`\>

#### Inherited from

Response.text

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:3163

___

### clone

▸ **clone**(): `Response`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/clone)

#### Returns

`Response`

#### Inherited from

Response.clone

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18950

___

### error

▸ **error**(): `Response`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/error_static)

#### Returns

`Response`

#### Inherited from

Response.error

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18957

___

### json

▸ **json**(`data`, `init?`): `Response`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/json_static)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `init?` | `ResponseInit` |

#### Returns

`Response`

#### Inherited from

Response.json

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18959

___

### redirect

▸ **redirect**(`url`, `status?`): `Response`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/redirect_static)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` \| `URL` |
| `status?` | `number` |

#### Returns

`Response`

#### Inherited from

Response.redirect

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:18961
