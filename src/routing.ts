import { z } from "zod"
import type { ResponseConfig, RouteConfig, ZodRequestBody } from "@asteasolutions/zod-to-openapi"
import { JSONResponse } from "./responses"
import type {
    BodyParameter,
    HTTPMethod,
    HTTPMethodLower,
    ResponseClass,
    RouteHandler,
    RouteParameters,
    UnboundRoute,
} from "./types"
import { Responds } from "./parameters"

export function fixPathSlashes(path: string) {
    if (path.length == 0 || path == "/") return "/"
    if (path[0] !== "/") path = "/" + path
    if (path.startsWith("//")) path = path.slice(1)
    if (path[path.length - 1] === "/") path = path.slice(0, -1)
    return path
}

export function generateRouteSummary(method: HTTPMethod, path: string): string {
    const methodToAction = {
        GET: "Read",
        POST: "Create",
        PUT: "Update",
        PATCH: "Modify",
        DELETE: "Delete",
        HEAD: "Head",
        OPTIONS: "Check",
        TRACE: "Trace",
    }
    return [
        methodToAction[method],
        ...path
            .split("/")
            .map((s) => s && s[0].toUpperCase() + s.slice(1))
            .filter((s) => s),
    ].join(" ")
}

export class Route<R, Ps extends RouteParameters, E = unknown> {
    method: HTTPMethod
    path: string
    name?: string
    tags: string[]
    summary: string
    description: string
    deprecated: boolean
    responses: Record<number, ResponseConfig>
    statusCode: number
    includeInSchema: boolean
    responseClass: ResponseClass
    parameters: Ps
    handle: RouteHandler<R, Ps, E>

    constructor(init: {
        method: HTTPMethod
        path: string
        name?: string
        tags?: string[]
        summary?: string
        description?: string
        deprecated?: boolean
        responses?: Record<number, ResponseConfig>
        includeInSchema?: boolean
        statusCode?: number
        responseClass?: ResponseClass
        parameters: Ps
        handle: RouteHandler<R, Ps, E>
    }) {
        this.method = init.method
        this.path = fixPathSlashes(init.path)
        this.name = init.name
        this.tags = init.tags ?? []
        this.summary = init.summary ?? generateRouteSummary(this.method, this.path)
        this.description = init.description ?? ""
        this.deprecated = init.deprecated ?? false
        this.responses = init.responses ?? {}
        this.includeInSchema = init.includeInSchema ?? true
        this.statusCode = init.statusCode ?? 200
        this.responseClass = init.responseClass ?? JSONResponse
        this.parameters = init.parameters
        this.handle = init.handle
    }

    openapi(): RouteConfig {
        const flatParameters: RouteParameters = {}
        const flattenParameters = (parameters: RouteParameters) => {
            for (const [name, parameter] of Object.entries(parameters)) {
                if (parameter.location == "$depends")
                    flattenParameters(parameter.dependency!.parameters)
                else flatParameters[name] = parameter
            }
        }
        flattenParameters(this.parameters)

        let bodyParameter: BodyParameter<z.ZodType> | undefined = undefined
        const paramSchemas: Record<string, Record<string, z.ZodType>> = {
            path: {},
            query: {},
            header: {},
            cookie: {},
        }
        for (const [name, parameter] of Object.entries(flatParameters)) {
            if (!parameter.options.includeInSchema) continue
            else if (parameter.location == "body")
                bodyParameter = parameter as BodyParameter<z.ZodType>
            else if (parameter.location == "header")
                paramSchemas[parameter.location][
                    parameter.options.altName ?? name.replace(/_/g, "-")
                ] = parameter.schema!
            else
                paramSchemas[parameter.location][parameter.options.altName ?? name] =
                    parameter.schema!
        }
        let body: ZodRequestBody | undefined = undefined
        if (bodyParameter) {
            if (bodyParameter.schemaOr) {
                body = {
                    description: bodyParameter.options.description,
                    content: {
                        [bodyParameter.options?.mediaType]: {
                            schema:
                                bodyParameter.schemaOr === String
                                    ? { type: "string" }
                                    : { type: "string", format: "binary" },
                        },
                    },
                }
            } else {
                body = {
                    description:
                        bodyParameter.options.description ??
                        bodyParameter.schema?._def.openapi?.metadata?.description,
                    content: {
                        [bodyParameter.options?.mediaType]: {
                            schema: bodyParameter.schema as z.ZodType<unknown>,
                        },
                    },
                }
            }
        }
        return {
            method: this.method.toLowerCase() as HTTPMethodLower,
            path: this.path,
            tags: this.tags,
            summary: this.summary,
            description: this.description,
            deprecated: this.deprecated,
            request: {
                body: body,
                params: z.object(paramSchemas.path),
                query: z.object(paramSchemas.query),
                headers: z.object(paramSchemas.header),
                cookies: z.object(paramSchemas.cookie),
            },
            responses: this.responses,
        }
    }
}

export class RouteNode<E = unknown> {
    private inner: Record<string, RouteNode<E>>
    name: string
    routes: Record<string, Route<any, any, E>>
    paramNames: string[]

