import { Route, RouteNode, RouteMatcher, fixPathSlashes, searchParamsToQueries, generateRouteSummary } from "../src/routing"

const nullHandler = async () => null

describe("function fixPathSlashes", () => {
    test("[invocation]: return value", () => {
        expect(fixPathSlashes("path/to/route")).toBe("/path/to/route")
        expect(fixPathSlashes("/path/to/route/")).toBe("/path/to/route")
        expect(fixPathSlashes("path/to/route/")).toBe("/path/to/route")
    })
    test("[invocation]: return value edge cases", () => {
        expect(fixPathSlashes("")).toBe("/")
        expect(fixPathSlashes("/")).toBe("/")
        expect(fixPathSlashes("//path/to/route/")).toBe("/path/to/route")
    })
})

describe("function generateRouteSummary", () => {
    test("[invocation]: return value", () => {
        expect(generateRouteSummary("GET", "path/to/route")).toBe("Read Path To Route")
        expect(generateRouteSummary("POST", "/path/to/route/")).toBe("Create Path To Route")
        expect(generateRouteSummary("PUT", "path/to/route/")).toBe("Update Path To Route")
        expect(generateRouteSummary("PUT", "path/to/route/{id}")).toBe("Update Path To Route")
        expect(generateRouteSummary("PATCH", "//route/")).toBe("Modify Route")
        expect(generateRouteSummary("DELETE", "")).toBe("Delete")
    })
})

describe("class Route", () => {
    test("[constructor]: mutation", () => {
        const route = new Route({
            method: "GET",
            path: "path/to/route",
            parameters: {},
            handle: nullHandler,
        })
        expect(route.path).toBe("/path/to/route")
        expect(route.handle).toBe(nullHandler)
        expect(route.parameters).toStrictEqual({})
    })
})

describe("class RouteNode", () => {
    test("[method] touch: mutation and return value", () => {
        const routeNode = new RouteNode("")
        expect(routeNode.touch("new")).toBeInstanceOf(RouteNode)
    })

    test("[method] match: mutation and return value", () => {
        const routeNode = new RouteNode("")
        routeNode.touch("new").touch("{}").touch("new2")
        expect(routeNode.match("new")).toBeInstanceOf(RouteNode)
        expect(routeNode.match("idk")).toBeUndefined()
        expect(routeNode.match("new")!.match("123")).toBeInstanceOf(RouteNode)
        expect(routeNode.match("new")!.match("dfg45")).toBeInstanceOf(RouteNode)
        expect(routeNode.match("new")!.match("dfg45")!.match("new2")).toBeInstanceOf(RouteNode)
        expect(routeNode.match("new")!.match("dfg45")!.match("new3")).toBeUndefined()
    })
})

describe("function searchParamsToQueries", () => {
    test("[invocation]: return value", () => {
        const searchParams = new URL(
            "https://google.com/path?name=myName&values=2&text=aText&values=10"
        ).searchParams
        expect(searchParamsToQueries(searchParams)).toStrictEqual({
            name: ["myName"],
            values: ["2", "10"],
            text: ["aText"],
        })
    })
})

describe("class RouteMatcher", () => {
    test("[method] push: mutation 0 params", () => {
        const router = new RouteMatcher()
        const route = new Route({
            method: "GET",
            path: "/path/to/route",
            parameters: {},
            handle: nullHandler,
        })
        router.push(route)
        const [routeOut, params] = router.match("GET", "/path/to/route")
        expect(routeOut).toStrictEqual(route)
        expect(params).toStrictEqual({})
    })

    test("[method] push: mutation 2 params", () => {
        const router = new RouteMatcher()
        const route = new Route({
            method: "GET",
            path: "/path/{to}/route/{target}",
            parameters: {},
            handle: nullHandler,
        })
        router.push(route)
        const [routeOut, params] = router.match("GET", "/path/123/route/abc")
        expect(routeOut).toStrictEqual(route)
        expect(params).toStrictEqual({ to: "123", target: "abc" })
    })

    const router = new RouteMatcher()
    const route1 = new Route({
        method: "GET",
        path: "/path/to/route",
        parameters: {},
        handle: nullHandler,
    })
    const route2 = new Route({
        method: "GET",
        path: "/path/{to}/route/{target}",
        parameters: {},
        handle: nullHandler,
    })
    const route3 = new Route({
        method: "POST",
        path: "/path/{to}/route/{target}",
        parameters: {},
        handle: nullHandler,
    })
    const route4 = new Route({
        method: "GET",
        path: "/another/to/route",
        parameters: {},
        handle: nullHandler,
    })
    const route5 = new Route({
        method: "GET",
        path: "/path/{to}/route/{target}/action",
        parameters: {},
        handle: nullHandler,
    })
    const route6 = new Route({
        method: "PUT",
        path: "/path/{to}/route/{target}/action",
        parameters: {},
        handle: nullHandler,
    })
    router.push(route1)
    router.push(route2)
    router.push(route3)
    router.push(route4)
    router.push(route5)
    router.push(route6)

    test("[method] match: return value 0 params", () => {
        const [routeOut1, paramsOut1] = router.match("GET", "/path/to/route")
        expect(routeOut1).toBe(route1)
        expect(paramsOut1).toStrictEqual({})
        const [routeOut4, paramsOut4] = router.match("GET", "/another/to/route")
        expect(routeOut4).toBe(route4)
        expect(paramsOut4).toStrictEqual({})
    })

    test("[method] match: return value >0 params", () => {
        const [routeOut2, paramsOut2] = router.match("GET", "/path/a/route/b")
        const [routeOut3, paramsOut3] = router.match("POST", "/path/ab/route/123")
        const [routeOut5, paramsOut5] = router.match("GET", "/path/12/route/abc/action")
        const [routeOut6, paramsOut6] = router.match("PUT", "/path/12/route/abc/action")
        expect(routeOut2).toBe(route2)
        expect(paramsOut2).toStrictEqual({ to: "a", target: "b" })
        expect(routeOut3).toBe(route3)
        expect(paramsOut3).toStrictEqual({ to: "ab", target: "123" })
        expect(routeOut5).toBe(route5)
        expect(paramsOut5).toStrictEqual({ to: "12", target: "abc" })
        expect(routeOut6).toBe(route6)
        expect(paramsOut6).toStrictEqual({ to: "12", target: "abc" })
    })

    test("[method] match: return value not found", () => {
        const [routeOut7] = router.match("GET", "/pat/12/route/abc/action")
        const [routeOut8] = router.match("GET", "/path/to")
        const [routeOut9] = router.match("GET", "/path/12/route")
        expect(routeOut7).toBeUndefined()
        expect(routeOut8).toBeUndefined()
        expect(routeOut9).toBeUndefined()
    })

    test("[method] match: return value method not allowed", () => {
        const [routeOut1] = router.match("POST", "/path/to/route")
        const [routeOut3] = router.match("DELETE", "/path/ab/route/123")
        expect(routeOut1).toBeNull()
        expect(routeOut3).toBeNull()
    })
})
