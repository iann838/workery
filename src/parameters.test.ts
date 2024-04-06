import { z } from "zod"
import {
    Body,
    Cookie,
    Depends,
    Header,
    JSONCoerce,
    Path,
    Query,
    isJSONCoercible,
    parseArgs,
} from "./parameters"
import { Dependency } from "./dependencies"

describe("function JSONCoerce", () => {
    test("[invocation]: return value", () => {
        expect(JSONCoerce<number>("12")).toBe(12)
        expect(JSONCoerce<boolean>("true")).toBe(true)
        expect(JSONCoerce<boolean>("false")).toBe(false)
        expect(JSONCoerce<string>("text")).toBe("text")
        expect(JSONCoerce<number[]>(["1", "23"])).toStrictEqual([1, 23])
        expect(JSONCoerce<boolean[]>(["true", "false"])).toStrictEqual([true, false])
        expect(JSONCoerce<string[]>(["something", "else"])).toStrictEqual(["something", "else"])
    })
})

describe("function isJSONCoercible", () => {
    test("[invocation]: return value zod number", () => {
        expect(isJSONCoercible(z.number())).toBe(true)
        expect(isJSONCoercible(z.number().max(256))).toBe(true)
        expect(isJSONCoercible(z.number().optional())).toBe(true)
        expect(isJSONCoercible(z.number().default(1))).toBe(true)
        expect(isJSONCoercible(z.number().array())).toBe(true)
    })

    test("[invocation]: return value zod boolean", () => {
        expect(isJSONCoercible(z.boolean())).toBe(true)
        expect(isJSONCoercible(z.boolean().optional())).toBe(true)
        expect(isJSONCoercible(z.boolean().default(true))).toBe(true)
        expect(isJSONCoercible(z.boolean().array())).toBe(true)
    })

    test("[invocation]: return value zod enum", () => {
        expect(isJSONCoercible(z.enum(["a", "b"]))).toBe(false)
        expect(isJSONCoercible(z.enum(["a", "b"]).optional())).toBe(false)
        expect(isJSONCoercible(z.enum(["a", "b"]).default("a"))).toBe(false)
        expect(isJSONCoercible(z.enum(["a", "b"]).array())).toBe(false)
    })

    test("[invocation]: return value zod native enum", () => {
        expect(isJSONCoercible(z.nativeEnum({ a: 1, b: 2 }))).toBe(true)
        expect(isJSONCoercible(z.nativeEnum({ a: 1, b: 2 }).optional())).toBe(true)
        expect(isJSONCoercible(z.nativeEnum({ a: 1, b: 2 }).default(1))).toBe(true)
        expect(isJSONCoercible(z.nativeEnum({ a: 1, b: 2 }).array())).toBe(true)
        expect(isJSONCoercible(z.nativeEnum({ a: "1", b: 2 }))).toBe(true)
        expect(isJSONCoercible(z.nativeEnum({ a: "1", b: 2 }).optional())).toBe(true)
        expect(isJSONCoercible(z.nativeEnum({ a: "1", b: 2 }).default("1"))).toBe(true)
        expect(isJSONCoercible(z.nativeEnum({ a: "1", b: 2 }).array())).toBe(true)
        expect(isJSONCoercible(z.nativeEnum({ a: "1", b: "2" }))).toBe(false)
        expect(isJSONCoercible(z.nativeEnum({ a: "1", b: "2" }).optional())).toBe(false)
        expect(isJSONCoercible(z.nativeEnum({ a: "1", b: "2" }).array())).toBe(false)
    })

    test("[invocation]: return value not coercible", () => {
        expect(isJSONCoercible(z.string())).toBe(false)
        expect(isJSONCoercible(z.string().array())).toBe(false)
        expect(isJSONCoercible(z.bigint().array())).toBe(false)
        expect(isJSONCoercible(z.object({}))).toBe(false)
    })
})

