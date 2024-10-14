import { z } from "zod"
import { extendZodWithOpenApi, ResponseConfig } from "@asteasolutions/zod-to-openapi"
import type { Dependency } from "./dependencies"
import { isJsonCoercible, jsonCoerce } from "./helpers"
import type {
    BodyParameter,
    CookieParameter,
    DependsParameter,
    HeaderParameter,
    RouteParameterOptions,
    PathParameter,
    QueryParameter,
    RouteParameters,
    ArgsOf,
    ParseArgsInfo,
    ParseArgsError,
    RespondsOptions,
    ZodBodyable,
    Later,
    RouteParameter,
} from "./types"

if (z.string().openapi === undefined) {
    extendZodWithOpenApi(z)
}

export function Path(): PathParameter<z.ZodString>
export function Path<S extends z.ZodType>(
    schema: S,
    options?: Omit<RouteParameterOptions, "mediaType">
): PathParameter<S>
export function Path(
    schema: z.ZodType = z.string(),
    options?: Omit<RouteParameterOptions, "mediaType">
): PathParameter<z.ZodType> {
    return {
        location: "path",
        schema: schema,
        options: {
            includeInSchema: true,
            preprocessor: isJsonCoercible(schema) ? jsonCoerce : undefined,
            ...options,
        },
    }
}

export function Query(): QueryParameter<z.ZodString>
export function Query<S extends z.ZodType>(
    schema: S,
    options?: Omit<RouteParameterOptions, "mediaType">
): QueryParameter<S>
export function Query(
    schema: z.ZodType = z.string(),
    options?: Omit<RouteParameterOptions, "mediaType">
): QueryParameter<z.ZodType> {
    return {
        location: "query",
        schema: schema,
        options: {
            includeInSchema: true,
            preprocessor: isJsonCoercible(schema) ? jsonCoerce : undefined,
            ...options,
        },
    }
}

export function Header(): HeaderParameter<z.ZodString>
export function Header<S extends z.ZodType>(
    schema: S,
    options?: Omit<RouteParameterOptions, "mediaType">
): HeaderParameter<S>
export function Header(
    schema: z.ZodType = z.string(),
    options?: Omit<RouteParameterOptions, "mediaType">
): HeaderParameter<z.ZodType> {
    return {
        location: "header",
        schema: schema,
        options: {
            includeInSchema: true,
            preprocessor: isJsonCoercible(schema) ? jsonCoerce : undefined,
            ...options,
        },
    }
}

export function Cookie(): CookieParameter<z.ZodString>
export function Cookie<S extends z.ZodType>(
    schema: S,
    options?: Omit<RouteParameterOptions, "mediaType">
): CookieParameter<S>
export function Cookie(
    schema: z.ZodType = z.string(),
    options?: Omit<RouteParameterOptions, "mediaType">
): CookieParameter<z.ZodType> {
    return {
        location: "cookie",
        schema: schema,
        options: {
            includeInSchema: true,
            preprocessor: isJsonCoercible(schema) ? jsonCoerce : undefined,
            ...options,
        },
    }
}

export function Body(): BodyParameter<z.ZodString>
export function Body(
    schema: typeof String,
    options?: Omit<RouteParameterOptions, "altName">
): BodyParameter<z.ZodString>
export function Body(
    schema: typeof Blob,
    options?: Omit<RouteParameterOptions, "altName">
): BodyParameter<z.ZodType<Blob>>
export function Body(
    schema: typeof ReadableStream,
    options?: Omit<RouteParameterOptions, "altName">
): BodyParameter<z.ZodType<ReadableStream>>
export function Body<S extends z.ZodType>(
    schema: S,
    options?: Omit<RouteParameterOptions, "altName">
): BodyParameter<S>
export function Body(
    schema: ZodBodyable = String,
    options?: Omit<RouteParameterOptions, "altName">
): BodyParameter<z.ZodType> {
    return {
        location: "body",
        schema: schema instanceof z.ZodType ? schema : z.any(),
        schemaOr: schema instanceof z.ZodType ? undefined : schema,
        options: {
            mediaType: "application/json",
            includeInSchema: true,
            ...options,
        },
    }
}

export function Depends<R>(dependency: Dependency<R, any, any>): DependsParameter<z.ZodType<R>> {
    return {
        location: "$depends",
        dependency: dependency,
        options: { includeInSchema: true },
    }
}

