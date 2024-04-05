import { JSONResponse } from "./responses"
import { CORSMiddleware, CompressMiddleware, Middleware } from "./middleware"
import type { Next } from "./types"

describe("class Middleware", () => {
    test("[constructor]: mutation", () => {
        const handler = async ({}, next: Next) => {
            return await next()
        }
        const middleware = new Middleware({
            name: "mymiddleware",
            handler: handler,
        })
        expect(middleware.name).toBe("mymiddleware")
        expect(middleware.handler).toBe(handler)
    })
})

describe("function CORSMiddleware", () => {
    test("[invocation]: return value", () => {
        const middleware = CORSMiddleware({
            origin: ["http://127.0.0.1", "https://page.com"],
        })
        expect(middleware.name).toBe("CORSMiddleware")
    })

    const middleware = CORSMiddleware({
        origin: ["http://127.0.0.1:8000", "https://page.com"],
    })
    const next = async () => new Response("sample")

    test("[invocation]: handler return value success", async () => {
        const response1 = await middleware.handler(
            {
                req: new Request("http://127.0.0.1:8000/path", {
                    headers: { Origin: "http://127.0.0.1:8000" },
                }),
            },
            next
        )
        expect(response1.status).toBe(200)
        expect(response1.headers.get("Access-Control-Allow-Origin")).toBe("http://127.0.0.1:8000")

        const response4 = await middleware.handler(
            {
                req: new Request("https://page.com/path", {
                    headers: { Origin: "https://page.com" },
                }),
            },
            next
        )
        expect(response4.status).toBe(200)
        expect(response4.headers.get("Access-Control-Allow-Origin")).toBe("https://page.com")

        const response5 = await middleware.handler(
            {
                req: new Request("https://page.com/path", {
                    method: "OPTIONS",
                    headers: { Origin: "https://page.com" },
                }),
            },
            next
        )
        expect(response5.status).toBe(204)
        expect(response5.headers.get("Access-Control-Allow-Origin")).toBe("https://page.com")
    })

    test("[invocation]: handler return value fail", async () => {
        const response2 = await middleware.handler(
            {
                req: new Request("http://127.0.0.1:8800/path", {
                    headers: { Origin: "http://127.0.0.1:8800" },
                }),
            },
            next
        )
        expect(response2.status).toBe(200)
        expect(response2.headers.get("Access-Control-Allow-Origin")).not.toBe(
            "http://127.0.0.1:8800"
        )

        const response3 = await middleware.handler(
            {
                req: new Request("https://google.com/path", {
                    headers: { Origin: "https://google.com" },
                }),
            },
            next
        )
        expect(response3.status).toBe(200)
        expect(response3.headers.get("Access-Control-Allow-Origin")).not.toBe("https://google.com")

        const response6 = await middleware.handler(
            {
                req: new Request("https://google.com/path", {
                    method: "OPTIONS",
                    headers: { Origin: "https://google.com" },
                }),
            },
            next
        )
        expect(response6.status).toBe(204)
        expect(response6.headers.get("Access-Control-Allow-Origin")).not.toBe("https://google.com")
    })
})

describe("function CompressMiddleware", () => {
    test("[invocation]: return value", () => {
        const middleware = CompressMiddleware("gzip")
        expect(middleware.name).toBe("CompressMiddleware")
    })

    test("[invocation]: handler return value", async () => {
        const middleware = CompressMiddleware("gzip")
        const data = { data: [1, 23] }
        const next = async () => new JSONResponse(data)
        const response1 = await middleware.handler(
            { req: new Request("https://page.com/path") },
            next
        )
        const response2 = await middleware.handler(
            {
                req: new Request("https://page.com/path", {
                    headers: { "Accept-Encoding": "gzip" },
                }),
            },
            next
        )
        expect(response1.headers.get("Content-Encoding")).toBe(null)
        expect(await response1.json()).toEqual(data)
        const stream = new DecompressionStream("gzip")
        expect(response2.headers.get("Content-Encoding")).toBe("gzip")
        expect(await new Response(response2.body?.pipeThrough(stream)).json()).toEqual(data)
    })
})