describe("function Path", () => {
    test("[invocation]: return value", () => {
        const schema = z.number()
        const routeParam = Path(schema)
        expect(routeParam.location).toBe("path")
        expect(routeParam.schema).toBe(schema)
        expect(routeParam.options.preprocessor).toBe(JSONCoerce)
    })
})

describe("function Query", () => {
    test("[invocation]: return value", () => {
        const schema = z.boolean()
        const routeParam = Query(schema)
        expect(routeParam.location).toBe("query")
        expect(routeParam.schema).toBe(schema)
        expect(routeParam.options.preprocessor).toBe(JSONCoerce)
    })
})

describe("function Header", () => {
    test("[invocation]: return value", () => {
        const schema = z.string()
        const routeParam = Header(schema)
        expect(routeParam.location).toBe("header")
        expect(routeParam.schema).toBe(schema)
    })
})

describe("function Cookie", () => {
    test("[invocation]: return value", () => {
        const schema = z.string()
        const routeParam = Cookie(schema)
        expect(routeParam.location).toBe("cookie")
        expect(routeParam.schema).toBe(schema)
    })
})

describe("function Body", () => {
    test("[invocation]: return value", () => {
        const schema = z.object({
            id: z.number(),
            name: z.string(),
        })
        const routeParam = Body(schema)
        expect(routeParam.location).toBe("body")
        expect(routeParam.schema).toBe(schema)
    })
})

describe("function Depends", () => {
    test("[invocation]: return value", () => {
        const dependency = new Dependency({
            parameters: {
                key: Query(z.string()),
            },
            handler: ({ key }) => key,
        })
        const routeParam = Depends(dependency)
        expect(routeParam.location).toBe("$depends")
        expect(routeParam.dependency).toBe(dependency)
    })
})

