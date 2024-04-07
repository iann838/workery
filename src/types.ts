import type { z } from "zod"
import type { LinksObject } from "openapi3-ts/oas31"
import type { Dependency } from "./dependencies"
import type { Route } from "./routing"

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | "TRACE"
export type HTTPMethodLower =
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "head"
    | "options"
    | "trace"

export type ResponseClass = new (body: any, init?: ResponseInit) => Response

export type Next = () => Promise<Response>

export type Later = (fn: (res: Response | Error) => void) => void

export type Preprocessor = <Out = any, In = any>(value: In) => Out | In

export interface RouteParameterOptions {
    altName?: string
    mediaType?: string
    description?: string
    includeInSchema?: boolean
    preprocessor?: Preprocessor
}

export interface RespondsOptions {
    mediaType?: string
    description?: string
    headers?: Record<string, z.ZodType>
    links?: LinksObject
}

export type ZodBodyable = z.ZodType | typeof String | typeof Blob | typeof ReadableStream

export type RouteParameterLocation = "path" | "query" | "header" | "cookie" | "body" | "$depends"

export interface RouteParameter<S extends z.ZodType> {
    location: RouteParameterLocation
    schema?: S
    schemaOr?: any
    dependency?: Dependency<any, RouteParameters, any>
    options: RouteParameterOptions & { includeInSchema: boolean }
}

export type PathParameter<S extends z.ZodType> = RouteParameter<S> & {
    location: "path"
    schema: S
}
export type QueryParameter<S extends z.ZodType> = RouteParameter<S> & {
    location: "query"
    schema: S
}
export type HeaderParameter<S extends z.ZodType> = RouteParameter<S> & {
    location: "header"
    schema: S
}
export type CookieParameter<S extends z.ZodType> = RouteParameter<S> & {
    location: "cookie"
    schema: S
}
export type BodyParameter<S extends z.ZodType> = RouteParameter<S> & {
    location: "body"
    schema: S
    options: { mediaType: string }
}
export type DependsParameter<S extends z.ZodType> = RouteParameter<S> & {
    location: "$depends"
    dependency: Dependency<any, RouteParameters, any>
}

export type RouteParameters = {
    [k: string]: RouteParameter<z.ZodType>
} & { req?: never }

export type TypeOf<T> =
    T extends RouteParameter<infer S extends z.ZodType>
        ? z.TypeOf<S>
        : T extends z.ZodType
          ? z.TypeOf<T>
          : T extends Dependency<infer R, any, any>
            ? R
            : unknown

export type ArgsOf<Ps extends RouteParameters, G = {}> = { req: Request } & G & {
        [K in keyof Ps]: TypeOf<Ps[K]>
    }

export type InitOf<C extends abstract new (...args: any) => any> = C extends new (
    init: infer I extends { [k: string]: any }
) => InstanceType<C>
    ? I
    : never

export type ExceptionHandler<G = {}> =
    | ((args: ArgsOf<{}, G>, e: any) => Promise<Response>)
    | ((args: ArgsOf<{}, G>, e: any) => Response)

export type RouteHandler<R, Ps extends RouteParameters, G = {}> =
    | ((args: ArgsOf<Ps, G>) => Promise<R>)
    | ((args: ArgsOf<Ps, G>) => R)

export type DependencyHandler<R, Ps extends RouteParameters, G = {}> =
    | ((args: ArgsOf<Ps, G>, later: Later) => Promise<R>)
    | ((args: ArgsOf<Ps, G>, later: Later) => R)

export type MiddlewareHandler<G = {}> =
    | ((args: ArgsOf<{}, G>, next: Next) => Promise<Response>)
    | ((args: ArgsOf<{}, G>, next: Next) => Response)

export type HeadlessRoute<R, Ps extends RouteParameters, G> = Omit<
    InitOf<typeof Route<R, Ps, G>>,
    "method" | "path"
>

export interface ParseArgsError {
    location: RouteParameterLocation
    name: string
    issues: z.ZodIssue[]
}

export interface ParseArgsInfo<Ps extends RouteParameters, G = {}> {
    success: boolean
    errors: ParseArgsError[]
    args: ArgsOf<Ps, G>
}
