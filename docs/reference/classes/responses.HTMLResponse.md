[Apertum](../README.md) / [responses](../modules/responses.md) / HTMLResponse

# Class: HTMLResponse

[responses](../modules/responses.md).HTMLResponse

## Hierarchy

- `Response`

  ↳ **`HTMLResponse`**

## Table of contents

### Constructors

- [constructor](responses.HTMLResponse.md#constructor)

### Properties

- [body](responses.HTMLResponse.md#body)
- [bodyUsed](responses.HTMLResponse.md#bodyused)
- [headers](responses.HTMLResponse.md#headers)
- [ok](responses.HTMLResponse.md#ok)
- [redirected](responses.HTMLResponse.md#redirected)
- [status](responses.HTMLResponse.md#status)
- [statusText](responses.HTMLResponse.md#statustext)
- [type](responses.HTMLResponse.md#type)
- [url](responses.HTMLResponse.md#url)

### Methods

- [arrayBuffer](responses.HTMLResponse.md#arraybuffer)
- [blob](responses.HTMLResponse.md#blob)
- [formData](responses.HTMLResponse.md#formdata)
- [json](responses.HTMLResponse.md#json)
- [text](responses.HTMLResponse.md#text)
- [clone](responses.HTMLResponse.md#clone)
- [error](responses.HTMLResponse.md#error)
- [json](responses.HTMLResponse.md#json-1)
- [redirect](responses.HTMLResponse.md#redirect)

## Constructors

### constructor

• **new HTMLResponse**(`body`, `init?`): [`HTMLResponse`](responses.HTMLResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | `any` |
| `init?` | `ResponseInit` |

#### Returns

[`HTMLResponse`](responses.HTMLResponse.md)

#### Overrides

Response.constructor

#### Defined in

[src/responses.ts:9](https://github.com/iann838/apertum/blob/2d4f1f10a6c85611feec3a2d0f352a36d27ef754/src/responses.ts#L9)

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
