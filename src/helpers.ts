import { z } from "zod"
import { ArgsOf } from "./types"

export function jsonCoerce<Out = unknown>(value: string): Out | string
export function jsonCoerce<Out = unknown>(value: string[]): Out[] | string[]
export function jsonCoerce<Out = unknown>(
    value: string | string[]
): Out | Out[] | string | string[] {
    try {
        if (value instanceof Array) {
            return value.map((item: string) => JSON.parse(item))
        }
        return JSON.parse(value)
    } catch (e) {
        return value
    }
}

export function isJsonCoercible(schema: z.ZodType): boolean {
    return (
        schema instanceof z.ZodNumber ||
        schema instanceof z.ZodBoolean ||
        (schema instanceof z.ZodArray && isJsonCoercible(schema._def.type)) ||
        (schema instanceof z.ZodOptional && isJsonCoercible(schema._def.innerType)) ||
        (schema instanceof z.ZodDefault && isJsonCoercible(schema._def.innerType)) ||
        (schema instanceof z.ZodNativeEnum &&
            !!Object.values(schema._def.values).find((v) => String(v) !== v))
    )
}

export function createResolveLater<T = Response>(): [
    (res: T) => void,
    (fn: (v: T) => void) => void,
] {
    let resolve!: (res: T) => void
    const promise = new Promise<T>((r) => (resolve = r))
    const later = (fn: (v: T) => void) => {
        promise.then(fn)
        return
    }
    return [resolve, later]
}

export function baseExceptionHandler<E>(_: ArgsOf<{}, E>, e: any) {
    console.error(e)
    return new Response("Internal Server Error", { status: 500 })
}

export function createObjectPartial<T1 extends Record<any, any>>(base: T1) {
    return <T2 extends Record<any, any>>(final: T2): T1 & T2 => ({ ...base, ...final })
}

export class Of<E> {}