export async function parseArgs<Ps extends RouteParameters, E = unknown>(
    parameters: Ps,
    input: {
        baseArgs: ArgsOf<{}, E>
        rawParameters?: {
            params?: Record<string, string>
            queries?: Record<string, string[]>
            cookies?: Record<string, string>
        }
        later: Later
    }
): Promise<ParseArgsInfo<Ps, E>> {
    const { req } = input.baseArgs
    const { params, queries, cookies } = input.rawParameters ?? {}

    let success = true
    const args: Record<string, any> = {}
    const errors: ParseArgsError[] = []

    const parsers = {
        path: (name: string, _parameter: RouteParameter<z.ZodType>) => {
            const parameter = _parameter as PathParameter<z.ZodType>
            let input = (params ?? {})[parameter.options.altName ?? name]
            return parameter.schema.safeParse(
                input !== undefined && parameter.options.preprocessor
                    ? parameter.options.preprocessor(input)
                    : input
            )
        },
        query: (name: string, _parameter: RouteParameter<z.ZodType>) => {
            const parameter = _parameter as QueryParameter<z.ZodType>
            let input: string[] | string = (queries ?? {})[parameter.options.altName ?? name] ?? []
            if (!(parameter.schema instanceof z.ZodArray)) input = input[0]
            return parameter.schema.safeParse(
                parameter.options.preprocessor ? parameter.options.preprocessor(input) : input
            )
        },
        header: (name: string, _parameter: RouteParameter<z.ZodType>) => {
            const parameter = _parameter as HeaderParameter<z.ZodType>
            let input =
                req.headers.get(parameter.options.altName ?? name.replace(/_/g, "-")) ?? undefined
            return parameter.schema.safeParse(
                input !== undefined && parameter.options.preprocessor
                    ? parameter.options.preprocessor(input)
                    : input
            )
        },
        cookie: (name: string, _parameter: RouteParameter<z.ZodType>) => {
            const parameter = _parameter as CookieParameter<z.ZodType>
            let input = (cookies ?? {})[parameter.options.altName ?? name]
            return parameter.schema.safeParse(
                input !== undefined && parameter.options.preprocessor
                    ? parameter.options.preprocessor(input)
                    : input
            )
        },
        body: async (name: string, _parameter: RouteParameter<z.ZodType>) => {
            const parameter = _parameter as BodyParameter<z.ZodType>
            if (parameter.schemaOr) {
                let input: unknown
                if (parameter.schemaOr === String) input = await req.text()
                else if (parameter.schemaOr === Blob) input = await req.blob()
                else input = req.body // typeof ReadableStream
                return { success: true as const, data: input }
            } else {
                let input = await req.json()
                return parameter.schema.safeParse(input)
            }
        },
    }

    for (const [name, _parameter] of Object.entries(parameters)) {
        let parseOut!: z.SafeParseSuccess<unknown> | z.SafeParseError<unknown>
        if (_parameter.location == "$depends") {
            const parameter = _parameter as DependsParameter<z.ZodType>
            const dependency = parameter.dependency
            const dependencyParseInfo = await parseArgs(dependency.parameters, input)
            success &&= dependencyParseInfo.success
            if (dependencyParseInfo.success)
                args[name] = await dependency.handle({...input.baseArgs, ...dependencyParseInfo.args}, input.later)
            else errors.push(...dependencyParseInfo.errors)
            continue
        } else {
            parseOut = await parsers[_parameter.location](name, _parameter)
        }

        success &&= parseOut.success
        if (parseOut.success) args[name] = parseOut.data
        else {
            errors.push({
                location: _parameter.location,
                name: name,
                issues: parseOut.error.issues,
            })
        }
    }
    return { success, errors, args: args as ArgsOf<Ps, E> }
}

export function Responds(): ResponseConfig
export function Responds(schema: typeof String, options?: RespondsOptions): ResponseConfig
export function Responds(schema: typeof Blob, options?: RespondsOptions): ResponseConfig
export function Responds(schema: typeof ReadableStream, options?: RespondsOptions): ResponseConfig
export function Responds(schema: z.ZodType, options?: RespondsOptions): ResponseConfig
export function Responds(schema: ZodBodyable = String, options?: RespondsOptions): ResponseConfig {
    if (schema instanceof z.ZodType) {
        return {
            description: options?.description ?? schema._def.openapi?.metadata?.description ?? "",
            headers: z.object(options?.headers ?? {}),
            content: {
                [options?.mediaType ?? "application/json"]: {
                    schema: schema,
                },
            },
        }
    }
    return {
        description: options?.description ?? "",
        headers: z.object(options?.headers ?? {}),
        content: {
            [options?.mediaType ?? "application/json"]: {
                schema:
                    schema === String ? { type: "string" } : { type: "string", format: "binary" },
            },
        },
    }
}
