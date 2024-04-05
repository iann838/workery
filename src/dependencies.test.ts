import { z } from "zod"
import { Dependency } from "./dependencies"
import { Query } from "./parameters"

describe("class Dependency", () => {
    test("[constructor]: mutation and handler return value", () => {
        const dependency = new Dependency({
            name: "sampleDependency",
            parameters: {
                key: Query(z.number()),
            },
            handler: ({ key }) => key,
        })
        expect(dependency.name).toBe("sampleDependency")
        expect(
            dependency.handler({
                req: new Request("https://page.com/path"),
                key: 2,
            })
        ).toBe(2)
    })
})