describe("function parseArgs", () => {
    test("[invocation]: return value success empty", async () => {
        const parseInfo1 = await parseArgs({}, { req: new Request("http://a.co/notimportant") })
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({})
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success flat", async () => {
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pPathEnum: Path(z.enum(["yellow", "green", "blue"])),
                pQuery: Query(z.boolean()),
                pQueryNenum: Query(z.nativeEnum({ ok: 200, bad: 400, error: 500 })),
                pQueryArr: Query(z.number().array()),
                pQueryArrNenum: Query(z.nativeEnum({ ok: 200, bad: 400, error: 500 }).array()),
                p_Header: Header(z.string()),
                pCookie: Cookie(z.string(), { altName: "pAltCookie" }),
                pBody: Body(z.object({ key: z.string(), value: z.number() })),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    headers: { "P-Header": "htext" },
                    body: JSON.stringify({ key: "mykey", value: 12 }),
                }),
            },
            {
                params: { pPath: "23", pPathEnum: "blue" },
                queries: {
                    pQuery: ["true"],
                    pQueryNenum: ["200"],
                    pQueryArr: ["5", "9"],
                    pQueryArrNenum: ["200", "500"],
                },
                cookies: { pAltCookie: "ctext" },
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pPath: 23,
            pPathEnum: "blue",
            pQuery: true,
            pQueryNenum: 200,
            pQueryArr: [5, 9],
            pQueryArrNenum: [200, 500],
            p_Header: "htext",
            pCookie: "ctext",
            pBody: { key: "mykey", value: 12 },
        })
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success body json", async () => {
        const parseInfo1 = await parseArgs(
            {
                pBody: Body(z.object({ key: z.string(), value: z.number() })),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: JSON.stringify({ key: "mykey", value: 12 }),
                }),
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pBody: { key: "mykey", value: 12 },
        })
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success body text", async () => {
        const parseInfo1 = await parseArgs(
            {
                pBody: Body(String),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: "mysampletext",
                }),
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pBody: "mysampletext",
        })
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success body blob", async () => {
        const parseInfo1 = await parseArgs(
            {
                pBody: Body(Blob),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: "mysampletext",
                }),
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(await parseInfo1.args.pBody.text()).toBe("mysampletext")
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success body stream", async () => {
        const parseInfo1 = await parseArgs(
            {
                pBody: Body(ReadableStream),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: "mysampletext",
                }),
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args.pBody).toBeInstanceOf(ReadableStream)
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success optional", async () => {
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pQuery: Query(z.boolean().optional()),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: JSON.stringify({ key: "mykey", value: 12 }),
                    headers: { "P-Header": "htext" },
                }),
            },
            {
                params: { pPath: "23" },
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({ pPath: 23, pQuery: undefined })
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success default", async () => {
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pQuery: Query(z.boolean().default(true)),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: JSON.stringify({ key: "mykey", value: 12 }),
                    headers: { "P-Header": "htext" },
                }),
            },
            {
                params: { pPath: "23" },
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({ pPath: 23, pQuery: true })
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success depended", async () => {
        const dependency1 = new Dependency({
            parameters: {
                p_Header: Header(z.string()),
                pCookie: Cookie(z.string(), { altName: "pAltCookie" }),
            },
            handler: ({ p_Header, pCookie }) => p_Header + pCookie,
        })
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pQuery: Query(z.boolean()),
                pQueryArr: Query(z.number().array()),
                pBody: Body(z.object({ key: z.string(), value: z.number() })),
                pDepend: Depends(dependency1),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    headers: { "P-Header": "htext" },
                    body: JSON.stringify({ key: "mykey", value: 12 }),
                }),
            },
            {
                params: { pPath: "23" },
                queries: { pQuery: ["true"], pQueryArr: ["5", "9"] },
                cookies: { pAltCookie: "ctext" },
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pPath: 23,
            pQuery: true,
            pQueryArr: [5, 9],
            pDepend: "htextctext",
            pBody: { key: "mykey", value: 12 },
        })
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value fail flat", async () => {
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pBody: Body(z.object({ key: z.string(), value: z.number() })),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: JSON.stringify({ key: "mykey", value: "12" }),
                }),
            },
            {
                params: { pPath: "23" },
            }
        )
        expect(parseInfo1.errors.length).toBe(1)
        expect(parseInfo1.success).toBe(false)

        const parseInfo2 = await parseArgs(
            {
                pPath: Path(z.number()),
                pBody: Body(z.object({ key: z.string(), value: z.number() })),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: JSON.stringify({ key: "mykey", value: "12" }),
                }),
            },
            {
                params: { pPath: "abc" },
            }
        )
        expect(parseInfo2.errors.length).toBe(2)
        expect(parseInfo2.success).toBe(false)
    })

    test("[invocation]: return value fail depends", async () => {
        const dependency1 = new Dependency({
            parameters: {
                p_Header: Header(z.string().startsWith("notgonnapass")),
                pCookie: Cookie(z.string(), { altName: "pAltCookie" }),
            },
            handler: ({ p_Header, pCookie }) => p_Header + pCookie,
        })
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pBody: Body(z.object({ key: z.string(), value: z.number() })),
                pDepend: Depends(dependency1),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: JSON.stringify({ key: "mykey", value: 12 }),
                    headers: { "P-Header": "htext" },
                }),
            },
            {
                params: { pPath: "23" },
                cookies: { pAltCookie: "ctext" },
            }
        )
        expect(parseInfo1.errors.length).toBe(1)
        expect(parseInfo1.success).toBe(false)
    })

    test("[invocation]: return value fail required", async () => {
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pQuery: Query(z.boolean()),
            },
            {
                req: new Request("http://a.co/notimportant", {
                    method: "POST",
                    body: JSON.stringify({ key: "mykey", value: 12 }),
                    headers: { "P-Header": "htext" },
                }),
            },
            {
                params: { pPath: "23" },
            }
        )
        expect(parseInfo1.errors.length).toBe(1)
        expect(parseInfo1.success).toBe(false)
    })
})
