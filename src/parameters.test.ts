import { z } from "zod"
import {
    Body,
    Cookie,
    Depends,
    Header,
    JSONCoerce,
    Path,
    Query,
    isZodCoercible,
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

describe("function isZodCoercible", () => {
    test("[invocation]: return value zod number", () => {
        expect(isZodCoercible(z.number())).toBe(true)
        expect(isZodCoercible(z.number().max(256))).toBe(true)
        expect(isZodCoercible(z.number().optional())).toBe(true)
        expect(isZodCoercible(z.number().array())).toBe(true)
    })

    test("[invocation]: return value zod boolean", () => {
        expect(isZodCoercible(z.boolean())).toBe(true)
        expect(isZodCoercible(z.boolean().optional())).toBe(true)
        expect(isZodCoercible(z.boolean().array())).toBe(true)
    })

    test("[invocation]: return value not coercible", () => {
        expect(isZodCoercible(z.string())).toBe(false)
        expect(isZodCoercible(z.string().array())).toBe(false)
        expect(isZodCoercible(z.bigint().array())).toBe(false)
        expect(isZodCoercible(z.object({}))).toBe(false)
    })
})

describe("function Path", () => {
    test("[invocation]: return value", () => {
        const schema = z.number()
        const routeParam = Path(schema)
        expect(routeParam.location).toBe("path")
        expect(routeParam.schema).toBe(schema)
    })
})

describe("function Query", () => {
    test("[invocation]: return value", () => {
        const schema = z.boolean()
        const routeParam = Query(schema)
        expect(routeParam.location).toBe("query")
        expect(routeParam.schema).toBe(schema)
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
        expect(routeParam.isCoercible).toBe(false)
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
        expect(routeParam.isCoercible).toBe(false)
    })
})

describe("function parseArgs", () => {
    test("[invocation]: return value success empty", async () => {
        const parseInfo1 = await parseArgs({}, { req: new Request("http://a.co/notimportant") })
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.args).toStrictEqual({})
        expect(parseInfo1.errors).toStrictEqual([])
    })

    test("[invocation]: return value success flat", async () => {
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pQuery: Query(z.boolean()),
                pQueryArr: Query(z.number().array()),
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
                params: { pPath: "23" },
                queries: { pQuery: ["true"], pQueryArr: ["5", "9"] },
                cookies: { pAltCookie: "ctext" },
            }
        )
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pPath: 23,
            pQuery: true,
            pQueryArr: [5, 9],
            p_Header: "htext",
            pCookie: "ctext",
            pBody: { key: "mykey", value: 12 },
        })
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
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pBody: { key: "mykey", value: 12 },
        })
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
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pBody: "mysampletext",
        })
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
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.errors).toStrictEqual([])
        expect(await parseInfo1.args.pBody.text()).toBe("mysampletext")
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
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args.pBody).toBeInstanceOf(ReadableStream)
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
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({ pPath: 23, pQuery: undefined })
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
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({ pPath: 23, pQuery: true })
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
        expect(parseInfo1.success).toBe(true)
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pPath: 23,
            pQuery: true,
            pQueryArr: [5, 9],
            pDepend: "htextctext",
            pBody: { key: "mykey", value: 12 },
        })
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
        expect(parseInfo1.success).toBe(false)
        expect(parseInfo1.errors.length).toBe(1)

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
        expect(parseInfo2.success).toBe(false)
        expect(parseInfo2.errors.length).toBe(2)
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
        expect(parseInfo1.success).toBe(false)
        expect(parseInfo1.errors.length).toBe(1)
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
        expect(parseInfo1.success).toBe(false)
        expect(parseInfo1.errors.length).toBe(1)
    })
})
