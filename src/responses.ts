import { z } from "zod"
import type { ResponseConfig } from "@asteasolutions/zod-to-openapi"
import { RespondsOptions, ZodBodyable } from "./types"

export class JSONResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(JSON.stringify(body), init)
        this.headers.set("Content-Type", "application/json")
    }
}

export class HTMLResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(String(body), init)
        this.headers.set("Content-Type", "text/html;charset=utf-8")
    }
}

export class PlainTextResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(String(body), init)
        this.headers.set("Content-Type", "text/plain;charset=utf-8")
    }
}

export function Responds(): ResponseConfig
export function Responds(schema: typeof String, options?: RespondsOptions): ResponseConfig
export function Responds(schema: typeof Blob, options?: RespondsOptions): ResponseConfig
export function Responds(schema: typeof ReadableStream, options?: RespondsOptions): ResponseConfig
export function Responds(schema: z.ZodType, options?: RespondsOptions): ResponseConfig
export function Responds(schema: ZodBodyable = String, options?: RespondsOptions): ResponseConfig {
    if (schema instanceof z.ZodType) {
        return {
            description: options?.description ?? schema._def.openapi?.metadata?.description ?? "",
            headers: z.object(options?.headers ?? {}),
            content: {
                [options?.mediaType ?? "application/json"]: {
                    schema: schema,
                },
            },
        }
    }
    return {
        description: options?.description ?? "",
        headers: z.object(options?.headers ?? {}),
        content: {
            [options?.mediaType ?? "application/json"]: {
                schema:
                    schema === String ? { type: "string" } : { type: "string", format: "binary" },
            },
        },
    }
}