    constructor(name: string) {
        this.inner = {}
        this.name = name
        this.routes = {}
        this.paramNames = []
    }

    touch(node: string): RouteNode<E> {
        this.inner[node] ||= new RouteNode(node)
        return this.inner[node]!
    }

    match(node: string): RouteNode<E> | undefined {
        return this.inner[node] ?? this.inner["{}"]
    }
}

export function searchParamsToQueries(searchParams: URLSearchParams): Record<string, string[]> {
    const queries: Record<string, string[]> = {}
    for (const [key, value] of searchParams.entries()) {
        queries[key] ||= []
        queries[key].push(value)
    }
    return queries
}

export class RouteMatcher<E = unknown> {
    routes: Route<any, any, E>[]
    private tree: RouteNode<E>

    constructor() {
        this.routes = []
        this.tree = new RouteNode("")
    }

    *[Symbol.iterator](): IterableIterator<Route<any, any, E>> {
        for (const route of this.routes) {
            yield route
        }
    }

    get length(): number {
        return this.routes.length
    }

    push(...routes: Route<any, any, E>[]): number {
        for (const route of routes) {
            this.routes.push(route)
            const nodes = route.path.split("/").slice(1)
            let tree = this.tree
            const paramNames = []
            for (let [index, node] of nodes.entries()) {
                if (node[0] == "{" && node[node.length - 1] == "}") {
                    paramNames.push(node.slice(1, -1))
                    node = "{}"
                }
                tree = tree.touch(node)
                if (index == nodes.length - 1) {
                    tree.routes[route.method] = route
                    tree.paramNames = paramNames
                }
            }
        }
        return this.length
    }

    match(
        method: string,
        path: string
    ): [Route<any, any, E> | undefined | null, Record<string, string>] {
        const nodes = fixPathSlashes(path).split("/").slice(1)
        const paramValues: string[] = []
        let tree = this.tree
        for (const [index, node] of nodes.entries()) {
            let nextMatcher = tree.match(node)
            if (!nextMatcher) return [undefined, {}]
            tree = nextMatcher
            if (tree.name == "{}") paramValues.push(node)
            if (index == nodes.length - 1) {
                if (!tree.routes[method]) {
                    if (Object.keys(tree.routes).length == 0) return [undefined, {}]
                    return [null, {}]
                }
                const params: Record<string, string> = {}
                for (let i = 0; i < tree.paramNames.length; i++) {
                    params[tree.paramNames[i]] = paramValues[i]
                }
                return [tree.routes[method], params]
            }
        }
        return [undefined, {}]
    }
}

export class Router<E = unknown> {
    tags: string[]
    deprecated: boolean
    includeInSchema: boolean
    responses: Record<number, ResponseConfig>
    defaultResponseClass: ResponseClass
    routeMatcher: RouteMatcher<E>

    constructor(init: {
        tags?: string[]
        deprecated?: boolean
        includeInSchema?: boolean
        responses?: Record<number, ResponseConfig>
        defaultResponseClass?: ResponseClass
    }) {
        this.tags = init.tags ?? []
        this.deprecated = init.deprecated ?? false
        this.includeInSchema = init.includeInSchema ?? true
        this.defaultResponseClass = init.defaultResponseClass ?? JSONResponse
        this.responses = init.responses ?? {
            422: Responds(
                z.object({
                    detail: z.array(
                        z.object({
                            location: z.string(),
                            name: z.string(),
                            issues: z.array(z.any()),
                        })
                    ),
                }),
                { description: "Validation Error", mediaType: "application/json" }
            ),
        }
        this.routeMatcher = new RouteMatcher<E>()
    }

    get<R, Ps extends RouteParameters>(
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("GET", path, unboundRoute)
    }
    post<R, Ps extends RouteParameters>(
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("POST", path, unboundRoute)
    }
    put<R, Ps extends RouteParameters>(
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("PUT", path, unboundRoute)
    }
    delete<R, Ps extends RouteParameters>(
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("DELETE", path, unboundRoute)
    }
    patch<R, Ps extends RouteParameters>(
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("PATCH", path, unboundRoute)
    }
    head<R, Ps extends RouteParameters>(
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("HEAD", path, unboundRoute)
    }
    trace<R, Ps extends RouteParameters>(
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("TRACE", path, unboundRoute)
    }
    options<R, Ps extends RouteParameters>(
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("OPTIONS", path, unboundRoute)
    }

    route<R, Ps extends RouteParameters>(
        method: HTTPMethod,
        path: string,
        unboundRoute: UnboundRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        const route = new Route({
            method: method,
            path: path,
            deprecated: this.deprecated,
            includeInSchema: this.includeInSchema,
            responseClass: this.defaultResponseClass,
            ...unboundRoute,
            tags: [...this.tags, ...(unboundRoute.tags ?? [])],
            responses: {
                ...this.responses,
                ...unboundRoute.responses,
            },
        })
        this.routeMatcher.push(route)
        return route
    }
}
