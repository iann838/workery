import { z } from "zod"
import { Dependency } from "./dependencies"
import { Query } from "./parameters"
import { createResolveLater } from "./helpers"

describe("class Dependency", () => {
    test("[constructor]: mutation", () => {
        const dependency = new Dependency({
            name: "undefinedDependency",
            parameters: {},
            handle: () => undefined,
        })
        expect(dependency.name).toBe("undefinedDependency")
    })

    test("[method] handle: return value simple", () => {
        const dependency = new Dependency({
            name: "sampleDependency",
            parameters: {
                key: Query(z.number()),
            },
            handle: ({ key }) => key,
        })
        expect(dependency.name).toBe("sampleDependency")
        expect(
            dependency.handle(
                {
                    req: new Request("https://page.com/path"),
                    key: 2,
                },
                () => undefined
            )
        ).toBe(2)
    })

    test("[method] handle: return value later", async () => {
        let flag = false
        const [resolve, later] = createResolveLater()
        const dependency = new Dependency({
            name: "thenDependency",
            parameters: {
                key: Query(z.number()),
            },
            handle: async ({ key }, later) => {
                later(() => (flag = true))
                return key
            },
        })
        expect(dependency.name).toBe("thenDependency")
        expect(
            await dependency.handle(
                {
                    req: new Request("https://page.com/path"),
                    key: 2,
                },
                later
            )
        ).toBe(2)
        expect(flag).toBe(false)
        resolve(new Response(""))
        await new Promise((r) => setTimeout(r, 10))
        expect(flag).toBe(true)
    })
})
