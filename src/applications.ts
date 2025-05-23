import {
    OpenAPIRegistry,
    OpenApiGeneratorV31,
    ResponseConfig,
} from "@asteasolutions/zod-to-openapi"
import * as cookie from "cookie"
import type {
    ContactObject,
    LicenseObject,
    OpenAPIObject,
    SecurityRequirementObject,
    SecuritySchemeObject,
    ServerObject,
    TagObject,
} from "openapi3-ts/oas31"
import { Middleware } from "./middleware"
import { parseArgs } from "./parameters"
import { HTMLResponse, JSONResponse } from "./responses"
import { fixPathSlashes, Route, Router, searchParamsToQueries } from "./routing"
import type { ArgsOf, ExceptionHandler, RouteParameters, ResponseClass } from "./types"
import { renderSwagger, renderRedoc } from "./renderers"
import { createResolveLater, baseExceptionHandler } from "./helpers"

export class App<E = unknown> extends Router<E> {
    rootPath: string
    title: string
    description: string
    version: string
    tagsInfo: TagObject[]
    servers: ServerObject[]
    contact?: ContactObject
    license?: LicenseObject
    termsOfService?: string
    securitySchemes: Record<string, SecuritySchemeObject>
    security: SecurityRequirementObject[]
    openapiUrl: string | null
    swaggerUrl: string | null
    redocUrl: string | null
    middleware: Middleware<E>[]
    exceptionHandler: ExceptionHandler<E>
    private _rootPathRegex: RegExp
    private _openapi?: OpenAPIObject

    constructor(init: {
        rootPath?: string
        title?: string
        description?: string
        version?: string
        tagsInfo?: TagObject[]
        servers?: ServerObject[]
        contact?: ContactObject
        license?: LicenseObject
        termsOfService?: string
        securitySchemes?: Record<string, SecuritySchemeObject>
        security?: SecurityRequirementObject[]
        openapiUrl?: string | null
        swaggerUrl?: string | null
        redocUrl?: string | null
        middleware?: Middleware<E>[]
        exceptionHandler?: ExceptionHandler<E>
        tags?: string[]
        deprecated?: boolean
        includeInSchema?: boolean
        responses?: Record<number, ResponseConfig>
        defaultResponseClass?: ResponseClass
    }) {
        super(init)
        this.rootPath = init.rootPath ?? "/"
        this._rootPathRegex = new RegExp("^" + this.rootPath)
        this.title = init.title ?? "Workery API"
        this.description = init.description ?? ""
        this.version = init.version ?? "0.1.0"
        this.tagsInfo = init.tagsInfo ?? []
        this.servers = [{ url: this.rootPath }, ...(init.servers ?? [])]
        this.contact = init.contact
        this.license = init.license
        this.termsOfService = init.termsOfService
        this.securitySchemes = init.securitySchemes ?? {}
        this.security =
            init.security ??
            Object.keys(this.securitySchemes).map((key) => ({
                [key]: [],
            }))
        this.openapiUrl = init.openapiUrl === null ? null : (init.openapiUrl ?? "/openapi.json")
        this.swaggerUrl = init.swaggerUrl === null ? null : (init.swaggerUrl ?? "/docs")
        this.redocUrl = init.redocUrl === null ? null : (init.redocUrl ?? "/redoc")
        this.middleware = init.middleware ?? []
        this.routeMatcher.set(null, { middleware: this.middleware })
        this.exceptionHandler = init.exceptionHandler ?? baseExceptionHandler

        if (this.openapiUrl) {
            this.get(this.openapiUrl, {
                includeInSchema: false,
                responseClass: JSONResponse,
                parameters: {},
                handle: () => this.openapi(),
            })
            if (this.swaggerUrl)
                this.get(this.swaggerUrl, {
                    includeInSchema: false,
                    responseClass: HTMLResponse,
                    parameters: {},
                    handle: () =>
                        renderSwagger(fixPathSlashes(this.rootPath + this.openapiUrl!), {
                            title: this.title,
                        }),
                })
            if (this.redocUrl)
                this.get(this.redocUrl, {
                    includeInSchema: false,
                    responseClass: HTMLResponse,
                    parameters: {},
                    handle: () =>
                        renderRedoc(fixPathSlashes(this.rootPath + this.openapiUrl!), {
                            title: this.title,
                        }),
                })
        }
    }

    include(pathPrefix: string, router: Router<E>) {
        for (const route of router.routeMatcher) {
            const includeRoute = new Route({
                ...route,
                path: pathPrefix + route.path,
                security: route.security ?? this.security,
            })
            this.routeMatcher.push(includeRoute)
            this.routeMatcher.set(pathPrefix, { middleware: router.middleware })
        }
    }

    openapi(): OpenAPIObject {
        if (this._openapi) return this._openapi
        const registry = new OpenAPIRegistry()
        for (const route of this.routeMatcher) {
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
            tags: this.tagsInfo,
        })
        this._openapi.components = this._openapi.components || {}
        this._openapi.components.securitySchemes = this.securitySchemes
        return this._openapi
    }

    async handle(baseArgs: ArgsOf<{}, E>): Promise<Response> {
        const { req } = baseArgs
        try {
            const url = new URL(req.url)
            const [route, params, middleware] = this.routeMatcher.match(
                req.method,
                url.pathname.replace(this._rootPathRegex, "")
            )
            const cookies = cookie.parse(req.headers.get("Cookie") ?? "")
            const queries = searchParamsToQueries(url.searchParams)
            const nextMap: Record<string, () => Promise<Response>> = {}

            let next: () => Promise<Response>
            if (route === undefined) {
                next = async () => new JSONResponse({ detail: "Not Found" }, { status: 404 })
            } else if (route === null) {
                next = async () =>
                    new JSONResponse(
                        { detail: "Method Not Allowed" },
                        { status: 405, headers: params }
                    )
            } else {
                next = async () => {
                    const [resolve, later] = createResolveLater()
                    try {
                        const parseInfo = await parseArgs<RouteParameters, E>(route.parameters, {
                            baseArgs: baseArgs,
                            later: later,
                            rawParameters: {
                                params,
                                queries,
                                cookies,
                            },
                        })
                        let res: Response
                        if (parseInfo.success) {
                            res = await route.handle({ ...baseArgs, ...parseInfo.args })
                            if (!(res instanceof Response))
                                res = new route.responseClass(res, { status: route.statusCode })
                        } else {
                            res = new JSONResponse({ detail: parseInfo.errors }, { status: 422 })
                        }
                        resolve(res)
                        return res
                    } catch (e: any) {
                        if (e instanceof Response) {
                            resolve(e)
                            return e
                        }
                        throw e
                    }
                }
            }
            nextMap[middleware.length - 1] = next
            for (let i = middleware.length - 1; i >= 0; i--) {
                next = async () => await middleware[i].handle(baseArgs, nextMap[i])
                nextMap[i - 1] = next
            }
            return await next()
        } catch (e) {
            if (e instanceof Response) return e
            return await this.exceptionHandler(baseArgs, e)
        }
    }

    fetch: (req: Request, env: E, ctx: ExecutionContext) => Promise<Response> = (req, env, ctx) => {
        return this.handle({ req, env, ctx })
    }
}
