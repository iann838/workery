import type { ExecutionContext } from "@cloudflare/workers-types"
import { z } from "zod"
import { Dependency } from "../src/dependencies"
import { createResolveLater, jsonCoerce } from "../src/helpers"
import { Body, Cookie, Depends, Header, Path, Query, parseArgs, Responds } from "../src/parameters"

const cfargs = {
    env: undefined,
    ctx: undefined as unknown as ExecutionContext,
}

const nullLater = () =>
    void describe("function Path", () => {
        test("[invocation]: return value", () => {
            const schema = z.number()
            const routeParam = Path(schema)
            expect(routeParam.location).toBe("path")
            expect(routeParam.schema).toBe(schema)
            expect(routeParam.options.preprocessor).toBe(jsonCoerce)
        })
    })

describe("function Query", () => {
    test("[invocation]: return value", () => {
        const schema = z.boolean()
        const routeParam = Query(schema)
        expect(routeParam.location).toBe("query")
        expect(routeParam.schema).toBe(schema)
        expect(routeParam.options.preprocessor).toBe(jsonCoerce)
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
            handle: ({ key }) => key,
        })
        const routeParam = Depends(dependency)
        expect(routeParam.location).toBe("$depends")
        expect(routeParam.dependency).toBe(dependency)
    })
})

describe("function parseArgs", () => {
    test("[invocation]: return value success empty", async () => {
        const parseInfo1 = await parseArgs(
            {},
            {
                baseArgs: { req: new Request("http://a.co/notimportant"), ...cfargs },
                later: nullLater,
            }
        )
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        headers: { "P-Header": "htext" },
                        body: JSON.stringify({ key: "mykey", value: 12 }),
                    }),
                    ...cfargs,
                },
                later: nullLater,
                rawParameters: {
                    params: { pPath: "23", pPathEnum: "blue" },
                    queries: {
                        pQuery: ["true"],
                        pQueryNenum: ["200"],
                        pQueryArr: ["5", "9"],
                        pQueryArrNenum: ["200", "500"],
                    },
                    cookies: { pAltCookie: "ctext" },
                },
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: JSON.stringify({ key: "mykey", value: 12 }),
                    }),
                    ...cfargs,
                },
                later: nullLater,
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: "mysampletext",
                    }),
                    ...cfargs,
                },
                later: nullLater,
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: "mysampletext",
                    }),
                    ...cfargs,
                },
                later: nullLater,
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: "mysampletext",
                    }),
                    ...cfargs,
                },
                later: nullLater,
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: JSON.stringify({ key: "mykey", value: 12 }),
                        headers: { "P-Header": "htext" },
                    }),
                    ...cfargs,
                },
                later: nullLater,
                rawParameters: {
                    params: { pPath: "23" },
                },
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: JSON.stringify({ key: "mykey", value: 12 }),
                        headers: { "P-Header": "htext" },
                    }),
                    ...cfargs,
                },
                later: nullLater,
                rawParameters: {
                    params: { pPath: "23" },
                },
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
            handle: ({ p_Header, pCookie }) => p_Header + pCookie,
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        headers: { "P-Header": "htext" },
                        body: JSON.stringify({ key: "mykey", value: 12 }),
                    }),
                    ...cfargs,
                },
                later: nullLater,
                rawParameters: {
                    params: { pPath: "23" },
                    queries: { pQuery: ["true"], pQueryArr: ["5", "9"] },
                    cookies: { pAltCookie: "ctext" },
                },
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

    test("[invocation]: return value success async depended", async () => {
        const dependency1 = new Dependency({
            parameters: {
                p_Header: Header(z.string()),
                pCookie: Cookie(z.string(), { altName: "pAltCookie" }),
            },
            handle: async ({ p_Header, pCookie }) => p_Header + pCookie,
        })
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pDepend: Depends(dependency1),
            },
            {
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        headers: { "P-Header": "htext" },
                    }),
                    ...cfargs,
                },
                later: nullLater,
                rawParameters: {
                    params: { pPath: "23" },
                    cookies: { pAltCookie: "ctext" },
                },
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pPath: 23,
            pDepend: "htextctext",
        })
        expect(parseInfo1.success).toBe(true)
    })

    test("[invocation]: return value success depended later", async () => {
        let flag = false
        const [resolve, later] = createResolveLater()
        const dependency1 = new Dependency({
            parameters: {
                p_Header: Header(z.string()),
                pCookie: Cookie(z.string(), { altName: "pAltCookie" }),
            },
            handle: async ({ p_Header, pCookie }, later) => {
                later(() => (flag = true))
                return p_Header + pCookie
            },
        })
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pDepend: Depends(dependency1),
            },
            {
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        headers: { "P-Header": "htext" },
                    }),
                    ...cfargs,
                },
                later: later,
                rawParameters: {
                    params: { pPath: "23" },
                    cookies: { pAltCookie: "ctext" },
                },
            }
        )
        expect(parseInfo1.errors).toStrictEqual([])
        expect(parseInfo1.args).toStrictEqual({
            pPath: 23,
            pDepend: "htextctext",
        })
        expect(parseInfo1.success).toBe(true)

        expect(flag).toBe(false)
        resolve(new Response(""))
        await new Promise((r) => setTimeout(r, 10))
        expect(flag).toBe(true)
    })

    test("[invocation]: return value fail flat", async () => {
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pBody: Body(z.object({ key: z.string(), value: z.number() })),
            },
            {
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: JSON.stringify({ key: "mykey", value: "12" }),
                    }),
                    ...cfargs,
                },
                later: nullLater,
                rawParameters: {
                    params: { pPath: "23" },
                },
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: JSON.stringify({ key: "mykey", value: "12" }),
                    }),
                    ...cfargs,
                },
                rawParameters: {
                    params: { pPath: "abc" },
                },
                later: nullLater,
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
            handle: ({ p_Header, pCookie }) => p_Header + pCookie,
        })
        const parseInfo1 = await parseArgs(
            {
                pPath: Path(z.number()),
                pBody: Body(z.object({ key: z.string(), value: z.number() })),
                pDepend: Depends(dependency1),
            },
            {
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: JSON.stringify({ key: "mykey", value: 12 }),
                        headers: { "P-Header": "htext" },
                    }),
                    ...cfargs,
                },
                rawParameters: {
                    params: { pPath: "23" },
                    cookies: { pAltCookie: "ctext" },
                },
                later: nullLater,
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
                baseArgs: {
                    req: new Request("http://a.co/notimportant", {
                        method: "POST",
                        body: JSON.stringify({ key: "mykey", value: 12 }),
                        headers: { "P-Header": "htext" },
                    }),
                    ...cfargs,
                },
                rawParameters: {
                    params: { pPath: "23" },
                },
                later: nullLater,
            }
        )
        expect(parseInfo1.errors.length).toBe(1)
        expect(parseInfo1.success).toBe(false)
    })
})

describe("function Responds", () => {
    test("[invocation]: return value simple", () => {
        expect(Responds(z.object({})).content).toBeTruthy()
        expect(Responds(ReadableStream).content).toBeTruthy()
        expect(Responds(Blob).content).toBeTruthy()
        expect(Responds(String).content).toBeTruthy()
    })
})
