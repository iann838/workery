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

export async function parseArgs<Ps extends RouteParameters, G = {}>(
    parameters: Ps,
    baseArgs: ArgsOf<{}, G>,
    rawParameters?: {
        params?: Record<string, string>
        queries?: Record<string, string[]>
        cookies?: Record<string, string>
    }
): Promise<ParseArgsInfo<Ps, G>> {
    const { req } = baseArgs
    const { params, queries, cookies } = rawParameters ?? {}

    let success = true
    const args: Record<string, any> = {}
    const errors: ParseArgsError[] = []

    for (const [name, _parameter] of Object.entries(parameters)) {
        let parseOut!: z.SafeParseSuccess<unknown> | z.SafeParseError<unknown>

        if (_parameter.location == "path") {
            const parameter = _parameter as PathParameter<z.ZodType>
            let input = (params ?? {})[parameter.options.altName ?? name]
            parseOut = parameter.schema.safeParse(
                input !== undefined && parameter.options.preprocessor
                    ? parameter.options.preprocessor(input)
                    : input
            )
        } else if (_parameter.location == "query") {
            const parameter = _parameter as QueryParameter<z.ZodType>
            let input: string[] | string = (queries ?? {})[parameter.options.altName ?? name] ?? []
            if (!(parameter.schema instanceof z.ZodArray)) input = input[0]
            parseOut = parameter.schema.safeParse(
                parameter.options.preprocessor ? parameter.options.preprocessor(input) : input
            )
        } else if (_parameter.location == "header") {
            const parameter = _parameter as HeaderParameter<z.ZodType>
            let input =
                req.headers.get(parameter.options.altName ?? name.replace(/_/g, "-")) ?? undefined
            parseOut = parameter.schema.safeParse(
                input !== undefined && parameter.options.preprocessor
                    ? parameter.options.preprocessor(input)
                    : input
            )
        } else if (_parameter.location == "cookie") {
            const parameter = _parameter as CookieParameter<z.ZodType>
            let input = (cookies ?? {})[parameter.options.altName ?? name]
            parseOut = parameter.schema.safeParse(
                input !== undefined && parameter.options.preprocessor
                    ? parameter.options.preprocessor(input)
                    : input
            )
        } else if (_parameter.location == "body") {
            const parameter = _parameter as BodyParameter<z.ZodType>
            if (parameter.schemaOr) {
                let input: any
                if (parameter.schemaOr === String) input = await req.text()
                else if (parameter.schemaOr === Blob) input = await req.blob()
                else input = req.body // typeof ReadableStream
                parseOut = { success: true, data: input }
            } else {
                let input = await req.json()
                parseOut = parameter.schema.safeParse(input)
            }
        } else if (_parameter.location == "$depends") {
            const parameter = _parameter as DependsParameter<z.ZodType>
            const dependency = parameter.dependency
            const dependencyParseInfo = await parseArgs(
                dependency.parameters,
                baseArgs,
                rawParameters
            )
            success &&= dependencyParseInfo.success
            if (dependencyParseInfo.success)
                args[name] = await parameter.dependency.handle(dependencyParseInfo.args)
            else errors.push(...dependencyParseInfo.errors)
            continue
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
    return { success, errors, args: args as ArgsOf<Ps, G> }
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
