import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi"
import cookie from "cookie"
import type {
    ContactObject,
    LicenseObject,
    OpenAPIObject,
    ServerObject,
    TagObject,
} from "openapi3-ts/oas31"
import { Middleware } from "./middleware"
import { parseArgs } from "./parameters"
import { HTMLResponse, JSONResponse } from "./responses"
import { Route, Router, searchParamsToQueries } from "./routing"
import type {
    ArgsOf,
    ExceptionHandler,
    FetchParameters,
    HeadlessRoute,
    HTTPMethod,
    ResponseClass,
    RouteParameters,
} from "./types"
import { SwaggerTemplate, RedocTemplate } from "./templates"

export function defaultExceptionHandler<E>(_: ArgsOf<{}, E>, e: any) {
    console.error(e)
    return new Response("Internal Server Error", { status: 500 })
}

export class Apertum<E = undefined> {
    basePath: string
    title: string
    description: string
    version: string
    tags: TagObject[]
    servers?: ServerObject[]
    contact?: ContactObject
    license?: LicenseObject
    termsOfService?: string
    openapiUrl: string | null
    swaggerUrl: string | null
    redocUrl: string | null
    middleware: Middleware<E>[]
    defaultResponseClass: ResponseClass
    exceptionHandler: ExceptionHandler<E>

    router: Router<E>
    private _openapi?: OpenAPIObject

    constructor(init: {
        basePath?: string
        title?: string
        description?: string
        version?: string
        tags?: TagObject[]
        servers?: ServerObject[]
        contact?: ContactObject
        license?: LicenseObject
        termsOfService?: string
        openapiUrl?: string | null
        swaggerUrl?: string | null
        redocUrl?: string | null
        middleware?: Middleware<E>[]
        defaultResponseClass?: ResponseClass
        exceptionHandler?: ExceptionHandler<E>
    }) {
        this.basePath = init.basePath ?? ""
        this.title = init.title ?? "Untitled"
        this.description = init.description ?? ""
        this.version = init.version ?? "0.1.0"
        this.tags = init.tags ?? []
        this.servers = init.servers ?? [{ url: "/" }]
        this.contact = init.contact
        this.license = init.license
        this.termsOfService = init.termsOfService
        this.openapiUrl = init.openapiUrl === null ? null : init.openapiUrl ?? "/openapi.json"
        this.swaggerUrl = init.swaggerUrl === null ? null : init.swaggerUrl ?? "/docs"
        this.redocUrl = init.redocUrl === null ? null : init.redocUrl ?? "/redoc"
        this.middleware = init.middleware ?? []
        this.defaultResponseClass = init.defaultResponseClass ?? JSONResponse
        this.exceptionHandler = init.exceptionHandler ?? defaultExceptionHandler

        this.router = new Router<E>()

        if (this.openapiUrl) {
            this.get(this.openapiUrl, {
                includeInSchema: false,
                responseClass: JSONResponse,
                parameters: {},
                handler: () => this.openapi(),
            })
            if (this.swaggerUrl)
                this.get(this.swaggerUrl, {
                    includeInSchema: false,
                    responseClass: HTMLResponse,
                    parameters: {},
                    handler: () =>
                        SwaggerTemplate(this.openapiUrl!, {
                            title: this.title,
                        }),
                })
            if (this.redocUrl)
                this.get(this.redocUrl, {
                    includeInSchema: false,
                    responseClass: HTMLResponse,
                    parameters: {},
                    handler: () =>
                        RedocTemplate(this.openapiUrl!, {
                            title: this.title,
                        }),
                })
        }
    }

    get<R, Ps extends RouteParameters<E>>(
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("GET", path, headlessRoute)
    }
    post<R, Ps extends RouteParameters<E>>(
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("POST", path, headlessRoute)
    }
    put<R, Ps extends RouteParameters<E>>(
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("PUT", path, headlessRoute)
    }
    delete<R, Ps extends RouteParameters<E>>(
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("DELETE", path, headlessRoute)
    }
    patch<R, Ps extends RouteParameters<E>>(
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("PATCH", path, headlessRoute)
    }
    head<R, Ps extends RouteParameters<E>>(
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("HEAD", path, headlessRoute)
    }
    trace<R, Ps extends RouteParameters<E>>(
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("TRACE", path, headlessRoute)
    }
    options<R, Ps extends RouteParameters<E>>(
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        return this.route("OPTIONS", path, headlessRoute)
    }

    route<R, Ps extends RouteParameters<E>>(
        method: HTTPMethod,
        path: string,
        headlessRoute: HeadlessRoute<R, Ps, E>
    ): Route<R, Ps, E> {
        this._openapi = undefined
        const route = new Route({
            method: method,
            path: this.basePath + path,
            responseClass: this.defaultResponseClass,
            ...headlessRoute,
        })
        this.router.push(route)
        return route
    }

    openapi(): OpenAPIObject {
        if (this._openapi) return this._openapi
        const registry = new OpenAPIRegistry()
        for (const route of this.router) {
            if (route.includeInSchema) registry.registerPath(route.openapi())
        }
        const generator = new OpenApiGeneratorV31(registry.definitions)
        this._openapi = generator.generateDocument({
            openapi: "3.1.0",
            info: {
                title: this.title,
                version: this.version,
                description: this.description,
                contact: this.contact,
                license: this.license,
                termsOfService: this.termsOfService,
            },
            servers: this.servers,
            tags: this.tags,
        })
        return this._openapi
    }

    async fetch(...[req, env, ctx]: FetchParameters<E>): Promise<Response> {
        const baseArgs = { req, env, ctx } as ArgsOf<{}, E>
        try {
            const url = new URL(req.url)
            const [route, params] = this.router.match(req.method, url.pathname)
            if (route === undefined)
                return new JSONResponse({ detail: "Not Found" }, { status: 404 })
            const cookies = cookie.parse(req.headers.get("Cookie") ?? "")
            const queries = searchParamsToQueries(url.searchParams)
            const nextMap: Record<string, () => Promise<Response>> = {}
            let next = async () => {
                const parseInfo = await parseArgs<RouteParameters<E>, E>(
                    route.parameters,
                    baseArgs,
                    { params, queries, cookies }
                )
                if (parseInfo.success) {
                    try {
                        const res = await route.handler(parseInfo.args)
                        if (res instanceof Response) return res
                        return new route.responseClass(res)
                    } catch (e) {
                        if (e instanceof Response) return e
                        throw e
                    }
                }
                return new JSONResponse({ detail: parseInfo.errors }, { status: 422 })
            }
            nextMap[this.middleware.length - 1] = next
            for (let i = this.middleware.length - 1; i >= 0; i--) {
                const middleware = this.middleware[i]
                next = async () => await middleware.handler(baseArgs, nextMap[i])
                nextMap[i - 1] = next
            }
            return await next()
        } catch (e) {
            if (e instanceof Response) return e
            return await this.exceptionHandler(baseArgs, e)
        }
    }
}
