import { RedocTemplate, SwaggerTemplate } from "./templates"

describe("function SwaggerTemplate", () => {
    test("[invocation]: return value simple", () => {
        const html1 = SwaggerTemplate("/openapi.json")
        expect(html1.includes("<body>")).toBe(true)
        const html2 = SwaggerTemplate("/openapi.json", {
            title: "My App",
            parameters: {
                deepLinking: false,
            },
        })
        expect(html2.includes("<body>")).toBe(true)
    })
})

describe("function RedocTemplate", () => {
    test("[invocation]: return value simple", () => {
        const html1 = RedocTemplate("/openapi.json")
        expect(html1.includes("<body>")).toBe(true)
        const html2 = RedocTemplate("/openapi.json", {
            title: "My App",
        })
        expect(html2.includes("<body>")).toBe(true)
    })
})
