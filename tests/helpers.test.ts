import { z } from "zod"
import { createObjectPartial, createResolveLater, isJsonCoercible, jsonCoerce, Of } from "../src/helpers"

new Of<{}>()

describe("function jsonCoerce", () => {
    test("[invocation]: return value", () => {
        expect(jsonCoerce<number>("12")).toBe(12)
        expect(jsonCoerce<boolean>("true")).toBe(true)
        expect(jsonCoerce<boolean>("false")).toBe(false)
        expect(jsonCoerce<string>("text")).toBe("text")
        expect(jsonCoerce<number[]>(["1", "23"])).toStrictEqual([1, 23])
        expect(jsonCoerce<boolean[]>(["true", "false"])).toStrictEqual([true, false])
        expect(jsonCoerce<string[]>(["something", "else"])).toStrictEqual(["something", "else"])
    })
})

describe("function isJsonCoercible", () => {
    test("[invocation]: return value zod number", () => {
        expect(isJsonCoercible(z.number())).toBe(true)
        expect(isJsonCoercible(z.number().max(256))).toBe(true)
        expect(isJsonCoercible(z.number().optional())).toBe(true)
        expect(isJsonCoercible(z.number().default(1))).toBe(true)
        expect(isJsonCoercible(z.number().array())).toBe(true)
    })

    test("[invocation]: return value zod boolean", () => {
        expect(isJsonCoercible(z.boolean())).toBe(true)
        expect(isJsonCoercible(z.boolean().optional())).toBe(true)
        expect(isJsonCoercible(z.boolean().default(true))).toBe(true)
        expect(isJsonCoercible(z.boolean().array())).toBe(true)
    })

    test("[invocation]: return value zod enum", () => {
        expect(isJsonCoercible(z.enum(["a", "b"]))).toBe(false)
        expect(isJsonCoercible(z.enum(["a", "b"]).optional())).toBe(false)
        expect(isJsonCoercible(z.enum(["a", "b"]).default("a"))).toBe(false)
        expect(isJsonCoercible(z.enum(["a", "b"]).array())).toBe(false)
    })

    test("[invocation]: return value zod native enum", () => {
        expect(isJsonCoercible(z.nativeEnum({ a: 1, b: 2 }))).toBe(true)
        expect(isJsonCoercible(z.nativeEnum({ a: 1, b: 2 }).optional())).toBe(true)
        expect(isJsonCoercible(z.nativeEnum({ a: 1, b: 2 }).default(1))).toBe(true)
        expect(isJsonCoercible(z.nativeEnum({ a: 1, b: 2 }).array())).toBe(true)
        expect(isJsonCoercible(z.nativeEnum({ a: "1", b: 2 }))).toBe(true)
        expect(isJsonCoercible(z.nativeEnum({ a: "1", b: 2 }).optional())).toBe(true)
        expect(isJsonCoercible(z.nativeEnum({ a: "1", b: 2 }).default("1"))).toBe(true)
        expect(isJsonCoercible(z.nativeEnum({ a: "1", b: 2 }).array())).toBe(true)
        expect(isJsonCoercible(z.nativeEnum({ a: "1", b: "2" }))).toBe(false)
        expect(isJsonCoercible(z.nativeEnum({ a: "1", b: "2" }).optional())).toBe(false)
        expect(isJsonCoercible(z.nativeEnum({ a: "1", b: "2" }).array())).toBe(false)
    })

    test("[invocation]: return value not coercible", () => {
        expect(isJsonCoercible(z.string())).toBe(false)
        expect(isJsonCoercible(z.string().array())).toBe(false)
        expect(isJsonCoercible(z.bigint().array())).toBe(false)
        expect(isJsonCoercible(z.object({}))).toBe(false)
    })
})

describe("function createResolveLater", () => {
    test("[invocation]: return value", () => {
        const [resolve, later] = createResolveLater()
        expect(resolve).toBeInstanceOf(Function)
        expect(later).toBeInstanceOf(Function)
    })

    test("[return]: data mutation", async () => {
        const data = { num: 0 }
        const [resolve, later] = createResolveLater()
        expect(data.num).toBe(0)
        later(() => data.num++)
        later(() => data.num++)
        later((res) => {
            expect(res).toBeInstanceOf(Response)
            data.num++
        })
        resolve(new Response(""))
        await new Promise((r) => setTimeout(r, 10))
        expect(data.num).toBe(3)
    })
})

describe("function createObjectPartial", () => {
    test("[invocation]: return value", () => {
        const partial = createObjectPartial({ a: "text", b: 1 })
        expect(partial).toBeInstanceOf(Function)
    })

    test("[return]: data mutation", () => {
        const partial = createObjectPartial({ a: "text", b: 1 })
        const complete = partial({ a: "text2", c: 2 })
        expect(complete).toEqual({ a: "text2", b: 1, c: 2 })
    })
})
