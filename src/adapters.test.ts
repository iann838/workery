import { adaptCfWorkers } from "./adapters"
import { Apertum } from "./applications"

describe("function adaptCfWorkers", () => {
    test("[invocation]: return value", async () => {
        const app = new Apertum({})
        app.get("/hello", { parameters: {}, handle: () => "world" })
        const exported = adaptCfWorkers(app)
        const res = await exported.fetch(new Request("http://a.co/hello"), undefined, undefined)
        expect(await res.json()).toBe("world")
    })
})
