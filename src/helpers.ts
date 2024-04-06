import { z } from "zod"

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
