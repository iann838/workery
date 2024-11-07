import { renderRedoc, renderSwagger } from "../src/renderers"

describe("function renderSwagger", () => {
    test("[invocation]: return value simple", () => {
        const html1 = renderSwagger("/openapi.json")
        expect(html1.includes("<body>")).toBe(true)
        const html2 = renderSwagger("/openapi.json", {
            title: "My App",
            parameters: {
                deepLinking: false,
            },
        })
        expect(html2.includes("<body>")).toBe(true)
    })
})

describe("function renderRedoc", () => {
    test("[invocation]: return value simple", () => {
        const html1 = renderRedoc("/openapi.json")
        expect(html1.includes("<body>")).toBe(true)
        const html2 = renderRedoc("/openapi.json", {
            title: "My App",
        })
        expect(html2.includes("<body>")).toBe(true)
    })
})
